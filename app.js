var ejs = require('ejs');
    ejs.open = '[%';
    ejs.close = '%]';
var express = require('express');
var mongoose = require('mongoose');
var util = require('util');
var url = require('url');
var app = express();


// app configuration
app.engine('html', require('ejs').__express);
app.set('views', __dirname + '/templates');
app.set('view engine', 'html');
app.use('/static', express.static(__dirname + '/public'));
app.use(express.logger());
app.use(express.bodyParser());


// routes

// Главная страница сайта
app.get('/', function(req, res) {
    res.redirect('/training'); // переход на стр. тренировок
});

// Страница тренировок
app.get('/training', function(req, res) {
    res.render('training', {
        title: "Тренировка"
    });
});

// Вместо 404
app.get('*', function(req, res){
    res.redirect('/training'); // переход на стр. тренировок
});


// такое...
app.listen(3000);
console.log('check 127.0.0.1:3000 out');