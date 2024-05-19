const express = require('express');
const bodyParser = require('body-parser');
const mssql = require('mssql');

const app = express();
const PORT = process.env.PORT || 3000; 


app.use(express.json());


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const config = {
    user: 'sa',
    password: '123456',
    server: 'LAPTOPCUATUI\\SQLEXPRESS',
    database: 'LerryLazzyShop',
    options: {
      encrypt: true, 
      enableArithAbort: true,
    },
  };
  
  mssql.connect(config, (err) => {
    if (err) {
      console.error('Error connecting to SQL Server:', err);
      return;
    }
    console.log('Connected to SQL Server');
  });