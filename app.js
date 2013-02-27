
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , send = require('./routes/send')
  , lines = require('./routes/lines')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

GLOBAL.linesInServer = [{
                    id:0,
                    sender:'Chat',
                    message:'Welcome to the chat.'
                 }];

app.get('/', function(req,res){
    res.redirect('/chat.html');
});
app.get('/lines', lines.list);
app.post('/send', send.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
