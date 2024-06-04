import authService from '../services/authService';

const verifyToken = async (req, res) => {
    const { token } = req.body;
    try {
        const user = await authService.verifyToken(token);
        res.json({ user });
    } catch (error) {
        res.status(401).send({ message: error });
    }
};

module.exports = { verifyToken };
