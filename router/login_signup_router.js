const router = require("express").Router();
const bcrypt = require("bcrypt");
const {connectHosted, connectLocal} = require("../database/set_up_connection.js");

router.post("/api/login", (req, res) => {
    const usernameFetched = req.body.username.toString();
    const passwordFetched = req.body.password.toString();

    connectHosted((error, client) => {
        const db = client.db("member");
        const members = db.collection("user");
        members.find().toArray((error, data) => {

            if(error) { throw new Error(error)}
            const userData = data.find(user => user.username === usernameFetched);

            if (!userData){
                client.close();
                res.status(404).send({msg : 'Username not found'}); 
            } else{
                bcrypt.compare(passwordFetched, userData.password, (error, result) => {
                    if(result) {
                        req.session.user = userData.username
                        res.status(200).send({loginSuccess: true});
                    } else {
                        res.status(401).send({loginSuccess: false}); 
                    }
                    client.close();
                })
            }
        });
    });
}); 

router.post("/api/signup", (req, res) => {
    
    const usernameFetched = req.body.username.toString();
    const passwordFetched = req.body.password.toString();
    
    //check if username allreadu exists and if not, adds user to DB
    connectHosted((error, client) => {
        const db = client.db("member");
        const members = db.collection("user");
        members.find().toArray((error, data) => {
            if(error) { throw new Error(error)}
            const userData = data.find(user => user.username === usernameFetched);

            if (userData){
                client.close();
                res.status(409).send({signupSuccess: false});
            } else {
                bcrypt.hash(passwordFetched, 12, (error, hash) => {
                    members.insertOne({ username: usernameFetched, password: hash} , (error, result) => {
                        if (error) {
                            throw new Error(error);
                        }
                        client.close();
                    });
                });
                res.status(200).send({signupSuccess: true});
            }
        });
    });
});

module.exports = {
    router
}
 

