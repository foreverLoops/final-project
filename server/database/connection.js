// db.js
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://shabbeer:zfLDVHY72ZbwjVUg@clusterone.mqjxq.mongodb.net/?retryWrites=true&w=majority&appName=ClusterOne"

let client;
let db;

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    db = client.db("admin"); // Replace with your database name
    console.log("Connected to MongoDB!");
  }
  return db;
}

module.exports = { connectToDatabase };
