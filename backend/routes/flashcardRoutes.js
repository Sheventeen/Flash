import express from 'express';
import { verifyAuth } from '../middleware/verifyAuth.js';
import { createDeck, getDecks } from '../controllers/flashCardController.js';

const router = express.Router();

router.get('/',verifyAuth, getDecks);
router.post('/create-deck',verifyAuth, createDeck);


export default router;


