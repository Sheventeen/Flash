import mongoose, { Schema } from 'mongoose';

//  models our flashcard schema
const flashcardSchema = new mongoose.Schema({
    topic: {
        type:String, 
        required: true
    },
    cards: 
        [
            {
                front: {
                type:String,
                required:true
            },
                back:{
                type:String, 
                required:true
            }
        }
        ] 
},
    {timestamps:true});

const Flashcard = mongoose.model('Flashcard', flashcardSchema);
export default Flashcard;