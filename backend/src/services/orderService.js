// import db from '../models/index';

// // Function to create new order
// const createNewOrder = async (data, res) => {
//     return new Promise (async (resolve, reject) => {
//         try {
//             await db.Order.create({
//                 UserID: ,
//                 OrderDate: data.orderDate,
//                 ShippingAddress: data.shippingAddress,
//                 PaymentMethod: data.paymentMethod,
//                 TotalPrice: data.totalPrice,
//                 CouponID: data.coupon
//             });
//             res.status(200).json({ 
//                 message: 'Create new order succeeded!' 
//             });
//         } catch (e) {
//             res.status(500).json({ error: e.message });
//         }
//     });
// };

// module.exports = {
//     createNewOrder: createNewOrder
// };
