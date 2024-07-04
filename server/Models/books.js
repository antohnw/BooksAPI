import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const counterSchema = new Schema({
    _id: String,
    seq: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', counterSchema);

const booksSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    }
});

booksSchema.pre('save', async function (next) {
    if (!this.isNew) {
        return next();
    }

    const counter = await Counter.findOneAndUpdate(
        { _id: 'bookId' }, // 
        { $inc: { seq: 1 } },
        { new: true }
    );

    this.id = counter.seq;
    next();
});

const Books = mongoose.model('books', booksSchema);

export default Books;
