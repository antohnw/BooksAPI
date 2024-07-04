import express from 'express';
import { MongoClient } from 'mongodb';
import { json } from 'body-parser';

// Replace with your actual connection string
const MONGO_URI = "mongodb+srv://antohnw:gkvlIOXtcBFrc924@cluster0.mxs8tbo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port or default to 3000

app.use(json()); // Parse incoming JSON data

let client; // Global variable to store the MongoDB client connection

async function connectToMongo() {
    try {
        client = await MongoClient.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB database!");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1); // Exit the process on connection error
    }
}

// Connect to MongoDB on application startup
connectToMongo();

// // Example route to retrieve all documents from a collection (replace with your logic)
// app.get('/api/data', async (req, res) => {
//     try {
//         const database = client.db("your_database_name");
//         const collection = database.collection("your_collection_name");
//         const documents = await collection.find().toArray();
//         res.json(documents);
//     } catch (err) {
//         console.error("Error retrieving data:", err);
//         res.status(500).send("Error retrieving data");
//     }
// });

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
