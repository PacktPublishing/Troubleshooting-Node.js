let Express = require('express');
let config = require('config');
let morgan = require('morgan');
let winston = require('winston');
const fetch = require('node-fetch');

const packageJson = require('../../../package.json', {});

let silent = false;

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

const toNiceDate = (month, day, year) => {
	let date = new Date(year, month - 1, day);

	return 'Date: ' + date.toLocaleDateString();
};

let router = new Express.Router();

router.get('/', async (req, res) => {
	logger.verbose(`Request from browser[${req.headers['user-agent']}`);

	try {
		let response = await fetch(config.xkcd.host, {
			method: 'GET'
		});

		logger.info(`completed request to [host ${config.xkcd.host}][response ${response.ok}]`);
		let comic = await response.json();

		logger.verbose('raw response:', comic);
		let comicStr = `<!-- xckd comic number #${comic.num} -->
        <div>
            <h1>${comic.safe_title}</h1>
            <h2>${toNiceDate(comic.month, comic.day, comic.year)}</h2>
            <img
                style="max-width: 25%"
                src="${comic.img}"
                alt="${comic.safe_title}"
                title="${comic.alt}"
            />
            <p>
                Permalink <a href="https://xkcd.com/${comic.num}/"> here</a>
            </p>
        </div>`;
		res.send(`<!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charSet="utf-8"/>
                <meta http-equiv="x-ua-compatible" content="ie=edge"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            </head>
        <body>
        ${comicStr}
        <!-- generated ${new Date().toISOString()} -->
        </body>
        </html>`);
	} catch (e) {
		logger.error('Error loading comic:', e);
		res.send(
			`<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charSet="utf-8"/>
		<meta http-equiv="x-ua-compatible" content="ie=edge"/>
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
	</head>
<body>
<h2>Error loading latest comic:</h2> ${e}
<!-- generated ${new Date().toISOString()} -->
</body>
</html>`
		);
	}
});

const app = new Express();

logger.debug('Installing Controllers');
app.use(router);

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
