import db from '../models/index';
import crudService from '../services/crudService';

let getHomePage = async(req, res) => {
    try {
    let data = await db.User.findAll();

    return res.render('homepage.ejs', {
        data: JSON.stringify(data)
    });
    } catch (e) {
        console.log(e);
    }
}


let getCRUD = (req, res) => {
    return res.render('test/CRUD.ejs');
}

let postCRUD = async(req, res) => {
    let message = await crudService.createNewUser(req.body);
    console.log(message);
    return res.send('post CRUD');
}

let displayCRUD = async(req, res) => {
    return res.send('Display get crud from controller');
}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD
}