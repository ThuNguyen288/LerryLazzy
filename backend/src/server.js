import bodyParser from "body-parser";
import express from "express";
import sql from "mssql";

import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";

require('dotenv').config();

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 8000; // Port == underfined => port = 8000

app.listen(port, () => {
    console.log("Backend Nodejs is running on port " + port);
})

const productModel = require('../model/productModel');
const userModel = require('../model/userModel');



app.get('/users', async (req, res) => {
    try {
        const users = await userModel.getUsers(config);
        console.log('Users retrieved:', users);
        res.status(200).send(users);
    } catch (error) {
        console.error('An error occurred while retrieving users:', error);
        res.status(500).send({'error': 'An error occurred while retrieving users' });
    }
})

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        let pool = await sql.connect(config);
        let result = await pool
            .request()
            .input('username', sql.NVarChar, username)
            .query('SELECT * FROM Users WHERE username = @username');

        if (result.recordset.length > 0) {
            const user = result.recordset[0];
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                res.json({ success: true, message: 'Login successful' });
            } else {
                res.status(401).json({ success: false, message: 'Invalid username or password' });
            }
        } else {
            res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.get('/products', async (req, res) => {
    try {
        const products = await productModel.getProducts(config);
        console.log('Products retrieved:', products);
        res.status(200).send(products);
    } catch (error) {
        console.error('An error occurred while retrieving products:', error);
        res.status(500).send({'error': 'An error occurred while retrieving products' });
    }
});
