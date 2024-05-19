const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());

const config = {
    user: 'sa',
    password: '123456',
    server: 'LAPTOPCUATUI',
    database: 'LerryLazzyShop',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

app.get('/api/products', async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query('SELECT * FROM dbo.Products');
        res.json(products.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

sql.connect(config, (err) => {
    if (err) {
        console.error('Error connecting to SQL Server:', err);
        return;
    }
    console.log('Connected to SQL Server');
});
