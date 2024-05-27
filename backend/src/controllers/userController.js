import userService from "../services/userService";

let handleLogin = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password; 
    // Check username exists
    // Compare password
    // Return user info
    // Access token (JWT)
    try {
        if (!username || !password) {
            return res.status(400).json({
                errCode: 1,
                message: 'Username and password are required!',
            });
        }

        let userData = await userService.handleUserLogin(username, password);

        return res.status(200).json({
            errCode: userData.errCode,
            message: userData.errMessage,
            user: userData.user ? userData.user : {}
        });
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            message: 'An internal server error occurred.',
            error: error.message,
        });
    }
};

module.exports = {
    handleLogin: handleLogin
};

