import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';
import User from './userModel.js'
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(protect);

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        genre: {
            type: String,
            required: true,
        },
        readStatus: {
            type: Boolean,
            default: false,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        // reviews: {
        //     type: String,
        //     min: 1,
        //     max: 5
        // }
        reviews: [{
            rating: {
                type: Number,
                min: 1,
                max: 5
            },
            review: {
                type: String
            },
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            }
        }]
    },
    {
        timestamps: true,
    }
);

bookSchema.methods.getAverageRating = function () {
    const ratings = this.reviews.map(review => review.rating);
    const sum = ratings.reduce((a, b) => a + b, 0);
    return sum / ratings.length;
};

const Book = mongoose.model('Book', bookSchema);

export default Book;