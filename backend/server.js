import express from "express";
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import flashcardRoutes from './routes/flashcardRoutes.js'
import openAiRoutes from './routes/openAiRoutes.js'
import cookieParser from "cookie-parser";
import { connectDb } from "./database/connectDb.js";
import path from 'path';
import cors from 'cors';

dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000
const __dirname = path.resolve();

app.use(cors({origin: 'http://localhost:5173', credentials:true}));

// middleware to allow us to pass req objects to controller wish JSON inputs
app.use(express.json()); 
app.use(cookieParser()); //allows us to extract a token


app.use('/api/auth', authRoutes);
app.use('/api/decks', flashcardRoutes);
app.use('/api/flashcards', openAiRoutes);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
}

app.listen(PORT, () => {
    connectDb()
    console.log("Server is running on port: ", PORT);
});