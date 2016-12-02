var express = require('express');
    routes = require('./app/routes/index.js');
    mongoose = require('mongoose');

var app = express();
app.set('port', (process.env.PORT || 8080));

mongoose.connect('mongodb://localhost:27017/clementinejs');

app.use('/public', express.static(process.cwd() + '/public'));
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));

routes(app);

app.listen(app.get('port'), function() {
  console.log('Clementine app listening on port ' + app.get('port'));
})
