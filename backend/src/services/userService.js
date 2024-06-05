import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models/index';

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
let getUserByUsername = (username) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { Username: username }
            });
            if (!user) {
                return reject({
                    errCode: 1,
                    errMessage: 'User not found!'
                });
            }
            resolve(user);
        } catch (error) {
            reject(error);
        }
    });
};

// Function to update profile
let updateProfile = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!data.id) {
                resolve({
                    errCode: 1,
                    errMessage: 'User ID is required!'
                });
            }
            let user = await db.User.findOne({
                where: { UserID: data.id }
            });
            if (!user) {
                resolve({
                    errCode: 1,
                    errMessage: 'User not found!'
                });
            } else {
                let hashPassword = await hashUserPassword(data.password);
                await db.User.update({
                    Password: hashPassword,
                    Firstname: data.firstname,
                    Lastname: data.lastname,
                    Phone: data.phone,
                    Email: data.email,
                    Address: data.address
                }, {
                    where: { UserID: data.id }
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
    getUserByUsername: getUserByUsername,
    updateProfile: updateProfile,
    deleteAccount: deleteAccount
};