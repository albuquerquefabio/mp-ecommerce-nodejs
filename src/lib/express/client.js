const express = require('express');
const exphbs = require('express-handlebars');

exports.default = async (app) => {
  try {
    app.engine('handlebars', exphbs());
    app.set('view engine', 'handlebars');

    app.use(express.static('assets'));
    app.use('/assets', express.static(__dirname + '/../../../assets'));

    app.get('/', function (req, res) {
      res.render('home');
    });
    // app.get('/*', function (req, res) {
    //   res.render('home');
    // });

    app.get('/detail', function (req, res) {
      res.render('detail', req.query);
    });
  } catch (error) {
    console.log('Error Express Client ---\n', `${error}`);
  }
};
