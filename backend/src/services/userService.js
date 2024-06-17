import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../models/index'
import { sendResetPasswordEmail } from "./emailService"

let saltRounds = 10  

// Function to encode password
let hashUserPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (error, hash) => {
            if (error) {
                return reject(error)  
            }
            resolve(hash)  
        })  
    })  
}

// Function to handle user login
let userLogin = (username, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {
                errCode: 0,
                errMessage: ''
            }

            // Check if username exists
            let isExist = await checkUsername(username)

            if (!isExist) {
                userData.errCode = 1
                userData.errMessage = 'Username does not exist. Please try another username.'
                return resolve(userData)
            }

            // Find user
            let user = await db.User.findOne({
                attributes: ['UserID', 'Username', 'Password', 'Role'],
                where: { Username: username },
            })

            if (!user) {
                userData.errCode = 2
                userData.errMessage = 'User not found'
                return resolve(userData)
            }

            // Compare password
            let isPasswordValid = await bcrypt.compare(password, user.Password)

            if (!isPasswordValid) {
                userData.errCode = 3
                userData.errMessage = 'Incorrect password. Please try again.'
                return resolve(userData)
            }

            userData.token = createToken(user)
            userData.user = user
            delete userData.user.Password

            userData.errMessage = 'Login successfully!'
            return resolve(userData)

        } catch (error) {
            reject(error)
        }
    })
}

// Function to handle user register
let userRegister = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {
                errCode: 0,
                errMessage: ''
            }    

            // Check if username exist
            let isUsernameExist = await checkUsername(data.username)    

            if (isUsernameExist) {
                userData.errCode = 1
                userData.errMessage = 'Username already exists. Please try again'
                return resolve(userData)
            }

            let hashPassword = await hashUserPassword(data.password)
            // Create new user
            let newUser = await db.User.create({
                Username: data.username,
                Password: hashPassword,
                Firstname: data.firstname,
                Lastname: data.lastname,
                Email: data.email,
                Role: 'customer' 
            })

            // Create token for new user
            userData.token = createToken(newUser)   
            userData.user = {
                username: newUser.Username,
                password: newUser.Password,
                firstname: newUser.Firstname,
                lastname: newUser.Lastname,
                email: newUser.Email,
            }

            userData.errMessage = 'Create account successfully'
            return resolve(userData)
   
        } catch (error) {
            reject(error)    
        }
    })    
}  

// Function to create token
let createToken = (user) => {
    let payload = { userid: user.UserID, username: user.Username, role: user.Role }
    let secret = process.env.ACCESS_TOKEN_SECRET
    let options = { expiresIn: '1h' }

    return jwt.sign(payload, secret, options)
   
}

// Function to check username exists
let checkUsername = (username) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { Username: username }
            })   
            if (!user) {
                resolve(false)  
            } else {
                resolve(true)  
            }
        } catch (error) {
            reject(error)  
        }
    })  
}  

// Function to get user by username
let findUserByUsername = (username) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {
                errCode: 0,
                errMessage: '',
                user: null
            }

            // Find user
            let user = await db.User.findOne({
                where: { Username: username },
                attributes: ['Firstname', 'Lastname', 'Email', 'Address', 'Phone', 'Password', 'DateOfBirth', 'Role']
            })

            if (!user) {
                userData.errCode = 1;
                userData.errMessage = 'User not found!';
                return resolve(userData);
            }

            userData.errMessage = 'User found!';
            userData.user = user;
            return resolve(userData)
        } catch (error) {
            reject(error)  
        }
    })  
}  

// Function to update profile
let updateProfile = (username, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {
                errCode: 0,
                errMessage: '',
                user: null
            }
            // Check if username is provided
            if(!username) {
                userData.errCode = 1
                userData.errMessage = 'Username is required!'
                return resolve(userData)
            }

            // Find user 
            let user = await db.User.findOne({
                where: { Username: username }
            })

            if (!user) {
                userData.errCode = 2;
                userData.errMessage = 'User not found!';
                return resolve(userData);
            } 

            // Update user profile
            await db.User.update({
                Firstname: data.Firstname,
                Lastname: data.Lastname,
                Email: data.Email,
                Address: data.Address,
                Phone: data.Phone,
                DateOfBirth: data.DateOfBirth
            }, {
                where: { Username: username },
            })

            // Retrieve updated user profile
            let updateUser = await db.User.findOne({
                where: { Username: username },
                attributes: ['Firstname', 'Lastname', 'Phone', 'Email', 'Address', 'DateOfBirth']
            })

            userData.errMessage = 'Profile updated successfully!'
            userData.user = updateUser
            return resolve(userData)

        } catch (error) {
            reject(error)  
        }
    })  
}  

