const router = require("express").Router();



router.post("/api/login", (req, res) => {

    const testdata = require("../repository/members.json");
    const members = testdata.members;
    
    const usernameFetched = req.body.username.toString();
    const passwordFetched = req.body.password.toString();

    const userData = members.find(user => user.username === usernameFetched); 
    if (!userData){
        return res.status(404).send('Username not found'); 
    }
    if(passwordFetched === userData.password){
        req.session.user = usernameFetched;
        console.log(req.session.user)
        return res.status(200).send({loggedIn: true});
    } else {
        return res.status(401).send({loggedIn: false}); 
    }

})



router.post("/api/signup", (req, res) => {
    const username = req.body.username.toString();
    const password = req.body.password.toString();
    console.log(username + password);



    
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


