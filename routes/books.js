const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Get all books with optional filtering
router.get('/', async (req, res) => {
    const { author, publicationYear } = req.query;
    let query = {};

    if (author) {
        query.author = author;
    }
    if (publicationYear) {
        query.publicationYear = publicationYear;
    }

    try {
        const books = await Book.find(query);
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Create a new book
router.post('/createBook', async (req, res) => {
    try {
        const { title, author, publicationYear } = req.body;

        // Check if the book already exists
        const existingBook = await Book.findOne({ title });
        if (existingBook) {
            return res.status(400).json({ message: "Book already exists" });
        }

        // Create a new book
        const newBook = new Book({ title, author, publicationYear });
        await newBook.save();

        res.status(201).json({ message: "Book created successfully", book: newBook });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Update a book
router.put('/updateBook/:id', async (req, res) => {
    try {
        console.log("book id" ,req.params.id )
        const bookId = req.params.id;
        const { title, author, publicationYear } = req.body;

        // Check if the book exists
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(405).json({ message: "Book not found" });
        }

        // Update book properties
        if (title) book.title = title;
        if (author) book.author = author;
        if (publicationYear) book.publicationYear = publicationYear;

        // Save the updated book
        await book.save();

        res.json({ message: "Book updated successfully", book });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a book
router.delete('/deleteBook/:id', async (req, res) => {
    try {
        const bookId = req.params.id;

        // Check if the book exists
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        // Delete the book document from the database
        await book.deleteOne();

        res.json({ message: "Book deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
