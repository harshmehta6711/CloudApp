
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var formidable = require('formidable'),
    form = new formidable.IncomingForm();

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

// app.post('/', function (req, res) {
//   //var form = new formidable.IncomingForm();
//
//   form.parse(req);
//
//   form.on('fileBegin', function (name, file) {
//     file.path = __dirname + '/uploads/' + file.name;
//   });
//   form.on('file', function (name, file){
//     console.log('Uploaded ' + file.name);
//   });
//
//   res.sendFile(__dirname + '/index.html');
// });

// app.post('/upload', function(req, res, next) {
//   form.parse(req, function(err, fields, files) {
//     console.log("File received:\nName:"+files.pdf.name+"\ntype:"+files.pdf.type);
//   });

// app.post('/upload',function (req,res) {
//   console.log("Hi Harsh"+req.data);
//
// });



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
