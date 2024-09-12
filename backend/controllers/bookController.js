import asyncHandler from 'express-async-handler';
import Book from '../models/bookModel.js';
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import jwt from 'jsonwebtoken';

// console.log(jwt)
const router = express.Router();
router.use(protect);

// Get all books
export const getAllBooks = asyncHandler(async (req, res) => {
    const token = req.cookies.jwt;
    // console.log(token)
    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        try {
            const { title, author, genre, readStatus } = req.query;
            const query = { userId: decoded.userId };

            if (title) {
                query.title = title;
            }
            if (author) {
                query.author = author;
            }
            if (genre) {
                query.genre = genre;
            }

            if (readStatus) {
                query.readStatus = readStatus;
            }

            const books = await Book.find(query);
            res.json(books);
        } catch (error) {
            res.status(500).json(error.message);
        }
    } else {
        res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
});

// Create a new book
export const createBook = asyncHandler(async (req, res) => {
    const token = req.cookies.jwt;
    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { title, author, genre, imageUrl, readStatus, reviews } = req.body;
        try {
            const newBook = new Book({
                title,
                author,
                genre,
                readStatus,
                imageUrl,
                reviews: [],
                userId: decoded.userId
            });

            const book = await newBook.save();

            // console.log(token)
            res.status(201).json(book);
        } catch (error) {
            res.status(500).json(error.message);
        }
    } else {
        res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
});

// Get a book by ID
export const getBookById = asyncHandler(async (req, res) => {
    const token = req.cookies.jwt;
    if (token) {
        try {
            const book = await Book.findById(req.params.id);
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }
            res.json(book);
        } catch (error) {
            res.status(500).json(error.message);
        }
    } else {
        res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
});

// Update a book
export const updateBook = asyncHandler(async (req, res) => {
    const token = req.cookies.jwt;
    if (token) {
        const { title, author, genre, readStatus } = req.body;
        // console.log(req.body);

        try {
            const book = await Book.findById(req.params.id);

            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }

            book.title = title || book.title;
            book.author = author || book.author;
            book.genre = genre || book.genre;
            book.readStatus = readStatus !== undefined ? readStatus : book.readStatus;

            const updatedBook = await book.save();
            res.json(updatedBook);
        } catch (error) {
            res.status(500).json(error.message);
        }
    } else {
        res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
});

// Delete a book
export const deleteBook = asyncHandler(async (req, res) => {
    const token = req.cookies.jwt;
    if (token) {
        try {
            const book = await Book.findById(req.params.id);
            // console.log(req.params.id)
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }

            await Book.deleteOne({ _id: req.params.id });
            res.json({ message: 'Book removed' });
        } catch (error) {
            res.status(500).json(error.message);
        }
    } else {
        res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
});
// Create a new review
export const createReview = asyncHandler(async (req, res) => {
    const token = req.cookies.jwt;
    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { rating, review} = req.body;
        const bookId = req.params.id;

        try {
            const book = await Book.findById(bookId);
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }

            const newReview = {
                rating,
                review,
                userId: decoded.userId
            };

            book.reviews.push(newReview);
            await book.save();

            res.json({ message: 'Review added successfully' });
        } catch (error) {
            res.status(500).json(error.message);
        }
    } else {
        res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
});
