import {User} from '../models/UserModel.js';
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
export const viewDeck = async (req, res) => {
    const {deckId} = req.params;
    try {
        const chosenDeck = await Flashcard.findById(deckId);
        res.status(200).json({
            success:true,
            chosenDeck
        })

    } catch (error) {
        console.log('error in viewDeck', error);
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
            topic,
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
export const editDeck = async (req, res) => {
    const {deckId} = req.params;
    try {
        const user = await User.findById(req.userId);
        if(!user){
            return res.status(400).json({success: false, message: 'user not found'});
        }
        const deck = await Flashcard.findByIdAndUpdate(
            deckId,
            req.body,
            { new: true, runValidators: true }
        )
        for (let i = 0; i < user.decks.length; i++){
            if (user.decks[i]?.deck.toString() === deckId.toString()){
                user.decks[i].topic = deck.topic;
            }
        }
        await deck.save();
        await user.save();
        console.log(deck);
        res.status(200).json({
            deck,
            user:{
                ...user._doc,
                password: undefined
            }});
    } catch (error) {
        console.log('error in edit Deck', error);
        res.status(400).json({
            success: false, 
            message: error.message});
    }
}

export const deleteDeck = async (req, res) => {
    const {deckId} = req.body;
    try {
        const user = await User.findById(req.userId);
        if(!user){
            return res.status(400).json({success: false, message: 'user not found'});
        }
        const deletedDeck = await Flashcard.findByIdAndDelete(
            deckId,
            { new: true, runValidators: true }
        )
        if(!deletedDeck){
            return res.status(400).json({success: false, message: 'deck not found'});
        }
        user.decks = user.decks.filter(d => d.deck.toString() !== deckId);
        await user.save();

        res.status(200).json({
            message:'deck deleted',
             user:{
                ...user._doc,
                password: undefined
            }});
    } catch (error) {
        console.log('error in delete deck', error);
        res.status(400).json({success: false, message: error.message});
    }
}