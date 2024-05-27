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
            res.status(201).json({ message: 'Create new user succeeded!' });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    });
};

// Function to get all users
let getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({ raw: true });
            resolve(users);
        } catch (e) {
            res.status(500).json({ error: e.message });
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
                return res.status(404).json({ message: 'User not found!' });
            }
            res.status(200).json(user);
        } catch (e) {
            res.status(500).json({ error: e.message });
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
                return res.status(404).json({ message: 'User not found!' });
            } else {
                await user.update({
                    Firstname: req.body.Firstname,
                    Lastname: req.body.Lastname,
                    Phone: req.body.Phone,
                    Address: req.body.Address
                });
            }
            let allUsers = await db.User.findAll({ raw: true });
            res.status(200).json(allUsers);
        } catch (e) {
            res.status(500).json({ error: e.message });
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
                return res.status(404).json({ message: 'User not found!' });
            } else {
                await user.destroy();
                res.status(200).json({ message: 'User deleted successfully' });
            }
        } catch {
            res.status(500).json({ error: e.message });
        }
    });
};


module.exports = {
    createNewUser: createNewUser,
    getAllUsers: getAllUsers,
    getUserInfoById : getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById
};
