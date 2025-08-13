import express from 'express';
import { openAiResponse } from '../util/openAiRequest';

const router = express.Router();

router.post('/', async(req, res) => {
    try {
        const input = req.body
        const response = await openAiResponse(input);
        res.json({flashcards: response.output_text})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'error generating flashcards'})
    }
})

export default router