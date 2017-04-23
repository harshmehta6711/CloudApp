
/**
 * Module dependencies.
 */

var formidable = require('formidable');
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  ,fs = require('fs');
var exec = require('child_process').exec;



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

/*app.post('/upload',function (req,res) {
  console.log('inside server');
  console.log(req.data);
  var form = new formidable.IncomingForm();
  form.parse(req);
  form.on('fileBegin', function (name, file){
    file.path = __dirname + '/uploads/' + file.name;
  });
  form.on('file', function (name, file){
    console.log('Uploaded ' + file.name);
  });
  form.uploadDir = __dirname + '/tmp';
  form.encoding = 'binary';
  console.log(form);
  form.addListener('file', function(name, file) {
    // do something with uploaded file
  });

  form.addListener('end', function() {
    res.end();
  });

  form.parse(req, function(err, fields, files) {
    if (err) {
      console.log(err);
    }
  });

});*/

/*app.post('/upload', function(req, res){

  console.log('inside server');

  // create an incoming form object
  var form = new formidable.IncomingForm();
  console.log(req.params+"       "+form);
  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '/uploads');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('fileBegin', function (name, file){
    file.path = __dirname + '/uploads/' + file.name;
  });
  form.on('file', function (name, file){
    console.log('Uploaded ' + file.name);
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);

});*/

app.post('/upload', function(req, res){
  console.log('inside server');
  // create an incoming form object
  var form = new formidable.IncomingForm();
console.log(form);
  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;
console.log("1");

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '/uploads');
console.log("2"+form.uploadDir);
  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    console.log(file);
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  console.log("1111"+file.name);
    exec('java -jar "'+__dirname+ '\\sequence\\sequence-10.0.jar" --headless "'+__dirname+'\\uploads\\'+file.name+'"',
        function (error, stdout, stderr){
          if(stdout !== null) {
            console.log("stdout -> "+stdout);
            fs.readFile(__dirname+'\\uploads\\example.png',"binary",function (error,file) {
              if(error)
              {
                res.setHeader("Content-Type", "text/plain" );
                res.writeHead(500);
                res.write(error + "\n");
                res.end("error");
              }
              else
              {
                var img = fs.readFileSync(__dirname + "\\uploads\\example.png");
                //console.log('going inside'+img);
                //res.writeHead(200, {"Content-Type" : "image/png" });
                //res.write(img, "binary" );
                //res.end(img, "binary");
                res.end(__dirname + "\\uploads\\example.png");
              }
            });
          }
          if(stderr !== null) {
            console.log("stderr -> "+stderr.length+" "+stderr);
          }
          if(error !== null){
            console.log("Error -> "+error);
          }
        });
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    // res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);

});

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
