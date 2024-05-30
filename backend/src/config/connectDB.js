import sql from "mssql";

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
    logging: false,
    port: 1334
};

// import sql from "mysql";
// var config = sql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "2882002t"
// });

let connectDB = async () => {
    try {
        await sql.connect(config);
        console.log('Connected to SQL Server');
    } catch (err) {
        console.error('Error connecting to SQL Server:', err);
    }
};


module.exports = connectDB;