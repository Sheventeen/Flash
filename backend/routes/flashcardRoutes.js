import express from 'express';
import { verifyAuth } from '../middleware/verifyAuth.js';
import { createDeck, deleteDeck, editDeck, getDecks, viewDeck } from '../controllers/flashCardController.js';

const router = express.Router();

router.get('/',verifyAuth, getDecks);
router.get('/:userName/:deckId',verifyAuth, viewDeck);

router.post('/create-deck',verifyAuth, createDeck);

router.put('/edit-deck/:deckId',verifyAuth, editDeck);

router.delete('/delete-deck/:deckId',verifyAuth, deleteDeck);


export default router;


