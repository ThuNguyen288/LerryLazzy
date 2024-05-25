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
            let users = await db.User.findAll();
            resolve(users);
            
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser
};
