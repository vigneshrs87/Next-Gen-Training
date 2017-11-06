var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var projects = require('../routes/projects');
var content = require('../routes/content');
var login = require('../routes/login');
var admin = require('../routes/admin');
var launch = require('../routes/launch');
var app = express();
const getPort = require('get-port');
var multer = require('multer');
var fs = require('fs');
var http = require('http');

var availablePort = 0;
var tmpUploadPath;

getPort().then(port => {
  availablePort = port;
  app.listen(availablePort);
  console.log(availablePort);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/login', login);
app.use('/api/projects', projects);
app.use('/api/content', content);
app.use('/api/admin', admin);
app.use('/api/launch', launch);

// Check file code start

app.get('/api/checkfile/:prjid/:filename', function (req, res) {
  if (fs.existsSync('./src/uploads/' + req.params.prjid+ '/' + req.params.filename)) {
      res.json('fileexists');
    }else{
      res.json('doesnotexist');
    }
})

// Check file code end

// File upload code start

app.use(express.static(path.join(__dirname, './src/uploads')));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    tmpUploadPath = './src/uploads/' + req.params.prjid;
    if (fs.existsSync(tmpUploadPath)) {
      callback(null, tmpUploadPath);
    } else {
      fs.mkdirSync(tmpUploadPath);
      callback(null, tmpUploadPath);
    }
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});

var upload = multer({
  storage: storage
});

app.post('/api/upload/:prjid', upload.array("uploads[]", 12), function (req, res) {
  res.send(req.files);
});

// File upload code end

// File delete code start

app.delete('/api/delete/:prjid/:filename', function (req, res) {
  fs.unlink('src/uploads/' + req.params.prjid + '/' +req.params.filename, function (err) {
    if(err){
      res.json(err);
    }else{
      res.json('file deleted');
    }
  })
})

// File delete code end

// File read code start

app.get('/api/readimage/:prjid/:filename', function (req, res) {
  fs.readFile('src/uploads/' + req.params.prjid + '/' + req.params.filename, function (err, data) {
    err => {
      res.json(err);
    }
    res.writeHead(200, {
      'Content-Type': 'image/jpeg'
    })
    res.end(data);
  })
})
// catch 404 and forward to error handler

/* app.all('/*', function (req, res, next) {
  // Just send the index.html for other files to support HTML5Mode
  res.redirect('/projects')

});*/
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  /*res.render('error', {
    message: err.message,
    error: {}
  });*/
  console.log(err.message);
});


module.exports = app;
