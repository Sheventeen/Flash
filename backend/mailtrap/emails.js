import { mailtrapClient, sender } from "./mailtrapConfig.js";

export const sendVerificationEmailToNewUser = async (email, verificationToken) => {
    const recipient = [{
        email,
    }]
    try {
        const response = await mailtrapClient.send({
            from: sender, 
            to: recipient,
            subject: 'Verify your email!',
            html: `thank you for checking your code is ${verificationToken}`,
            category: 'Email verification'
        })
        console.log('email sent successfully');
    } catch (error) {
        console.error('Error sending email', error)
        throw new Error(`Error sending verification emailL ${error}`)
    }
};

export const sendWelcomeEmailtoUser = async (email, name) => {
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: `Welcom ${name}`,
            html:`Welcome to Flashapp ${name}! 
                    We hope to help you in your journey studying!`
        })
        console.log('Welcome email successful!', response)
    } catch (error) {
        console.error('Error sending welcome email', error);
        throw new Error('Error sending welcome email')
    }
};

export const sendForgotPasswordtoUser = async (email, url) => {
    const recipient = [{email}]
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Forgot password",
            html:   
            `here is a link you could use to reset your password!
                <a href = ${url} RESET PASSWORD LINK </a>  
                Valid for 1 hour from issuance.`,

            category: 'password reset'
        })
    console.log('forgor password successful!', response)
    } catch (error) {
        console.error('Error sending forgor email', error);
        throw new Error('Error sending forgor email')
    }
};
export const sendResetPasswordSuccessEmail = async (email) => {
    const recipient = [{email}]
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset Email Success",
            html:   
            `Email reset was a success!`,
            category: 'password reset'
        })
    console.log('passwrod email success sent', response)
    } catch (error) {
        console.error('Error sending passowrd email success email', error);
        throw new Error('Error sending passowrd email success email')
    }
};
