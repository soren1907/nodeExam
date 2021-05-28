const router = require("express").Router();
const bcrypt = require("bcrypt");
const {connectHosted, connectLocal} = require("../database/set_up_connection.js");

router.get("/api/get_session", (req,res) => {
    if(req.session.user){
        res.send({session: true});
    } else {
        res.send({session: false});
    }
});

router.get("/api/get_username", (req, res) => {
    console.log(req.session.user)
    res.send({username: req.session.user})
});

router.get("/api/logout", (req, res) => {
    delete req.session.user
    res.send({msg: "logged out"});
});

router.delete("/api/delete_account", (req, res) => {
    const passwordFetched = req.body.password.toString();
    connectHosted((error, client) => {
        const db = client.db("member");
        const members = db.collection("user");
        members.find().toArray((error, data) => {
            if(error) { throw new Error(error)}
            const userData = data.find(user => user.username === req.session.user);
            bcrypt.compare(passwordFetched, userData.password, (error, result) => {
                if(result) {
                    members.deleteOne({username: userData.username}, (error, result ) => {
                        if (error) {
                            throw new Error(error);
                        }
                        client.close();
                    });
                    delete req.session.user
                    res.status(200).send({deleteSuccess: true});
                } else {
                    client.close();
                    res.status(401).send({deleteSuccess: false});
                }
            })
        });
    });
});

router.patch("/api/update_password", (req, res) => {
    const oldPassword = req.body.oldPassword.toString();
    const newPassword = req.body.newPassword.toString();
    connectHosted((error, client) => {
        const db = client.db("member");
        const members = db.collection("user");
        members.find().toArray((error, data) => {
            if(error) { throw new Error(error)}
            const userData = data.find(user => user.username === req.session.user);
            bcrypt.compare(oldPassword, userData.password, (error, result) => {
                if(result) {
                    bcrypt.hash(newPassword, 12, (error, hash) => {
                        members.updateOne({username: userData.username}, {$set: {password: hash} }, (error, result ) => {
                            if (error) {
                                throw new Error(error);
                            }
                            client.close();
                        })
                    });
                    res.status(200).send({updateSuccess: true});
                } else {
                    client.close();
                    res.status(401).send({updateSuccess: false});
                }
            })
        });
    });
});

module.exports = {
    router
}


