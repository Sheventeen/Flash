import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
//  hidden enviroment variables (shhhhhh.. dont tell anyone :) )
const GMAIL = process.env.GMAIL;
const GMAIL_PASSWORD = process.env.GMAIL_PASS;

//  transporter object used to create emails from a spectific gmail account to be used for functionallity
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: GMAIL,
        pass: GMAIL_PASSWORD
    }
});
//  sends the user a verification email upon signup
export const sendVerificationEmail = async(to, verificationCode) => {
try {
    await transporter.sendMail({
        from: `"FlashApple" <${GMAIL}>`,
        to,
        subject:"Account Verification",
        text: `Your verification code is ${verificationCode}. It will expire in 2 hours`,
        html: `<p>Your verification email <b>${verificationCode}</b></p>`
    });
    console.log('verification successful');
} catch (error) {
    console.log('error in sending email');
    console.log(error);
}};