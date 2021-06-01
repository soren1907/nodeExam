const express = require("express");
const app = express();
const fs = require("fs");
const session = require("express-session");
const loginSignupRouter = require("./router/login_signup_router.js");
const userRouter = require("./router/user_router.js");
require("dotenv").config();
const server = require("http").createServer(app);
const io = require("socket.io")(server); 

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(session({secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true}));
app.use(loginSignupRouter.router); 
app.use(userRouter.router);
const requireSession = (req, res, next) => {
    //middleware used to check if user is signed in before going to specific endpoint
    if(!req.session.user) {
        return res.status(401).send(header + noAccess + footer);
    } else {
        next();
    }
}

// get html for footer & header
const footer = fs.readFileSync(__dirname + "/public/footer/footer.html", "utf-8");
const header = fs.readFileSync(__dirname + "/public/header/header.html", "utf-8");

// html for other endpoints
const frontpage = fs.readFileSync(__dirname + "/public/frontpage/frontpage.html", "utf-8");
const forum = fs.readFileSync(__dirname + "/public/forum/forum.html", "utf-8");
const loginSignup = fs.readFileSync(__dirname + "/public/login_signup/login_signup.html", "utf-8");
const profile = fs.readFileSync(__dirname + "/public/user/user_profile.html", "utf-8");
const noAccess = fs.readFileSync(__dirname + "/public/info/no_access.html", "utf-8");
const randomJoke = fs.readFileSync(__dirname + "/public/random_joke/random_joke.html", "utf-8");
const jokeCategory = fs.readFileSync(__dirname + "/public/joke_category/joke_category.html", "utf-8");
const chatMenu = fs.readFileSync(__dirname + "/public/chat/chat_menu/chat_menu.html", "utf-8");
const chatRoom = fs.readFileSync(__dirname + "/public/chat/chat_room/chat_room.html", "utf-8");

//set up routes
app.get("/", (req,res) => {
    res.send(header + frontpage + footer);
});

app.get("/forum", requireSession, (req,res) => {
    res.send(header + forum + footer);
});

app.get("/random_joke", (req,res) => {
    res.send(header + randomJoke + footer);
});

app.get("/joke_categories", (req,res) => {
    res.send(header + jokeCategory + footer);
});

app.get("/login", (req,res) => {
    res.send(header + loginSignup + footer);
});

app.get("/profile", requireSession, (req,res) => {
    res.send(header + profile + footer);
});

app.get("/chat_menu", requireSession, (req,res) => {
    res.send(header + chatMenu + footer);
});

app.get("/chat_room", requireSession, (req,res) => {
    res.send(header + chatRoom + footer);
});

app.get("/*", (req,res) => {
    res.status(404).send(header + "<h2>404: Page not found</h2>" + footer);
});

// Sockets
io.on("connection", (socket) => {

    let currentUser = "";
    let currentRoom = "";
    
    socket.on('joinRoom', ({username, room}) => {
        socket.join(room);
        currentUser = username;
        currentRoom = room;
        // Welcome current user
        // only user self can see
        socket.emit('sendMessageBack', {username: "Bot", message: "welcome to the chat " + username});

        // Broadcast when a user connects
        // everyone else except user can see
        socket.broadcast.to(room).emit('sendMessageBack', {username: "Bot", message: username + " has joined the chat"});

        // number of users in room
        // everyone can see
        let numberOfUsers = io.sockets.adapter.rooms.get(room).size;
        io.to(room).emit('onlineUsers', numberOfUsers);
    });

    socket.on('sendMessage', ({username, message, room}) => {
        io.to(room).emit('sendMessageBack', {username, message});
    });

    socket.on('disconnect', () => {
        // Send message to all that user left
        io.to(currentRoom).emit('sendMessageBack', {username: "Bot", message: currentUser + " has left the chat"});

        // if statement needed when last user in room leaves
        if (io.sockets.adapter.rooms.get(currentRoom)) {
            let numOfUsers = io.sockets.adapter.rooms.get(currentRoom).size;
            io.to(currentRoom).emit('onlineUsers', numOfUsers);
        }    
    });
});
 
// Starts server
const port = process.env.PORT || 8080;

server.listen(port, (error) => {
    if(error) {
        console.log(error);
    }
    console.log("server running on: ", port);
});