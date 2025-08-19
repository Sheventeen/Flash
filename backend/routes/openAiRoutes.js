import express from 'express';
import  {openAiResponse}  from '../util/openAiRequest.js';

const router = express.Router();

router.post('/', async(req, res) => {
    try {
        const {input} = req.body;
        const generatedDeck = await openAiResponse(input);
        const text = JSON.parse(generatedDeck)
        console.log(text)
        res.status(200).json({text});
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'error generating flashcards'})
    }
})

export default router