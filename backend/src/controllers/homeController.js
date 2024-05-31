import db from '../models/index';
import userService from '../services/userService';

let getHomePage = async(req, res) => {
    try {
    let data = await db.User.findAll();
    return res.render('homepage.ejs', {
        data: JSON.stringify(data)
    });
    } catch (e) {
        console.error(e);
    }
}

let getCRUD = (req, res) => {
    return res.render('test/CRUD.ejs');
}

let postCRUD = async(req, res) => {
    let message = await userService.createNewUser(req.body);
    console.log(message);
    return res.send('post CRUD');
}

let displayCRUD = async(req, res) => {
    let data = await userService.getAllUsers();
    console.log('------------------------------');
    console.log(data);
    console.log('------------------------------');
    return res.render('test/displayCRUD.ejs', {
        dataUser: data
    });
}

let editCRUD = async (req, res) => {
    let userId = req.query.id;
    if (!userId) {
        return res.send('User not found');
    } else {
        let userData = await userService.getUserInfoById(userId);
        console.log(userData);
        return res.render('test/editCRUD.ejs', {
            userData: userData
        });
    }
}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await userService.updateUserData(data);
    return res.render('test/displayCRUD.ejs', {
        dataUser: allUsers
    });
}

let deleteCRUD = async (req, res) => {
    let userId = req.query.id;
    if (!userId) {
        return res.send('User not found');
    } else {
        await userService.deleteUserById(userId);
        return res.send("Delete user succeed!");
    }
}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    editCRUD: editCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD
}