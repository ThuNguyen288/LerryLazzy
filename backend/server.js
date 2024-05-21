const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');

const productModel = require('./models/productModel');
const userModel = require('./models/userModel');

const config = {
    user: 'sa',
    password: '123456',
    server: 'LAPTOPCUATUI',
    database: 'WoolShop',
    options: {
        encrypt: true,
        trustServerCertificate: true,
        instancename: 'SQLEXPRESS'
    },
    port: 1433
};

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to Lerry Lazzy Shop');
});

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

sql.connect(config)
    .then(() => {
        console.log('Connected to SQL Server');
        app.listen(4000, () => {
            console.log('Server is running on port 4000');
        });
    })
    .catch((err) => {
        console.error('Error connecting to SQL Server:', err);
    });
