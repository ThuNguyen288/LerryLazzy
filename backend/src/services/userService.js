import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../models/index'
import { sendResetPasswordEmail } from "./emailService"

const saltRounds = 10  

// Function to encode password
let hashUserPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                return reject(err)  
            }
            resolve(hash)  
        })  
    })  
}  

// Function to handle user login
let userLogin = (username, password) => {
    return new Promise (async (resolve, reject) => {
        try {
            let userData = {
                errCode: 0,
                errMessage: ''
            }    

            let isExist = await checkUsername(username)    

            if (isExist) {
                // User already exists
                let user = await db.User.findOne({
                    attributes: ['UserID', 'Username', 'Password', 'Role'],
                    where: { Username : username },
                })    

                if (user) {
                    // Compare password
                    let isPasswordValid = await bcrypt.compare(password, user.Password)    

                    if (isPasswordValid) {
                        userData.token = createToken(user)
                        userData.user = user
                        delete userData.user.Password

                        userData.errMessage = 'Login successfully!'    
                    } else {
                        userData.errCode = 3    
                        userData.errMessage = 'Incorrect password. Please try again.'    
                    }

                } else {
                    userData.errCode = 2    
                    userData.errMessage = 'User not found'    
                }

            } else {
                userData.errCode = 1    
                userData.errMessage = 'Username is not exist. Please try other username.'    
            }
            
            resolve(userData)    
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

            let isUsernameExist = await checkUsername(data.username)    

            if (!isUsernameExist) {
                let hashPassword = await hashUserPassword(data.password)    
                let newUser = await db.User.create({
                    Username: data.username,
                    Password: hashPassword,
                    Firstname: data.firstname,
                    Lastname: data.lastname,
                    Email: data.email,
                    Role: 'customer' 
                })    

                userData.token = createToken(newUser)   
                userData.user = {
                    username: newUser.Username,
                    password: newUser.Password,
                    firstname: newUser.Firstname,
                    lastname: newUser.Lastname,
                    email: newUser.Email,
                }    

                userData.errMessage = 'Create account successfully'    
            } else {
                userData.errCode = 1    
                userData.errMessage = 'Username already exists. Please try again'    
            }

            resolve(userData)    
        } catch (error) {
            reject(error)    
        }
    })    
}  

// Function to create token
let createToken = (user) => {
    const payload = { userid: user.UserID, username: user.Username, role: user.Role }
    const secret = process.env.ACCESS_TOKEN_SECRET
    const options = { expiresIn: '1h' }

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
            let user = await db.User.findOne({
                where: { Username: username },
                attributes: ['Firstname', 'Lastname', 'Email', 'Address', 'Phone']
            })  
            if (!user) {
                resolve({
                    errCode: 1,
                    errMessage: 'User not found!'
                })  
            }
            resolve({
                errCode: 0,
                errMessage: 'User found!',
                user: user
            })  
        } catch (error) {
            reject(error)  
        }
    })  
}  

// Function to update profile
let updateProfile = (username, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!username) {
                resolve({
                    errCode: 1,
                    errMessage: 'Username is required!'
                })  
            }
            let user = await db.User.findOne({
                where: { Username: username }
            })  
            if (!user) {
                resolve({
                    errCode: 1,
                    errMessage: 'User not found!'
                })  
            } else {
                await db.User.update({
                    Firstname: data.Firstname,
                    Lastname: data.Lastname,
                    Email: data.Email,
                    Address: data.Address,
                    Phone: data.Phone
                }, {
                    where: { Username: username },
                })

                const updateUser = await db.User.findOne({
                    where: { Username: username },
                    attributes: ['Firstname', 'Lastname', 'Phone', 'Email', 'Address']
                })

                resolve({
                    errCode: 0,
                    errMessage: 'Profile updated successfully!',
                    data: updateUser
                }) 
            }
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
                resolve(userData)
            }

            let user = await db.User.findOne({
                where: { Username: username }
            })    

            // Check if user exists
            if (!user) {
                userData.errCode = 2,
                userData.errMessage = 'User not found!'
            }

            // Check if old password matches
            let isPasswordValid = await bcrypt.compareSync(oldpassword, user.Password);
            if (!isPasswordValid) {
                userData.errCode = 1,
                userData.errMessage = 'Current password is incorrect!'
                resolve(userData)
            }

            // Check if new password is different from the old one
            if (oldpassword === newpassword) {
                userData.errCode = 4
                userData.errMessage = 'New password must be different from the current password.'    
                resolve(userData)
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
            resolve(userData)

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

            let user = await db.User.findOne({
                where: { Username: username }
            })    

            if (!user) {
                userData.errCode = 1    
                userData.errMessage = 'Username is not exist. Please try again'

            } else if (user.Email !== email) {
                userData.errCode = 2
                userData.errMessage = 'Email does not match our records!'

            } else {
                await sendResetPasswordEmail(email, username)
                userData.errMessage = 'Request to reset password sent successfully! Please check your email'    
            }

            resolve(userData)    
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

            let user = await db.User.findOne({
                where: { Username: username }
            })

            if (!user) {
                userData.errCode = 1    
                userData.errMessage = 'User not found!'    
                resolve(userData)    
                return    
            }

            if (user.Code.toString() !== code) {
                userData.errCode = 3    
                userData.errMessage = 'Invalid verify code. Please try again!'    
                resolve(userData)    
                return    
            }

              
            userData.errMessage = 'Verify code is correct!'    
            resolve(userData)
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
                resolve(userData)    
            }

            if (user.Code.toString() !== code) {
                userData.errCode = 3    
                userData.errMessage = 'Invalid verify code. Please try again!'    
                resolve(userData)    
            }

            let hashPassword = await hashUserPassword(password)    
            if (user.Password === hashPassword) {
                userData.errCode = 4    
                userData.errMessage = 'New password matches old password. Please choose a different one.'    
                resolve(userData)    
            }

            await db.User.update({
                Password: hashPassword,
                Code: '000000'
            }, {
                where: { Username: username }
            })    

            
            userData.errMessage = 'Password reset successfully!'    
            resolve(userData)

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
                resolve(userData)
            } 
                
            await db.User.destroy({
                where: { Username: username }
            })
            
            userData.errMessage = 'Account deleted successfully!'
            resolve(userData)

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
    deleteAccount: deleteAccount
}  