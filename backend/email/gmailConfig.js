import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const GMAIL = process.env.GMAIL;
const GMAIL_PASSWORD = process.env.GMAIL_PASS;


const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: GMAIL,
        pass: GMAIL_PASSWORD
    }
});


export const sendVerificationEmail = async(to, verificationCode) => {
try {
    //console.log(GMAIL + ' ' + GMAIL_PASSWORD);
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