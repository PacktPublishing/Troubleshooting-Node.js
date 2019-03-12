let path = require('path');
let favicon = require('serve-favicon');
let Express = require('express');

let pingController = require('./api/controllers/PingController');
let indexController = require('./api/controllers/IndexController');

let environment = process.env.NODE_ENV || 'development';
let config = {
	environment,
	isProduction: environment === 'production',
	host: process.env.HOST || 'localhost',
	port: process.env.PORT || 10040
};

const app = new Express();
app.use(favicon(path.join(__dirname, 'static', 'favicon.icon')));
app.use(Express.static(path.join(__dirname, 'static')));

// install controllers
app.use(pingController, indexController);

if (config.port) {
	app.listen(config.port, (err) => {
		if (err) {
			console.error(err);
		}

		console.info('==> Open http://%s:%s in a browser to view the app. production:',
			config.host,
			config.port,
			config.isProduction
		);
	});
} else {
	console.error('==> ERROR: No PORT environment variable specified, config:', config);
}
