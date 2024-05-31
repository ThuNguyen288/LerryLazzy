import bcrypt from 'bcryptjs';
import db from '../models/index';

const saltRounds = 10;

// Function to encode password
const hashUserPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                return reject(err);
            }
            resolve(hash);
        });
    });
};

// Function to create new user
const createNewUser = (data, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                Username: data.username,
                Password: hashPasswordFromBcrypt,
                Firstname: data.firstname,
                Lastname: data.lastname,
                Phone: data.phone,
                Email: data.email,
                Address: data.address,
                Role: data.role || 'customer' 
            });
            resolve({
                errCode: 0,
                message: 'Create new user successfully!'
                });
        } catch (error) {
            reject(error);
        }
    });
};

// Function to get all users
let getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({ raw: true });
            resolve(users);
        } catch (error) {
            reject(error);
        }
    });
};

// Function to get user information by id
let getUserInfoById = (id) => {
    return new Promise( async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {UserID: id}, 
                raw: true
            });
            if (!user) {
                resolve({
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

// Function to update user information
let updateUserData = async (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { UserID: data.UserID }
            });
            if (!user) {
                resolve({
                    errCode: 1,
                    errMessage: 'User not found!'
                });
            } else {
                await user.update({
                    Firstname: req.body.Firstname,
                    Lastname: req.body.Lastname,
                    Phone: req.body.Phone,
                    Address: req.body.Address
                });
            }
            let allUsers = await db.User.findAll({ raw: true });
            resolve(allUsers);
        } catch (error) {
            reject(error);
        }
    });
};

// Funtion to detele user
let deleteUserById = (userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { UserID: userId }
            });
            if (!user) {
                resolve({
                    errCode: 1,
                    errMessage: 'User not found!'
                });
            } else {
                await user.destroy();
                resolve({
                    errCode: 0,
                    errMessage: 'User deleted successfully!'
                })
            }
        } catch (error) {
            reject(error);
        }
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
                    raw: true
                });

                if (user) {
                    // Compare password
                    let isPasswordValid = await bcrypt.compareSync(password, user.Password);

                    if (isPasswordValid) {
                        userData.errCode = 0;
                        userData.errMessage = 'Login successfully!';
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
}

// Function to check username exists
let checkUsername = (username) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { Username: username },
                raw: true
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

module.exports = {
    createNewUser: createNewUser,
    getAllUsers: getAllUsers,
    getUserInfoById : getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
    handleUserLogin: handleUserLogin,
    checkUsername: checkUsername,
};