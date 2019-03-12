let winston = require('winston');
let config = require('config');

let silent = false;

/** standard npm logging levels
{
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
  silly: 5
}
*/

/* istanbul ignore else  */
if (config.environment === 'test') {
	silent = true;
}

let log = winston.createLogger({
	level: config.log.level,
	format: winston.format.json(),
	transports: [
		new winston.transports.Console({
			silent,
			format: winston.format.simple()
		})
	]
});

log.info(`Current log level is [${config.log.level.toUpperCase()}]`);
global.logger = log;
