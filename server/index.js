import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB using Mongoose with async/await for clarity
async function connectToMongo() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB database!');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); // Exit on connection error
    }
}

// Connect to MongoDB on application startup
connectToMongo();

// Example route to retrieve all documents from a collection (replace with your logic)
app.get('/api/books', async (req, res) => {
    try {
        const db = mongoose.connection.db; // Access the connected database
        const booksCollection = db.collection('books'); // Access the "books" collection
        const documents = await booksCollection.find().toArray();
        res.json(documents);
    } catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).send('Error retrieving data');
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
