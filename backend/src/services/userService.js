import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models/index';
import { sendResetPasswordEmail } from "./emailService";

const saltRounds = 10;

// Function to encode password
let hashUserPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                return reject(err);
            }
            resolve(hash);
        });
    });
};

// Function to handle user login
let handleUserLogin = (username, password) => {
    return new Promise (async (resolve, reject) => {
        try {
            let userData = {};

            let isExist = await checkUsername(username);

            if (isExist) {
                // User already exists
                let user = await db.User.findOne({
                    attributes: ['Username', 'Password', 'Role'],
                    where: { Username : username },
                });

                if (user) {
                    // Compare password
                    let isPasswordValid = await bcrypt.compareSync(password, user.Password);

                    if (isPasswordValid) {
                        const token = createToken(user);
                        userData.errCode = 0;
                        userData.errMessage = 'Login successfully!';
                        userData.token = token;

                        delete user.Password; 
                        userData.user = user;
                        
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Incorrect password. Please try again.';
                    }

                } else {
                    userData.errCode = 2;
                    userData.errMessage = 'User not found';
                }

            } else {
                userData.errCode = 1;
                userData.errMessage = 'Username is not exist. Please try other username.';
            }
            
            resolve(userData);
        } catch (error) {
            reject(error);
        }
    });
};

// Function to handle user register
let handleUserRegister = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};

            let isUsernameExist = await checkUsername(data.username);

            if (!isUsernameExist) {
                let hashPassword = await hashUserPassword(data.password);
                let newUser = await db.User.create({
                    Username: data.username,
                    Password: hashPassword,
                    Firstname: data.firstname,
                    Lastname: data.lastname,
                    Email: data.email,
                    Role: 'customer' 
                });

                const token = createToken(newUser);
                userData.token = token;
                userData.user = {
                    username: newUser.Username,
                    password: newUser.Password,
                    firstname: newUser.Firstname,
                    lastname: newUser.Lastname,
                    email: newUser.Email,
                };

                userData.errCode = 0;
                userData.errMessage = 'Create account successfully';
            } else {
                userData.errCode = 1;
                userData.errMessage = 'Username already exists. Please try again';
            }

            resolve(userData);
        } catch (error) {
            reject(error);
        }
    });
};

// Function to create token
let createToken = (user) => {
    const payload = { username: user.Username, role: user.Role, };
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    return token;
};

// Function to check username exists
let checkUsername = (username) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { Username: username }
            }); 
            if (!user) {
                resolve(false);
            } else {
                resolve(true);
            }
        } catch (error) {
            reject(error);
        }
    });
};

// Function to get user by username
let findUserByUsername = (username) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { Username: username }
            });
            if (!user) {
                resolve({
                    errCode: 1,
                    errMessage: 'User not found!'
                });
            }
            resolve({
                errCode: 0,
                errMessage: 'User found!',
                user: user
            });
        } catch (error) {
            reject(error);
        }
    });
};

// Function to update profile
let updateProfile = (username, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!username) {
                resolve({
                    errCode: 1,
                    errMessage: 'Username is required!'
                });
            }
            let user = await db.User.findOne({
                where: { Username: username }
            });
            if (!user) {
                resolve({
                    errCode: 1,
                    errMessage: 'User not found!'
                });
            } else {
                await db.User.update({
                    Firstname: data.firstname,
                    Lastname: data.lastname,
                    Phone: data.phone,
                    Email: data.email,
                    Address: data.address
                }, {
                    where: { Username: username }
                });

                resolve({
                    errCode: 0,
                    message: 'Profile updated successfully!'
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

// Function to change password
let changePassword = (username, oldpassword, newpassword) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!username) {
                resolve({
                    errCode: 1,
                    errMessage: 'Username is required!'
                });
            }
            let user = await db.User.findOne({
                where: { Username: username }
            });
            if (!user) {
                resolve({
                    errCode: 1,
                    errMessage: 'User not found!'
                });
            } else {
                // Check old password is valid
                let isPasswordValid = await bcrypt.compareSync(oldpassword, user.Password);
                if (isPasswordValid) {
                    // Hash new password
                    let hashPassword = await hashUserPassword(newpassword);
                    if (user.Password === hashPassword) {
                        resolve({
                            errCode: 4,
                            errMessage: 'New password must be different from the current password.'
                        });
                        return;
                    }

                    await db.User.update({
                        Password: hashPassword
                        }, {
                            where: { Username: username }
                            });

                    resolve({
                        errCode: 0,
                        errMessage: 'Password changed successfully!'
                    });
                } else {
                    resolve({
                        errCode: 1,
                        errMessage: 'Old password is incorrect!'
                    });
                }
            }
        } catch (error) {
            reject(error);
        }
    });
};

// Function to send request to reset password
let requestResetPassword =  (username, email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isExist = await checkUsername(username);

            if (isExist) {
                let user = await db.User.findOne({
                    where: { Username : username },
                });

                if (user) {
                    if (user.Email === email) {
                        resolve({
                            errCode: 0,
                            errMessage: 'Request to reset password sent successfully! Please check your email.'
                        });
                    }
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: 'Email does not match our records!'
                    });
                }
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'User not found!'
                });
            }
            await sendResetPasswordEmail(email, username);

            resolve({
                errCode: 0,
                errMessage: 'Request to reset password sent successfully! Please check your email.'
            });
        } catch (error) {
            reject(error);
        }
    });
}

// // Function to reset password
let resetPassword = (username, code, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { Username: username }
            });

            if (!user) {
                resolve({
                    errCode: 1,
                    errMessage: 'User not found!'
                });
                return; 
            }

            if (user.Code.toString() !== code) {
                resolve({
                    errCode: 3,
                    errMessage: 'Invalid verify code. Please try again!'
                });
                return;
            }

            let hashPassword = await hashUserPassword(password);
            if (user.Password === hashPassword) {
                resolve({
                    errCode: 4,
                    errMessage: 'New password matches old password. Please choose a different one.'
                });
                return;
            }

            await db.User.update({
                Password: hashPassword,
                Code: null
            }, {
                where: { Username: username }
            });

            resolve({
                errCode: 0,
                message: 'Password reset successfully!'
            });
        } catch (error) {
            reject(error);
        } 
    });
};


// Function to delete account
let deleteAccount = (id) => {
    return new Promise (async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { UserID: id }
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: "Account not found"
                });
            } else {
                await db.User.destroy({
                    where: { UserID: id }
                });
                resolve({
                    errCode: 0,
                    message: "Account deleted successfully"
                });
            }
            console.log(user);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    handleUserLogin: handleUserLogin,
    handleUserRegister: handleUserRegister,
    createToken: createToken,
    checkUsername: checkUsername,
    findUserByUsername: findUserByUsername,
    updateProfile: updateProfile,
    changePassword: changePassword,
    requestResetPassword: requestResetPassword,
    resetPassword: resetPassword,
    deleteAccount: deleteAccount
};