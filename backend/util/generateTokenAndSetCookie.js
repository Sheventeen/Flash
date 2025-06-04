import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({userId}, process.env.JWT,{
        expiresIn:'7d'
    })
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV ==='production',
        sameSite: 'Strict',
        maxAge: 7 * 60 * 60 * 1000
    });
    return token;
}