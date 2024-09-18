import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import userRoutes from './routes/userRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';




const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));


app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);

app.get('/', (req, res) => res.send('API running'));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));