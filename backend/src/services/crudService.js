import bcrypt from 'bcryptjs';
import db from '../models/index';

const saltRounds = 10;

let createNewUser = async (data) => {
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

            resolve('Create new user succeeded!');
        } catch (e) {
            reject(e);
        }
    });
};

let hashUserPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) reject(err);
            resolve(hash);
        });
    });
};

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true,
            });
            resolve(users);
            
        } catch (e) {
            reject(e);
        }
    })
}

let getUserInfoById = (id) => {
    return new Promise( async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {UserID: id}, 
                raw: true,
            });
            if (user) {
                resolve(user);
            } else {
                reject('User not found!');
            }
        } catch (e) {
            reject(e);
        }
    })
}

let updateUserData = async (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { UserID: data.UserID }
            });
            if (!user) {
                reject('User not found!');
            } else {
                await user.update({
                    Firstname: data.Firstname,
                    Lastname: data.Lastname,
                    Phone: data.Phone,
                    Address: data.Address
                });
                let allUsers = await db.User.findAll();
                resolve(allUsers);
            }
        } catch(e) {
            reject(e);
        }
    });
}

let deleteUserById = (userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { UserID: userId }
            });
            if (!user) {
                reject('User not found!');
            } else {
                await user.destroy();
            }
            resolve();
        } catch {
            reject(e);
        }
    })
}


module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById : getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById
};
