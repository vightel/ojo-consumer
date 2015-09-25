
/**
 * Module dependencies.
 */

var express = require('express')
	, methodOverride 	= require('method-override')
	, partials 			= require('express-partials')
	, bodyParser 		= require('body-parser')
	, errorHandler 		= require('errorhandler')
	, favicon			= require('serve-favicon')
	, facebook			= require('./lib/facebook')
    , assert			= require('assert')
	, routes 			= require('./routes');

global.app = module.exports = express();

// Configuration

//app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(methodOverride())

	app.use(favicon(__dirname + '/public/favicon.png'));	

	//app.use(bodyParser());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	
	app.use(bodyParser.text());
	
	//app.use(express.compiler({ src : __dirname + '/public', enable: ['less']}));
	//app.use(app.router);
	app.use(express.static(__dirname + '/public'));
	app.use(partials());
	
//});

//app.configure('development', function(){
//  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
//});

//app.configure('production', function(){
//  app.use(express.errorHandler());
//});

	app.use(errorHandler({ dumpExceptions: true, showStack: true }));

// Compatible

// Now less files with @import 'whatever.less' will work(https://github.com/senchalabs/connect/pull/174)
var TWITTER_BOOTSTRAP_PATH = './vendor/twitter/bootstrap/less';
//express.compiler.compilers.less.compile = function(str, fn){
//  try {
//    var less = require('less');var parser = new less.Parser({paths: [TWITTER_BOOTSTRAP_PATH]});
//    parser.parse(str, function(err, root){fn(err, root.toCSS());});
//  } catch (err) {fn(err);}
//}

// Routes

app.get('/', 				routes.index);
app.get('/fires', 			routes.fires);
app.get('/floods', 			routes.floods);
app.get('/landslides', 		routes.landslides);
app.get('/precipitation', 	routes.precipitation);
app.get('/quakes', 			routes.quakes);
app.get('/opensearch', 		routes.opensearch);

assert( process.env.FACEBOOK_APP_ID )
assert( process.env.FACEBOOK_APP_SECRET )
assert( process.env.PUBLISHER_URL )
assert( process.env.CONSUMER_EMAIL )
assert( process.env.MAPBOX_PUBLIC_TOKEN )
assert( process.env.MAPID )

// env
var appId			= process.env.FACEBOOK_APP_ID
var appSecret		= process.env.FACEBOOK_APP_SECRET
app.publisher_url	= process.env.PUBLISHER_URL
app.consumer_email	= process.env.CONSUMER_EMAIL

console.log("Will connect to", app.publisher_url, "as", app.consumer_email)

app.facebook	= facebook.init(appId, appSecret)

app.facebook.GenerateSecret(function(err, secret) {
	console.log("Application Hawk Key:", err,secret)
	app.hawk_secret = secret
	app.hawk_id 	= appId
})		

var server = app.listen(3000, function(){
    var host = server.address().address;
    var port = server.address().port;
	console.log("Consumer listening on port", host, port);
});
