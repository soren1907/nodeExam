const router = require("express").Router();
const bcrypt = require("bcrypt");
const connection = require("../database/read.js");

router.post("/api/login", (req, res) => {

    const usernameFetched = req.body.username.toString();
    const passwordFetched = req.body.password.toString();

    connection((error, client) => {
        db = client.db("nodeexam");
        const members = db.collection("members");
        members.find().toArray((error, data) => {
            if(error) {
                throw new Error(error);
            }
            console.log(data)
            memberslist = data
            client.close();













        });
    });


    // bcrypt.compare(passwordFetched, hashedPassword, (error, result) => {
    //     console.log(result);
    // })

    // const userData = getMembers.find(user => user.username === usernameFetched); 
    // if (!userData){
    //     return res.status(404).send('Username not found'); 
    // }
    // if(passwordFetched === userData.password){
    //     req.session.user = usernameFetched;
    //     console.log(req.session.user)
    //     return res.status(200).send({loggedIn: true});
    // } else {
    //     return res.status(401).send({loggedIn: false}); 
    // }
});

router.post("/api/signup", (req, res) => {
    
    const username = req.body.username.toString();
    const password = req.body.password.toString();
    
    //Todo: check if username exists

    

    let hashedPassword = "";
    bcrypt.hash(password, 12, (error, hash) => {
        console.log("øverst")
        console.log(hash);
        hashedPassword = hash
    });


})

router.get("/api/get_session", (req,res) => {
    if(req.session.user){
        res.send({session: true});
    } else {
        res.send({session: false});
    }
})

router.get("/api/logout", (req, res) => {
    delete req.session.user
    res.send({msg: "logged out"});
})

module.exports = {
    router
}


