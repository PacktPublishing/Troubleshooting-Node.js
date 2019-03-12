let Express = require('express');
let config = require('config');
let morgan = require('morgan');

const packageJson = require('../../../package.json', {});

require('./api/utils/createLogger');
let indexController = require('./api/controllers/IndexController');

const app = new Express();

logger.debug('Installing Controllers');
app.use(indexController);

logger.debug('Installing Middleware');
app.use(morgan(config.environment === 'production' ? 'combined' : 'dev'));

if (config.port) {
	logger.info('Starting Listener');
	app.listen(config.port, (err) => {
		if (err) {
			logger.error('Failure in listener:', err);
		}

		logger.info(`${packageJson.name} started at [${new Date().toISOString()}] version [${packageJson.version}]`);
		logger.debug(`environment[${config.environment}]`);
		logger.debug(`is production[${config.environment === 'production'}]`);
		logger.verbose(`Open http://${config.host}:${config.port} in a browser to view the app.`);
	});
} else {
	logger.error('No PORT environment variable specified, config:', config);
}
