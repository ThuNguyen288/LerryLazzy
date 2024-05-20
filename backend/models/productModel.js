const sql = require('mssql');

async function getProducts(config) {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query('SELECT * FROM Products');
        return products.recordset;
    } catch (error) {
        console.error('Error retrieving products:', error);
        throw error;
    } finally {
        await sql.close();
    }
}

module.exports = {
    getProducts : getProducts
};
