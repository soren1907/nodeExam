const router = require("express").Router();
const bcrypt = require("bcrypt");
const {connectHosted, connectLocal} = require("../database/set_up_connection.js");

router.post("/api/login", (req, res) => {
    const fetchedUsername = req.body.username.toString();
    const fetchedPassword = req.body.password.toString();

    connectHosted((error, client) => {
        const db = client.db("jokesDB");
        const users = db.collection("user");
        users.find().toArray((error, data) => {

            if(error) { 
                throw new Error(error);
            }
            const userData = data.find(user => user.username === fetchedUsername);

            if (!userData){
                client.close();
                res.status(404).send({msg : 'Username not found'}); 
            } else{
                bcrypt.compare(fetchedPassword, userData.password, (error, result) => {
                    if(result) {
                        req.session.user = userData.username;
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

router.post("/api/register", (req, res) => {
    
    const fetchedUsername = req.body.username.toString();
    const fetchedPassword = req.body.password.toString();
    
    //check if username allreadu exists and if not, adds user to DB
    connectHosted((error, client) => {
        const db = client.db("jokesDB");
        const users = db.collection("user");
        users.find().toArray((error, data) => {
            if(error) { 
                throw new Error(error);
            }
            const userData = data.find(user => user.username === fetchedUsername);

            if (userData){
                client.close();
                res.status(409).send({registerSuccess: false});
            } else {
                bcrypt.hash(fetchedPassword, 12, (error, hash) => {
                    users.insertOne({ username: fetchedUsername, password: hash} , (error, result) => {
                        if (error) {
                            throw new Error(error);
                        }
                        client.close();
                    });
                });
                res.status(200).send({registerSuccess: true});
            }
        });
    });
});

module.exports = {
    router
};
 

