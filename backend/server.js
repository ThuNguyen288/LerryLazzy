const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3000;

const path = require('path');

app.use(express.static(path.join(__dirname, 'frontend', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

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
