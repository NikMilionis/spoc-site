const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const fs = require('fs')


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.use(session({
    secret: "MyLittleSecretThatIdontWantOthersToKnow",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://127.0.0.1:27017/forumDB',
    {useNewUrlParser: true}, function () {
        console.log("db connection successful");
    });

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        minlength: 3
    },
    password:{
        type: String,
    },
    email:{
        type: String,
    },
    profile:{
        type: String,
    }
})

userSchema.plugin(passportLocalMongoose)

const User = mongoose.model('User', userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


const date = new Date()
const year =date.getFullYear();

// console.log(year)

const timeSchema = {
    time: {
        type: String
    },
    date: {
        type: String
    }
}

const replySchema = {

    username: {
        type: String
    },
    replyText: {
        type: String
    },
    timereply: [
        timeSchema
    ]


}

const forumPostSchema = {
    title: {
        type: String,
        require: [true, "Title cannot be empty!"]
    },
    url: {
        type: String,
        require: [false]
    },
    postdetail: {
        type: String,
        require: [true, "Description cannot be empty!"]
    },
    tags: [{
        type: String,
        require: [true, "Tags cannot be empty!"]
    }],
    username: {
        type: String
    },
    replys: [
        replySchema
    ],
    timepost: [
        timeSchema
    ]

}


const Post = mongoose.model('Post', forumPostSchema)

app.listen(3000, function () {
    console.log("server started at 3000");
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/html/index.html");
});

app.get('/forum', (req, res) => {
    if (req.query.error) {
        res.redirect("/forum.html?error=" + req.query.error);
    } else {
        res.redirect("/html/forum.html");
    }
});

app.get('/get_post_by_id',
    function (req, res) {
        // console.log(req.query.movie_id);
        Post.find({"_id": req.query.post_id},
            function (err,
                      data) {
                if (err || data.length === 0) {
                    res.send({
                        "message": "internal database error",
                        "data": {}
                    });
                } else {
                    res.send({
                        "message": "success",
                        "data": data[0]
                    })
                }
            });
    });

app.get("/get_all_posts", function (req, res) {
    Post.find(function (err, data) {
        if (err) {
            res.send({
                "message": "internal database error",
                "data": []
            });
        } else {
            res.send({
                "message": "success",
                "data": data
            })
        }
    });
});


app.get('/forum_edit', (req, res) => {
    if (req.query.error) {
        res.redirect("/forum_edit.html?error=" + req.query.error);
    } else {
        res.redirect("/html/forum_edit.html");
    }
});

app.post("/forum_edit", (req, res) => {

    const tagArr = req.body.tags.split(' ,')

    const timeTime = new Date().toLocaleTimeString();
    const dateDate = new Date().toLocaleDateString()
    console.log(timeTime + ' ' + dateDate);


    const post = {
        title: req.body.title,
        url: req.body.url,
        postdetail: req.body.postdetail,
        tags: tagArr,
        timepost: {
            time: timeTime,
            date: dateDate
        }
    }

    console.log(req.body.tags)

    if (req.body._id) {
        //update car
        Post.updateOne({_id: req.body._id},
            {$set: post},
            {runValidators: true},
            (err, info) => {
                if (err) {
                    res.redirect('forum_edit.html?error_message='
                        + err["message"]
                        + "&input=" + JSON.stringify(post)
                        + "&postId=" + req.body._id);
                } else {
                    res.redirect('/html/post_detail.html?post_id=' + req.body._id)
                }
            }
        )
    } else {

        const np = new Post(post);
        np.save((err, new_post) => {
            if (err) {
                console.log(err["message"]);
                res.redirect('forum_edit.html?error_message=' + err["message"]
                    + "&input=" + JSON.stringify(post) + "&post_id=" + req.body._id)
            } else {
                console.log(new_post._id)
                console.log(new_post)
                res.redirect('/html/post_detail.html?post_id=' + new_post._id)
                //res.redirect('/forum')

            }
        })
    }
});

app.post('/delete_post_by_id', (req, res) => {
    Post.deleteOne(
        {"_id": req.body._id},
        {},
        (err) => {
            if (err) {
                res.send({
                    "message": "database deletion error"
                })
            } else {
                res.send({
                    "message": "success"
                })
            }
        }
    )
});


app.get('/register', (req, res) => {
    if (req.query.error) {
        res.redirect("/register.html?error=" + req.query.error);
    } else {
        res.redirect("/html/register.html");
    }
});

app.get('/get_user_by_id',
    function (req, res) {
        User.find({"_id": req.query.user_id}, function (err, data) {
            if (err || data.length === 0) {
                console.log('ERROR! not sending to JSON')
                res.send({
                    "message": "internal database error",
                    "data": {}
                });
            } else {
                console.log('s8c')

                res.send({
                    "message": "success",
                    "data": data[0]
                })
            }
        });
    });


app.get('/get_current_user', function (req,res){
    if(req.isAuthenticated()){
        res.send({
            message:"success",
            data: req.user

        })
    }else{
        res.send({
            message:"user not found",
            data:{}
        })
    }
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect("/");
});

app.get('/forum', (req, res) => {
    if (req.query.error) {
        res.redirect("/forum.html?error=" + req.query.error);
    } else {
        res.redirect("/html/forum.html");
    }
});

app.get('/register', (req, res) => {
    if (req.query.error) {
        res.redirect("/register.html?error=" + req.query.error);
    } else {
        res.redirect("/html/register.html");
    }
});

app.get('/login', (req, res) => {
    if (req.query.error) {
        res.sendFile("/login.html?error=" + req.query.error);
    } else {
        res.redirect("/html/login.html");
    }
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect("/");
});

app.post('/login', (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    req.login(user, (err)=>{
        if(err){
            res.redirect("/login?error=Database error");
        } else{
            const authenticate=passport.authenticate('local',{
                successRedirect:"/",
                failureRedirect:"/login?error= username and password do not match"
            })
            authenticate(req,res);
        }
    })
});


app.post('/register', (req, res) => {
    const newUser={
        username: req.body.username,
        password: req.body.password,
        fullname: req.body.email,
        profile: req.body.avatar
    }
    User.register(newUser, req.body.password, (err, user)=>{
        if(err){
            console.log(err);
            res.redirect('/register?error=' + err);

        }else{
            console.log(user);
            const authenticate= passport.authenticate('local');
            authenticate(req, res, ()=>{
                res.redirect("/html/account.html");
            });
        }
    })
});
app.get("/account", (req, res) => {
    //save the user to the movie
    const user={
        username: req.body.username,
        password: req.body.password,
        fullname: req.body.email,
        profile: req.body.avatar
    }
    if(req.isAuthenticated()){
        res.redirect("/html/account.html");
    }else{
        res.redirect("/html/login");
    }
});

app.get('/reply', (req, res) => {

})

app.post('/reply', (req, res) => {

    const post_id = req.body._id

    const timeTime = new Date().toLocaleTimeString();
    const dateDate = new Date().toLocaleDateString()

    const replyInfo = {
        username: "testname",
        replyText: req.body.replyText,
        timereply: {
            time: timeTime,
            date: dateDate
        }
    }
    console.log(post_id)
    console.log(replyInfo)

    if (req.body._id) {
        Post.updateOne(
            {_id: post_id},
            {
                $push: {
                    replys: replyInfo
                }
            },
            {},
            (err) => {
                if (err) {
                    res.send({
                        message: "database error"
                    })
                } else {
                    // res.send({
                    //     message:"success"
                    // })
                    res.redirect('/html/post_detail.html?post_id=' + post_id)
                }
            }
        )
    } else {
        res.redirect('/forum')
    }
})

app.get('/election', (req, res) => {
    if (req.query.error) {
        res.redirect("/html/election.html?error=" + req.query.error);
    } else {
        res.redirect("/html/election.html");
    }
});

