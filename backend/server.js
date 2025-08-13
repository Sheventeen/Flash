import express from "express";
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import flashcardRoutes from './routes/flashcardRoutes.js'
import openAiRoutes from './routes/openAiRoutes.js'
import cookieParser from "cookie-parser";
import { connectDb } from "./database/connectDb.js";
import cors from 'cors';

dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000

app.use(cors({origin: 'http://localhost:5173', credentials:true}));

// middleware to allow us to pass req objects to controller wish JSON inputs
app.use(express.json()); 
app.use(cookieParser()); //allows us to extract a token



app.use('/api/auth', authRoutes);
app.use('/api/decks', flashcardRoutes);
app.use('/api/flashcards', openAiRoutes);

app.listen(PORT, () => {
    connectDb()
    console.log('running ayyy');
});