import {User} from '../models/UserModel.js';
import bCryptjs from 'bcryptjs';
import crypto from  'crypto';
import { generateTokenAndSetCookie } from '../util/generateTokenAndSetCookie.js';
import { sendVerificationEmailToNewUser } from '../mailtrap/emails.js';
import { sendWelcomeEmailtoUser, sendForgotPasswordtoUser, sendResetPasswordSuccessEmail } from '../mailtrap/emails.js';
import Flashcard from '../models/FlashcardModel.js';


export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user){
            return res.status(400).json({success: false, message: 'User not found'});
        }
        res.status(200).json({
            success: true,
            user:{
                ...user._doc,
                password: undefined
            }
        })
    } catch (error) {
         console.log('error in checkAuth', error);
        res.status(400).json({success: false, message: error.message});
    }
};

export const signup = async (req, res) => {
    const {email, password, password2, lastName, firstName} = req.body;
    try {
        if (!email || !password || !lastName || !firstName || !password2){
            throw new Error('Must enter all fields');
        }
        if(!email.endsWith('@gmail.com')){
            throw new Error('Please enter a valid gmail account');
        }
        if(password.length < 6){
            throw new Error('Please enter a password of greater than 5 length');
        }
        const existingUser = await User.findOne({email})
        if (existingUser){
            return res.status(400).json({success: false, message: 'User already exists'});
        }
        if (password != password2) {
            return res.status(400).json({success:false, message:'password must match!'})
        }
        const hashedPassword = await bCryptjs.hash(password, 12);
        const verificationToken = Math.floor (10000000 + Math.random() * 90000000).toString();

        const newDeck = new Flashcard({
            topic:'Sample Deck',
            cards: [{
                front: 'Beeba',
                back: 'Singh'
            },
            {
                front: 'Gidgi',
                back: 'Widgi'
            },
            {
                front: 'Do you wanna',
                back: 'Eat'
            },
            {
                front: 'Alley',
                back: 'Pond?'
            }
        ]})
        await newDeck.save();
        const newUser = new User({
            email,
            password: hashedPassword,
            lastName,
            firstName,
            decks: [{deck: newDeck._id, topic: "Sample Deck", isPublic: false }],
            verificationToken, 
            verificationTokenExpiration: Date.now() + 24 * 60 * 60 * 1000 // 24 hour
        });
        await newUser.save();

        generateTokenAndSetCookie(res, newUser._id);
        await sendVerificationEmailToNewUser(newUser.email, verificationToken);
        
        res.status(201).json({
            success: true,
            message: 'New user has been created!',
            newUser:{
                ...newUser._doc,
                password: undefined
            }
        })

    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
};

export const verifyEmail = async (req, res) => {
    const {code} = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiration: {$gt: Date.now()}
        })

        if(!user){
            return res.status(400).json({success: false, message: 'Invalid/expired code'})
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiration = undefined;
        await user.save();

        await sendWelcomeEmailtoUser(user.email, user.firstName);
        res.status(200).json({success: true, message: "welcome email successfull", user: {
            ...user._doc,
            password: undefined
        }})

    } catch (error) {
        console.log('error in verifying email', error);
        res.status(500).json({success: false, message: 'server error'});
    }

};

export const login = async (req, res) => {
    const {email, password} = req.body

    try {
        if(!email || !password){
            throw new Error('Please enter all fields!')
        }
        const user = await User.findOne({email});
        if(!user){
            throw new Error('User does not exist with the given email');
        }
        const checkPassword = await bCryptjs.compare(password, user.password)
        if (! checkPassword){
            throw new Error('Wrong password');
        }

        generateTokenAndSetCookie(res, user._id);
        user.lastLoginDate = new Date();
        await user.save();


        res.status(201).json({
            success: true,
            message: 'Login successful',
            user:{
                ...user._doc,
                password: undefined
            }
        })
    } catch (error) {
        console.log('error in login', error);
        res.status(400).json({success: false, message: error.message});
    }

};

export const logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({success: true, message: 'Successful logout'});
};

export const forgotPassword = async (req, res) => {
    const {email} = req.body;
    
    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(200).json(
                {
                success: true,
                message: 'If an account with that email exists, a reset link has been sent.',});
        }
        const resetPasswordToken =  crypto.randomBytes(20).toString('hex');
        const resetPasswordTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordTokenExpiresAt = resetPasswordTokenExpiresAt;
        
        await user.save();
        await sendForgotPasswordtoUser(user.email, `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`);

        res.status(200).json({success: true, message: 'forgor email sent', resetPasswordToken: user.resetPasswordToken});

    } catch (error) {
        console.log('IM THE ERROR FORGOT PASSWORD AUTHCONTROLER');
        res.status(400).json({success: false, message: error.message})
    }
};

export const resetPassword = async (req, res) => { 
    
    try {
        const {resetToken} = req.params;
        const {password, password2} = req.body;  

        const user = await User.findOne({
            resetPasswordToken: resetToken,
            resetPasswordTokenExpiresAt: { $gt: Date.now() }
        });
        if (!user){
            return res.status(400).json({success: false, message: 'Invalid/expired code'})
        }
        if (password !== password2) {
            throw new Error('Passwords must match');
        }

        const hashedPassword = await bCryptjs.hash(password,12);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiresAt = undefined;

        await user.save();
        await sendResetPasswordSuccessEmail(user.email);

        res.status(200).json({
            success: true,
            message: 'Password successfully reset'
         })
    } catch (error) {
         console.log('error in reset password');
        res.status(400).json({success: false, message: error.message})
    }
};