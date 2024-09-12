import express from 'express';
import {
    getAllBooks,
    createBook,
    getBookById,
    updateBook,
    deleteBook,
    createReview,
} from '../controllers/bookController.js';

const router = express.Router();

router.get('/', getAllBooks);
router.post('/', createBook); 
router.get('/:id', getBookById); 
router.put('/:id', updateBook); 
router.delete('/:id', deleteBook);
router.post('/:id/reviews', createReview);

export default router;