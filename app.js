
/**
 * Module dependencies.
 */
var connect=require('connect');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');



var formidable = require('formidable');
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  ,fs = require('fs')
    ,unzip=require('unzip');
var exec = require('child_process').exec;

var multer=require('multer');

var app = express();

// all environments

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.bodyParser());
//app.use(express.methodOverride());
app.use(bodyParser.urlencoded({extended: false}));
//app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

var fpath;

var storage = multer.diskStorage({
  destination: function (request, file, callback) {
    console.log(__dirname+'/uploads/');
    callback(null, './uploads/');
  },
  filename: function (request, file, callback) {
    console.log(file);
    fpath="..\\"+file.originalname.substring(0, file.originalname.lastIndexOf('.'))+'.png';
    console.log(fpath);


    //fs.createReadStream('./uploads/'+file).pipe(unzip.Extract({ path: './input/'+file.originalname.substring(0, file.originalname.lastIndexOf('.')) }));
    exec('unzip ./uploads/'+file.originalname+' -d ./input/'+file.originalname.substring(0, file.originalname.lastIndexOf('.')),function (error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);

      }
    });


    console.log("after unzipping");
    exec('java -jar "'+__dirname+ '\\classTenant1\\UMLParser.jar" "'+__dirname+'\\input\\'+file.originalname.substring(0, file.originalname.lastIndexOf('.'))+'" "'+__dirname+'\\output\\tenant1"', function (error, stdout, stderr) {
      if (stdout !== null) {
        console.log("stdout -> " + stdout);
      }
      //fs.readFile(__dirname+'\\uploads\\example.png',"binary",function (error,file) {


    });


console.log("path.extname(file)"+path.extname(file.originalname));

    // callback(null, file.originalname)
    callback(null, file.originalname+path.extname(file));
  }
});

//var upload = multer({storage: storage});

// var upload = multer({ dest: './uploads/'});
// app.use(multer({ dest: './uploads/'}));
// development only
if ('development' == app.get('env')) {
  //app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);


var upload = multer(
{ storage: storage }
);





app.post('/fileUpload', upload.single('file'), function(req, res){
  console.log(req.body);
  console.log(req.file);


  console.log('./uploads/');
  //console.log(req.files); // form files
  response = {"statusCode":204,"data":fpath};
  console.log('inside 204');
  setTimeout(function(){
    res.send((response));
  },10000);

  //res.status(204).end();
});



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
