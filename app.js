const express = require("express");
const app = express();
const fs = require("fs");
const session = require("express-session");
const loginSignupRouter = require("./router/login_signup_router.js");
const userRouter = require("./router/user_router.js");
require("dotenv").config();

//middleware
app.use(express.static("public"));
app.use(express.json());
app.use(session({secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true}));
app.use(loginSignupRouter.router); 
app.use(userRouter.router); 
const isLoggedIn = (req,res,next) =>{
    //middleware used to check if user is signed in before going to specific endpoint
    if(!req.session.user) {
        return res.status(401).send(header + no_access + footer);
    } else {
        next();
    }
}

//html for footer & header
const footer = fs.readFileSync(__dirname + "/public/footer/footer.html", "utf-8");
const header = fs.readFileSync(__dirname + "/public/header/header.html", "utf-8");

//html for other endpoints
const frontpage = fs.readFileSync(__dirname + "/public/frontpage/frontpage.html", "utf-8");
const forum = fs.readFileSync(__dirname + "/public/forum/forum.html", "utf-8");
const login_signup = fs.readFileSync(__dirname + "/public/login_signup/login_signup.html", "utf-8");
const profile = fs.readFileSync(__dirname + "/public/user/user_profile.html", "utf-8");
const no_access = fs.readFileSync(__dirname + "/public/info/no_access.html", "utf-8");
const randomJoke = fs.readFileSync(__dirname + "/public/random_joke/random_joke.html", "utf-8");
const jokeCategory = fs.readFileSync(__dirname + "/public/joke_category/joke_category.html", "utf-8");
const communityJokes = fs.readFileSync(__dirname + "/public/community_jokes/community_jokes.html", "utf-8");

//Endpoints
app.get("/", (req,res) => {
    res.send(header + frontpage + footer);
    console.log()
});

app.get("/forum", isLoggedIn, (req,res) => {
    res.status(200).send(header + forum + footer);
});

app.get("/random_joke", (req,res) => {
    res.status(200).send(header + randomJoke + footer);
});

app.get("/joke_categories", (req,res) => {
    res.status(200).send(header + jokeCategory + footer);
});

app.get("/community_jokes", isLoggedIn, (req,res) => {
    res.status(200).send(header + communityJokes + footer);
});

app.get("/login", (req,res) => {
    res.send(header + login_signup + footer);
})

app.get("/profile", isLoggedIn, (req,res) => {
    res.send(header + profile + footer);
})

app.get("/*", (req,res) => {
    res.status(404).send(header + "<h2>404: Page not found</h2>" + footer);
})

app.listen(8080, (error) => {
    if(error) {
        console.log(error);
    }
    console.log("server running on: " + 8080);
});