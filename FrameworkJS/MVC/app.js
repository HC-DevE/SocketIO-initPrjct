const express = require('express');
const userController = require('./controllers/userController');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('views engine', 'ejs');
app.set('views', './views');

app.get('/', userController.getUsers);
app.post('/add-user', userController.addUser);

app.listen(3000, () => {
    console.log('Serveur en écoute sur le port 3000');
});