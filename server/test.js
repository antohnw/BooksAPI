import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import 'dotenv/config';


// Define connection details

async function testConnection() {
    try {
        const client = await MongoClient.connect(process.env.MONGO_URI, {
            serverApi: {
                version: ServerApiVersion.v1,
            },
        });
        console.log("Connected to MongoDB database!");
        await client.close();
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1); // Exit the process on connection error
    }
}

// Run connection test before starting the server
await testConnection();

// Initialize the Express app
const app = express();

// Define a simple route (replace with your actual API endpoints)
app.get('/', (req, res) => {
    res.send('Hello from Express.js and MongoDB!');
});

// Start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
