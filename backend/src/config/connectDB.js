// import sql from "mssql";

// const config = {
//     user: 'sa',
//     password: '123456',
//     server: 'LAPTOPCUATUI',
//     database: 'WoolShop',
//     options: {
//         encrypt: true,
//         trustServerCertificate: true,
//         instancename: 'SQLEXPRESS'
//     },
//     logging: false,
//     port: 1433
// };

// // import sql from "mysql";
// // var config = sql.createConnection({
// //     host: "localhost",
// //     user: "root",
// //     password: "2882002t"
// // });

// let connectDB = async () => {
//     try {
//         await sql.connect(config);
//         console.log('Connected to SQL Server');
//     } catch (err) {
//         console.error('Error connecting to SQL Server:', err);
//     }
// };


// module.exports = connectDB;
const mysql = require('mysql2/promise');

const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',  
      user: 'root',       
      password: '2882002t',
      database: 'woolshop',
      port: 3306
    });

    console.log('Successfully connected to the database.');
    return connection;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
};

module.exports = connectDB;