// Function to change password
let changePassword = (username, oldpassword, newpassword) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {
                errCode: 0,
                errMessage: ''
            }    

            // Validate username
            if (!username) {
                userData.errCode = 3,
                userData.errMessage = 'Username is required!'
                return resolve(userData)
            }

            // Find user
            let user = await db.User.findOne({
                where: { Username: username }
            })    

            // Check if user exists
            if (!user) {
                userData.errCode = 2,
                userData.errMessage = 'User not found!'
                return resolve(userData)
            }

            // Check if old password matches
            let isPasswordValid = await bcrypt.compareSync(oldpassword, user.Password)
            if (!isPasswordValid) {
                userData.errCode = 1,
                userData.errMessage = 'Current password is incorrect!'
                return resolve(userData)
            }

            // Check if new password is different from the old one
            if (oldpassword === newpassword) {
                userData.errCode = 4
                userData.errMessage = 'New password must be different from the current password.'    
                return resolve(userData)
            }

            // Hash new password
            let hashPassword = await hashUserPassword(newpassword)

            // Update user's password in the database
            await db.User.update({ 
                Password: hashPassword 
            }, { 
                where: { Username: username } 
            })
            
            userData.errMessage = 'Password changed successfully!'
            return resolve(userData)

        } catch (error) {
            reject(error)
        }
    })
}

// Function to send request to reset password
let requestResetPassword = (username, email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {
                errCode: 0,
                errMessage: ''
            }    

            // Validate username
            if (!username) {
                userData.errCode = 3
                userData.errMessage = 'Username is required!'
                return resolve(userData)
            }

            // Validate email
            if (!email) {
                userData.errCode = 4
                userData.errMessage = 'Email is required!'
                return resolve(userData)
            }

            // Find user
            let user = await db.User.findOne({
                where: { Username: username }
            })    

            // Check if user exist
            if (!user) {
                userData.errCode = 1    
                userData.errMessage = 'Username is not exist. Please try again'
                return resolve(userData)
            }

            if (user.Email !== email) {
                userData.errCode = 2
                userData.errMessage = 'Email does not match our records!'
                return resolve(userData)
            }

            // Send reset password email
            await sendResetPasswordEmail(email, username)
            userData.errMessage = 'Request to reset password sent successfully! Please check your email'    
            return resolve(userData)

        } catch (error) {
            reject(error)    
        }
    })    
}

// Function to check verify code
let checkVerifyCode = (username, code) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {
                errCode: 0,
                errMessage: ''
            }

            // Find user
            let user = await db.User.findOne({
                where: { Username: username }
            })

            // Check if user is exist
            if (!user) {
                userData.errCode = 1    
                userData.errMessage = 'User not found!'    
                return resolve(userData)    
            }

            // Check if code does not match
            if (user.Code.toString() !== code) {
                userData.errCode = 3    
                userData.errMessage = 'Invalid verify code. Please try again!'    
                return resolve(userData)    
            }

            userData.errMessage = 'Verify code is correct!'    
            return resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}

// Function to reset password
let resetPassword = (username, code, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {
                errCode: 0,
                errMessage: ''
            }

            let user = await db.User.findOne({
                where: { Username: username }
            })

            if (!user) {
                userData.errCode = 1
                userData.errMessage = 'User not found!'    
                return resolve(userData)    
            }

            if (user.Code.toString() !== code) {
                userData.errCode = 3    
                userData.errMessage = 'Invalid verify code. Please try again!'    
                return resolve(userData)    
            }

            let hashPassword = await hashUserPassword(password)    
            if (user.Password === hashPassword) {
                userData.errCode = 4    
                userData.errMessage = 'New password matches old password. Please choose a different one.'    
                return resolve(userData)    
            }

            await db.User.update({
                Password: hashPassword,
                Code: '000000'
            }, {
                where: { Username: username }
            })    

            userData.errMessage = 'Password reset successfully!'    
            return resolve(userData)

        } catch (error) {
            reject(error)    
        } 
    })    
}     

// Function to delete account
let deleteAccount = (username) => {
    return new Promise (async (resolve, reject) => {
        try {
            let userData = {
                errCode: 0,
                errMessage: ''
            }

            let user = await db.User.findOne({
                where: { Username: username }
            })
            
            if (!user) {
                userData.errCode = 1
                userData.errMessage = 'User not found!'
                return resolve(userData)
            } 
                
            await db.User.destroy({
                where: { Username: username }
            })
            
            userData.errMessage = 'Account deleted successfully!'
            return resolve(userData)

        } catch (error) {
            reject(error)  
        }
    })  
}

module.exports = {
    userLogin: userLogin,
    userRegister: userRegister,
    checkUsername: checkUsername,
    findUserByUsername: findUserByUsername,
    updateProfile: updateProfile,
    changePassword: changePassword,
    requestResetPassword: requestResetPassword,
    checkVerifyCode: checkVerifyCode,
    resetPassword: resetPassword,
    deleteAccount: deleteAccount,
}