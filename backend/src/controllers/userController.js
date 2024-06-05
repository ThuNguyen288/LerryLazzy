import userService from "../services/userService";

let handleLogin = async (req, res) => {

    let { username, password } = req.body;
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
            user: userData.user ? userData.user : {},
            token: userData.token
        });
    } catch (error) {
        return res.status(500).json({
            errCode: -1,
            message: 'An internal server error occurred.',
        });
    }
};

let handleRegister = async (req, res) => {
    try {
        let userData = await userService.handleUserRegister(req.body);
        console.log(userData);
        return res.status(200).json({
            errCode: userData.errCode,
            message: userData.errMessage,
            token: userData.token,
            user: userData.user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errCode: -1,
            message: 'An internal server error occurred.'
        });
    }
};

let handleShowProfile = async (req, res) => {
    try {
        let user = await userService.getUserByUsername(req.username);
        return res.status(200).json({
            errCode: 0,
            message: 'Get user profile successfully!',
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            errCode: -1,
            message: 'An internal server error occurred.'
        });
    }
};

let handleChangeProfile = async (req, res) => {
    try {
        let data = req.body;
        let message = await userService.updateProfile(data);
        return res.status(200).json(message);
    } catch (error) {
        console.error('Error handling profile change request: ', error);
        return res.status(500).json({
            errCode: -1,
            message: 'An internal server error occurred.'
        });
    }
}

let handleDeleteAccount = async (req, res) => {
    try {
        if (!req.body.id) {
            return res.status(400).json({
                errCode: 1,
                message: 'Missing required parameter!'
            });
        }
        let message = await userService.deleteAccount(req.body.id);
        return res.status(200).json(message);
    } catch (error) {
        console.error('Error handling delete account request: ', error);
        return res.status(500).json({
            errCode: -1,
            message: 'An internal server error occurred.'
        });
    }
}

module.exports = {
    handleLogin: handleLogin,
    handleRegister: handleRegister,
    handleShowProfile: handleShowProfile,
    handleChangeProfile: handleChangeProfile,
    handleDeleteAccount: handleDeleteAccount
};

