import { where } from 'sequelize';
import db from '../models/index';

// Function to get all product by CategoryID
let getProductsByCategory = (categoryid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = await db.Product.findAll({
                where: { CategoryID: categoryid },
                raw: true
            });
            resolve(products);
        } catch (error) {
            reject(error);
        }
    });
}

// Function to get all product by SubcategoryID
let getProductsBySubcategory = (subcategoryid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = await db.Product.findAll({
                where: { SubcategoryID: subcategoryid },
                raw: true
            });
            resolve(products);
        } catch (error) {
            reject(error);
        }
    });
}

let getProductWithDetails = (productid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let product = await db.Product.findOne({
                where: { ProductID: productid },
                include: [{
                    model: db.Review,
                    attributes: [[db.sequelize.fn('AVG', db.sequelize.col('Rating')), 'AverageRating']],
                    required: false
                },
                {
                    model: db.OrderItem,
                    attributes: [[db.sequelize.fn('COUNT', db.sequelize.col('OrderID')), 'OrderCount']],
                    required: false
                }],
                group: ['Product.ProductID'],
                raw: true
            });
            resolve(product);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    getProductsByCategory: getProductsByCategory,
    getProductsBySubcategory: getProductsBySubcategory,
    getProductWithDetails: getProductWithDetails
};