var Hawk		= require('hawk'),
	moment		= require('moment'),
	Request		= require('request')
;

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Open GeoSocial Consumer' })
};

exports.floods = function(req, res){
	var region = {
		"name":		"Central America",
		"bbox":     [-92.68, 6.17, -75.85, 19.08 ],
		"target":   [-84.14, 9.84],
		"min_zoom":  1,
		"max_zoom":  18,
		"zoom": 5
	}
	var appId			= process.env.FACEBOOK_APP_ID
	var appSecret		= process.env.FACEBOOK_APP_SECRET
	var mapbox_token	= process.env.MAPBOX_PUBLIC_TOKEN
	
	var product 		= 'flood_nowcast'
	var source			= 'gfms'
	
	res.render('generic', { title: 		'Flood Nowcast',
	 					region: 		region,
						map_id: 		process.env.MAPID,
						fbAppId: 	    app.hawk_id,
						fbAccessToken:  app.hawk_secret,
						mapbox_token: 	mapbox_token,
						user_email: 	process.env.CONSUMER_EMAIL,
						product: 		product,
						source: 		source
						})

};

exports.quakes = function(req, res){
	var region = {
		"name":		"Central America",
		"bbox":     [-92.68, 6.17, -75.85, 19.08 ],
		"target":   [-84.14, 9.84],
		"min_zoom":  1,
		"max_zoom":  18,
		"zoom": 5
	}
	var appId			= process.env.FACEBOOK_APP_ID
	var appSecret		= process.env.FACEBOOK_APP_SECRET
	var mapbox_token	= process.env.MAPBOX_PUBLIC_TOKEN
	
	var product 		= 'quakes'
	var source			= 'usgs'
	
	res.render('generic', { title: 		'Earthquakes',
	 					region: 		region,
						map_id: 		process.env.MAPID,
						fbAppId: 	    app.hawk_id,
						fbAccessToken:  app.hawk_secret,
						mapbox_token: 	mapbox_token,
						user_email: 	process.env.CONSUMER_EMAIL,
						product: 		product,
						source: 		source
						})
};


exports.landslides = function(req, res){
	var region = {
		"name":		"Central America",
		"bbox":     [-92.68, 6.17, -75.85, 19.08 ],
		"target":   [-84.14, 9.84],
		"min_zoom":  1,
		"max_zoom":  18,
		"zoom": 5
	}
	var appId			= process.env.FACEBOOK_APP_ID
	var appSecret		= process.env.FACEBOOK_APP_SECRET
	var mapbox_token	= process.env.MAPBOX_PUBLIC_TOKEN
	
	var product 		= 'landslide_nowcast'
	var source			= 'landslide_model'
	
	res.render('generic', { title: 		'Landslide Nowcast',
	 					region: 		region,
						map_id: 		process.env.MAPID,
						fbAppId: 	    app.hawk_id,
						fbAccessToken:  app.hawk_secret,
						mapbox_token: 	mapbox_token,
						user_email: 	process.env.CONSUMER_EMAIL,
						product: 		product,
						source: 		source
						})
};

exports.precipitation = function(req, res){
	var region = {
		"name":		"Central America",
		"bbox":     [-92.68, 6.17, -75.85, 19.08 ],
		"target":   [-84.14, 9.84],
		"min_zoom":  1,
		"max_zoom":  18,
		"zoom": 5
	}
	var appId			= process.env.FACEBOOK_APP_ID
	var appSecret		= process.env.FACEBOOK_APP_SECRET
	var mapbox_token	= process.env.MAPBOX_PUBLIC_TOKEN
	
	var product 		= 'precip_1d'
	var source			= 'gpm'
	
	res.render('generic', { title: 		'Daily Rainfall Accumulation',
	 					region: 		region,
						map_id: 		process.env.MAPID,
						fbAppId: 	    app.hawk_id,
						fbAccessToken:  app.hawk_secret,
						mapbox_token: 	mapbox_token,
						user_email: 	process.env.CONSUMER_EMAIL,
						product: 		product,
						source: 		source
						})
};

exports.fires = function(req, res){
	var region = {
		"name":		"Central America",
		"bbox":     [-92.68, 6.17, -75.85, 19.08 ],
		"target":   [-84.14, 9.84],
		"min_zoom":  1,
		"max_zoom":  18,
		"zoom": 5
	}
	var appId			= process.env.FACEBOOK_APP_ID
	var appSecret		= process.env.FACEBOOK_APP_SECRET
	var mapbox_token	= process.env.MAPBOX_PUBLIC_TOKEN
	
	var product 		= 'active_fires'
	var source			= 'modis'
	
	res.render('generic', { title: 		'Active Fires',
	 					region: 		region,
						map_id: 		process.env.MAPID,
						fbAppId: 	    app.hawk_id,
						fbAccessToken:  app.hawk_secret,
						mapbox_token: 	mapbox_token,
						user_email: 	process.env.CONSUMER_EMAIL,
						product: 		product,
						source: 		source
						})
};

exports.opensearch = function(req, res){
	
	var query 			= req.query['q']
	var itemsPerPage	= req.query['itemsPerPage'] || 10
	var startIndex		= req.query['startIndex'] || 1
	var startTime		= req.query['startTime'] ? moment(req.query['startTime']) : moment("1970-01-01")
	var endTime			= req.query['endTime'] ? moment(req.query['endTime']) : moment()
	var lat				= req.query['lat']
	var lon				= req.query['lon']
	var limit			= req.query['limit']
	var sources			= req.query['sources']

	var email 			= app.consumer_email

	// got the query from browser, send it to publishers
	var credentials = {
		id:  		app.hawk_id,
		key: 		app.hawk_secret,
		algorithm: 'sha256'
	}
	
	// Publisher Opensearch URL
	var url = app.publisher_url
	
	url += "?q="+query;
	url += "&lat="+lat;
	url += "&lon="+lon;
	url += "&startTime="+startTime.format("YYYY-MM-DD");
	url += "&endTime="+endTime.format("YYYY-MM-DD");
	url += "&limit="+limit;
	url += "&sources="+sources;
	
	console.log(url)
	
    var header = Hawk.client.header(url, 'GET', { credentials: credentials, ext: email });
    var options = {
        uri:  	url,
        method: 'GET',
        headers: {
            authorization: header.field
        }
    };
	
	Request(options, function(err, response, body){
		if( !err ) {
	        var isValid = Hawk.client.authenticate(response, credentials, header.artifacts, { payload: body });
			if( isValid ) {
				//console.log("Hawk body:"+body)
				try{
					var json = JSON.parse(body)
					res.send(json)
				} catch(e) {
					console.log("parse err", e)
					res.sendStatus(500)
				}
			} else {
				console.log("Invalid Hawk return")
		        console.log(response.statusCode + ': ' + body + (isValid ? ' (valid)' : ' (invalid)'));
				res.sendStatus(500);
			}
		} else {
			console.log("Request error", err)
			res.sendStatus(500);
		}
	})
};