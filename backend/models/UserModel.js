import mongoose, { mongo } from 'mongoose';
import Flashcard from './FlashcardModel.js';

//  user schema in how we store in out database
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    firstName: {
        type: String,
        require: true
    },
    decks:[{
        topic: {
        type:String, 
        required: true
    },
        deck: 
            {
               type: mongoose.Schema.Types.ObjectId,
                ref: "Flashcard",
            },
        isPublic: {
            type: Boolean,
            required: true
        }
              
    }],

    lastLoginDate: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordTokenExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiration: Date
},{timestamps: true});

export const User = mongoose.model('User', UserSchema)