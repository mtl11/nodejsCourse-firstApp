const mongodb = require("mongodb");

let _db;

const mongoConnect = (callback) =>{
  mongodb.MongoClient.connect(
    "mongodb+srv://matthew:houston11@cluster0.ryb3qzs.mongodb.net/shop?retryWrites=true&w=majority"
  ).then(client=>{
    _db = client.db()
    callback();
  }).catch(err=>{
    console.log("Error: +"+err);
  });
}

const getDB = () =>{
  if (_db){
    return _db;
  }else{
    console.log("notFOund")
  }
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;