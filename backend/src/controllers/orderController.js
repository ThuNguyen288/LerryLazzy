import db from '../models/index';

let createOrder = async(req, res) => {
    try {
        let message = await crudService.createNewOrder(req.body);
        res.status(200).json({
            sucess: true,
            message: 'New order created successfully',
            
        });
        console.log(message);
    } catch (e) {
        console.error('Error creating orsder: ', err);
        res.status(500).json({
            sucess: false,
            message: 'Server error. Please try again.',
            error: err.message,
        });
    }
}



