const userModel = require('../models/userModel');

class UserController {
    addUser(req, res) {
        userModel.addUser(req.body);
        res.redirect('/');
    }

    getUsers(req, res) {
        res.render('index.ejs', { users: userModel.getUsers() });
    }
}

module.exports = new UserController();
