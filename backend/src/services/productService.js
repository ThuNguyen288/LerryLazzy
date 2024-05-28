import bcrypt from 'bcryptjs';
import db from '../models/index';

let getAllProducts = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = await db.Product.findAll({ raw: true });
            resolve(products);
        } catch (error) {
            reject(error);
        }
    });
};


module.exports = {
    getAllProducts: getAllProducts
};