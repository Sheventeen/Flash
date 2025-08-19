import express from 'express';
import  {openAiResponse}  from '../util/openAiRequest.js';

const router = express.Router();

router.post('/', async(req, res) => {
    try {
        const input = req.body;
        const generatedDeck = await openAiResponse(input.prompt || input);
        res.status(200).json({generatedDeck});
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'error generating flashcards'})
    }
})

export default router