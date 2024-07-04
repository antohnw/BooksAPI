import express from 'express';
import bodyParser from 'body-parser';
import Books from '../Models/books.js'; // Import the Books model

const router = express.Router();
router.use(bodyParser.json()); // Parse incoming JSON data

// Save route (POST)
router.post('/', async (req, res) => {
    try {
        const newBook = new Books(req.body);
        await newBook.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all books route (GET)
router.get('/', async (req, res) => {
    try {
        const books = await Books.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Filter by available route (GET) - Example filter
router.get('/available', async (req, res) => {
    try {
        const availableBooks = await Books.find({ available: true });
        res.json(availableBooks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// You can add more filter routes here based on your needs

export default router;
