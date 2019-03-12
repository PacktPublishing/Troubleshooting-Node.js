const packageJson = require('../../../../package.json', {});
let express = require('express');

let router = express.Router();

router.get('/ping', (req, res) => {
	logger.info(`Ping from ip[${req.ip}`);
	logger.verbose(`Ping from browser[${req.headers['user-agent']}`);
	logger.silly('Request: ', req);
	res.json({
		name: packageJson.name,
		description: packageJson.description,
		version: packageJson.version,
		env: process.env.NODE_ENV
	});
});

module.exports = router;
