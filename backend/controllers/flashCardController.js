import {User} from '../models/UserModel.js';
import bCryptjs from 'bcryptjs';
import crypto from  'crypto';
import { generateTokenAndSetCookie } from '../util/generateTokenAndSetCookie.js';
import Flashcard from '../models/FlashcardModel.js';


export const getDecks = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        res.status(200).json({
            success: true,
            user:{
                ...user._doc,
                password: undefined
            }
        })
    } catch (error) {
        console.log('error in getDecks', error);
        res.status(400).json({success: false, message: error.message});
    }

}
export const createDeck = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const {topic, cards} = req.body;
        const newDeck = new Flashcard({
            topic,
            cards
        });
        await newDeck.save();
        user.decks.push({
            topic: 'Second Sample',
            deck: newDeck._id,
            isPublic: true
        })
        await user.save();

        res.status(200).json({
            success: true,
            user:{
                ...user._doc,
                password: undefined
            }
        })
    } catch (error) {
        console.log('error in create Deck', error);
        res.status(400).json({success: false, message: error.message});
    }
}