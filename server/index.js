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



app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
