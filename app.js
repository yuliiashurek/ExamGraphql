const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const examRoutes = require('./routes/exam.route');
const app = express();

mongoose.connect('mongodb+srv://yuliiashurek:5jVL69eSuujEhDR8@backenddb.r4n9n.mongodb.net/?retryWrites=true&w=majority&appName=BackendDb');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('style'));

app.use('/', examRoutes);

app.listen(3000, () => {
    console.log('Сервер працює на http://localhost:3000');
});