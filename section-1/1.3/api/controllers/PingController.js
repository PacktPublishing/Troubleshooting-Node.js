const packageJson = require(`${process.cwd()}/package.json`, {});
let express = require('express');

let router = express.Router();

router.get('/ping', (req, res) => {
	res.json({
		name: packageJson.name,
		description: packageJson.description,
		version: packageJson.version,
		env: process.env.NODE_ENV
	});
});

module.exports = router;
