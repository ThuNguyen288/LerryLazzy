import userService from "../services/userService"
import { resetCodes } from "../services/emailService"

let handleLogin = async (req, res) => {

    let { username, password } = req.body
    // Check username exists
    // Compare password
    // Return user info
    // Access token (JWT)
    try {
        if (!username || !password) {
            return res.status(400).json({
                errCode: 1,
                message: 'Username and password are required!',
            })
        }

        let userData = await userService.handleUserLogin(username, password)
        
        return res.status(200).json({
            errCode: userData.errCode,
            message: userData.errMessage,
            user: userData.user ? userData.user : {},
            token: userData.token
        })
    } catch (error) {
        return res.status(500).json({
            errCode: -1,
            message: 'An internal server error occurred.',
        })
    }
}

let handleRegister = async (req, res) => {
    try {
        let userData = await userService.handleUserRegister(req.body)
        console.log(userData)
        return res.status(200).json({
            errCode: userData.errCode,
            message: userData.errMessage,
            token: userData.token,
            user: userData.user
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            errCode: -1,
            message: 'An internal server error occurred.'
        })
    }
}

let handleShowProfile = async (req, res) => {
    try {
        let user = await userService.findUserByUsername(req.username)
        return res.status(200).json({
            errCode: 0,
            message: 'Get user profile successfully!',
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            errCode: -1,
            message: 'An internal server error occurred.'
        })
    }
}

let handleChangeProfile = async (req, res) => {
    try {
        let data = req.body
        let username = req.username
        let message = await userService.updateProfile(username, data)
        return res.status(200).json(message)
    } catch (error) {
        console.error('Error handling profile change request: ', error)
        return res.status(500).json({
            errCode: -1,
            message: 'An internal server error occurred.'
        })
    }
}

let handleChangePassword = async (req, res) => {
    try {
        let { oldpassword, newpassword } = req.body
        let username = req.username

        if (!oldpassword || !newpassword) {
            return res.status(400).json({
                errCode: 1,
                message: 'Please enter your current password and new password'
            })
        }

        let message = await userService.changePassword(username, oldpassword, newpassword)
        return res.status(200).json(message)
    } catch (error) {
        console.error('Error handling password change request: ', error)
        return res.status(200).json({
            errorCode: -1,
            message: 'An internal server error occurred.'
        })
    }
}

let handleRequestResetPassword = async (req, res) => {
    try {
        let { username, email } = req.body
        if (!username || !email) {
            return res.status(400).json({
                errCode: 1,
                message: 'Please enter your username and email'
            })
        }
        let message = await userService.requestResetPassword(username, email)
        return res.status(200).json(message)
    } catch (error) {
        return res.status(500).json({
            errCode: -1,
            message: 'An internal server error occurred.'
        })
    }
}

let handleEnterCode = async (req, res) => {
    try {
        let { username, code } = req.body

        if (!code) {
            return res.status(400).json({
                errCode: 1,
                message: 'Please enter your verify code'
            })        
        }

        let message = await userService.checkVerifyCode(username, code)
        return res.status(200).json(message)
    } catch (error) {
        return res.status(500).json({
            errCode: -1,
            message: 'An internal server error occurred.'
        })
    }
}

let handleResetPassword = async (req, res) => {
    try {
        let { username, code, password } = req.body

        if (!code) {
            return res.status(400).json({
                errCode: 1,
                message: 'Please enter your verify code'
            })        
        }

        let message = await userService.resetPassword(username, code, password)
        return res.status(200).json(message)
    } catch (error) {
        console.log('Error handling reset password: ', error)
        return res.status(500).json({
            errCode: -1,
            message: 'An internal server error occurred.'
        })
    }
}

let handleDeleteAccount = async (req, res) => {
    try {
        if (!req.body.id) {
            return res.status(400).json({
                errCode: 1,
                message: 'Missing required parameter!'
            })
        }
        let message = await userService.deleteAccount(req.body.id)
        return res.status(200).json(message)
    } catch (error) {
        console.error('Error handling delete account request: ', error)
        return res.status(500).json({
            errCode: -1,
            message: 'An internal server error occurred.'
        })
    }
}

module.exports = {
    handleLogin: handleLogin,
    handleRegister: handleRegister,
    handleShowProfile: handleShowProfile,
    handleChangeProfile: handleChangeProfile,
    handleChangePassword: handleChangePassword,
    handleRequestResetPassword: handleRequestResetPassword,
    handleEnterCode: handleEnterCode,
    handleResetPassword: handleResetPassword,
    handleDeleteAccount: handleDeleteAccount
}

