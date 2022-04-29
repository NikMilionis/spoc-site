// install all packages
// npm i express body-parser express-session passport passport-local passport-local-mongoose dotenv
// https://cloud.google.com/appengine/docs/flexible/nodejs/configuring-your-app-with-app-yaml

const express = require("express");
const fs = require('fs');
const app = express();

//Add sessions
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

require('dotenv').config()

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/public"));

//Initialize passport
app.use(session({
    secret: process.env.PASSPORT_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


app.listen(8080, function () {
    console.log("server started at 8080")
});

app.get("/", function (req, res) {
    res.sendFile("/public/index.html");
});


app.post("/save", function (req, res) {
    const msg = {
        "message": req.body.message
    }

    const messageJSON = JSON.stringify(msg);
    console.log('msg' + messageJSON);
    fs.writeFile(__dirname + "/public/data/message.json", messageJSON, function (err) {
        if (err) {
            console.log("JSON file writing error");
            console.log(err);
        } else {
            res.redirect("/");
        }
    });
});