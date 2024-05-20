const sql = require('mssql');

async function getUsers(config) {
    try {
        let pool = await sql.connect(config);
        let users = await pool.request().query('SELECT * FROM Users');
        return users.recordset;
    } catch (error) {
        console.error('Error retrieving users:', error);
        throw error;
    } finally {
        await sql.close();
    }
}

module.exports = {
    getUsers : getUsers
};
