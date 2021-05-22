const express = require("express");
const app = express();
const fs = require("fs");
const session = require("express-session");
const loginRouter = require("./routes/login.js");
require("dotenv").config();

//middleware
app.use(express.static("public"));
app.use(express.json());
app.use(session({secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true}));
app.use(loginRouter.router); 

//html for footer & header
const footer = fs.readFileSync(__dirname + "/public/footer/footer.html", "utf-8");
const header = fs.readFileSync(__dirname + "/public/header/header.html", "utf-8");

//html for other endpoints
const frontpage = fs.readFileSync(__dirname + "/public/frontpage/frontpage.html", "utf-8");
const forum = fs.readFileSync(__dirname + "/public/forum/forum.html", "utf-8");
const login_signup = fs.readFileSync(__dirname + "/public/login_signup/login_signup.html", "utf-8");

app.get("/", (req,res) => {
    res.send(header + frontpage + footer);
    console.log()
});

app.get("/forum", (req,res) => {
    console.log(req.session.user);
    if(!req.session.user) {
        return res.status(401).send({access: "denied"});
    }
    return res.status(200).send(header + forum + footer);
})

app.get("/login", (req,res) => {
    res.send(header + login_signup + footer);
})

app.listen(8080, (error) => {
    if(error) {
        console.log(error);
    }
    console.log("server running on: " + 8080);
});