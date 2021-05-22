const mongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const dbName = "nodeexam";


module.exports = function(callback){
    const mC = mongoClient;
    const url = "mongodb://localhost:27017";
    mC.connect(url, {useUnifiedTopology: true} ,callback);
}


// mongoClient.connect(url, {useUnifiedTopology: true} ,(error, client) => {
//     if (error) {
//         throw new Error(error);
//     }
//     const db = client.db(dbName);
//     const members = db.collection("members");

//     members.find().toArray((error, data) => {
//         if(error) {
//             throw new Error(error);
//         }
//         console.log(data)
//         client.close();
        
//     });

    

// });

// const findAllMembers = function(db,callback){

//     const collection = db.collection("members");

//     collection.find({}).toArray(function(err, docs) {


//         console.log(docs);
//         callback(docs);

//     });




// }

//console.log(mongoClient)