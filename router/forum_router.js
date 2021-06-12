const router = require("express").Router();
const {connectHosted, connectLocal} = require("../database/connection.js");

router.post("/api/send_message", (req, res) => {

    const message = req.body.message;
    const user = req.session.user
    const date =  req.body.date;

    connectHosted((error, client) => {
        const db = client.db("jokesDB");
        const forum = db.collection("forum");

        forum.insertOne({username: user, message: message, date: date} , (error, result) => {
            if (error) {
                client.close();
                res.status(400).send({messageSuccess: false});
                throw new Error(error);
            } else{
                client.close();
                res.status(200).send({messageSuccess: true});
            }
        });
    });
}); 

router.get("/api/get_messages", (req, res) => {

    connectHosted((error, client) => {
        const db = client.db("jokesDB");
        const forum = db.collection("forum");
        forum.find().toArray((error, data) => {
            if (error) {
                client.close();
                res.status(400).send({messageSuccess: false});
                throw new Error(error);
            } else{
                client.close();
                res.status(200).send({messages: data});
            }
        });
    });
}); 

module.exports = {
    router
};