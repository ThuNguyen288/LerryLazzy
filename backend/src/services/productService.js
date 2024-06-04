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

// Function to get product by id
let getProductById = (productid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let product = await db.Product.findOne({
                where: { ProductID: productid },
            });
            resolve(product);
        } catch (error) {
            console.error('Error in getProductWithDetails function:', error);
            reject(error);
        }
    });
};

// Function to get all products
const getAllProducts = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = await db.Product.findAll({
                include: [{
                    model: db.Review,
                }],
            });
            console.log('Get all products: ', products);
            resolve(products);
        } catch (error) {
            reject(error);
        }
    });
};

// Function to get image of product
let getProductImage = (productid) => {
    return new Promise(async (resolve, reject) => {
      try {
        let product = await db.Product.findOne({
          where: { ProductID: productid },
          attributes: ['Image'],
        });
  
        if (product && product.Image) {
          resolve(product.Image);
        } else {
          reject(new Error('Product not found or image not available'));
        }
      } catch (error) {
        reject(error);
      }
    });
  };

// Function to calculate average rating of product
let calAverageRating = (productid) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await db.Review.findOne({
                attributes: [
                    [db.sequelize.fn('AVG', db.sequelize.col('Rating')), 'AverageRating']
                ],
                where: { ProductID: productid },
                group: ['ProductID'],
                order: ['ProductID']
            });

            resolve(result.AverageRating || 0);
        } catch (error) {
            console.error('Error in calculateAverageRating:', error);
            reject(error);
        }
    });
};

// Function to calculate total ordered of product
const calTotalOrders = (productid) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await db.OrderItem.findOne({
                attributes: [
                    [db.sequelize.fn('COUNT', db.sequelize.col('OrderItem.OrderID')), 'OrderCount']
                ],
                where: { ProductID: productid },
                group: ['ProductID'],
                order: ['ProductID']
            });

            resolve(result.OrderCount || 0);
        } catch (error) {
            console.error('Error in calculateTotalOrders:', error);
            reject(error);
        }
    });
};

module.exports = {
    getProductsByCategory: getProductsByCategory,
    getProductsBySubcategory: getProductsBySubcategory,
    getProductById: getProductById,
    getAllProducts: getAllProducts,
    calAverageRating: calAverageRating,
    calTotalOrders: calTotalOrders,
    getProductImage: getProductImage
};

