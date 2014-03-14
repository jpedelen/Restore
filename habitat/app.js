
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();
var mongojs = require('mongojs');
var db = mongojs('deviowa.com/donors', ['donors']);


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/donors', function(req, res){
	db.donors.find(function(err, donors){
		res.render('donors', { donors: donors });

	})

});

app.post('/save_form', function(req, res){

	db.donors.save(req.body, function(err, donor){
		res.render('receipt', { donors: [donor] });
	})

})

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
