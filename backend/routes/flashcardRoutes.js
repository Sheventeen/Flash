import express from 'express';
import { verifyAuth } from '../middleware/verifyAuth.js';
import { getDecks } from '../controllers/flashCardController.js';

const router = express.Router();

router.get('/',verifyAuth, getDecks);

export default router;


