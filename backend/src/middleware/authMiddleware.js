import jwt from 'jsonwebtoken';

let verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            message: 'Token not provided' 
        });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
        return res.status(401).json({ 
            message: 'Invalid token' 
        });
        }
        req.userId = decoded.userId;
        next();
    });
};

module.exports = {
    verifyToken: verifyToken
}