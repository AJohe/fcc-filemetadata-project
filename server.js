'use strict';

var express = require('express');
var cors = require('cors');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var bodyParser = require('body-parser');

// require and use "multer"...

var app = express();

// body parser middleware
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

// use /api/fileanalyse path

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  console.log(req.body, 'body');
  console.log(req.file, 'file');
  res.json({
    fieldname: req.file.fieldname,
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  })
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
