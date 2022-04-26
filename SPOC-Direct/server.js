const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
console.log()
// mongoose.connect('mongodb://localhost:27017/forumDB',
//     {useNewUrlParser: true}, function () {
//         console.log("db connection successful");
//     });

const date = new Date()
const year =date.getFullYear();

// console.log(year)


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


