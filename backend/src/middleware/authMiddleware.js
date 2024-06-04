import jwt from 'jsonwebtoken';

let verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    console.log('Token header: ', token);
    if (!token) {
        return res.status(401).json({
            message: 'Token not provided' 
        });
    }
    const actualToken = token.split(' ')[1];

    jwt.verify(actualToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.log('JWT Error:', err);
            return res.status(401).json({ 
                message: 'Invalid token' 
            });
        }
        console.log('Decoded Token:', decoded);
        req.username = decoded.username;
        req.role = decoded.role;
        next();
    });
};

module.exports = {
    verifyToken: verifyToken
};