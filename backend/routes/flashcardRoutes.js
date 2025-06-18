import express from 'express';
import { verifyAuth } from '../middleware/verifyAuth.js';
import { createDeck, editDeck, getDecks } from '../controllers/flashCardController.js';

const router = express.Router();

router.get('/',verifyAuth, getDecks);
router.post('/create-deck',verifyAuth, createDeck);
router.put('/edit-deck/:deckId',verifyAuth, editDeck);


export default router;


