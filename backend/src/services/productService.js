import { where } from 'sequelize';
import db from '../models/index';

// Function to get all product by CategoryID
let getProductsByCategory = (categoryid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = await db.Product.findAll({
                where: { CategoryID: categoryid },
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
                include: [
                    {
                        model: db.Review,
                        attributes: [[db.sequelize.fn('AVG', db.sequelize.col('Rating')), 'AverageRating']],
                        required: false
                    },
                    {
                        model: db.OrderItem,
                        attributes: [[db.sequelize.fn('COUNT', db.sequelize.col('OrderID')), 'OrderCount']],
                        required: false
                    }
                ],
                group: ['Product.ProductID'],
                raw: true
            });
            resolve(product);
        } catch (error) {
            reject(error);
        }
    });
};

// Sử dụng hàm để tìm một sản phẩm cụ thể
getProductWithDetails(1).then(product => {
    console.log(product);
}).catch(error => {
    console.error(error);
});


module.exports = {
    getProductsByCategory: getProductsByCategory,
    getProductsBySubcategory: getProductsBySubcategory,
    getProductWithDetails: getProductWithDetails
};