import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import path from 'path';
import dotenv from 'dotenv';

const app = express();
const PORT = process.env.PORT || 3000; // Step 1

// Import routes
import routes from './Routes/api.js'; // Step 2 (Import the routes)

dotenv.config();

// Connect to Database
async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Mongoose is connected!!!!');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); // Exit on connection error
    }
}

connectToDatabase(); // Call the connection function     

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Step 3 (Assuming a React build in 'client/build')
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client', 'build')));
}

// HTTP request logger
app.use(morgan('tiny'));

// Mount routes under '/api' prefix
app.use('/api', routes); // Step 4 (Mount the routes)

// Start the server 
app.listen(PORT, () => {
    console.log(`Server is starting at ${PORT}`);
});
