import jwt from 'jsonwebtoken';

export const verifyAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token){
        return res.status(401).json({success: false, message: 'Unauthorized user'})
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT);
        if (!decodedToken){
            return res.status(401).json({success: false, message: 'Unauthorized user'})
        }
        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        console.log('error in verifyAuth');
        res.status(500).json({success: false, message: 'server error'})
    }
}