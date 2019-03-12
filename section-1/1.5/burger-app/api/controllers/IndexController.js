const express = require('express');
const { fetchLatestComic, getComicAsHtml } = require('../services/XkcdService');
const { renderHtml } = require('../view/render');
const getContext = require('../utils/context')
	.seed(__filename);

let router = new express.Router();

router.get('/', async (req, res) => {
	const _C = getContext('get', req);
	logger.verbose(_C + `Request from browser[${req.headers['user-agent']}`);

	try {
		let result = await fetchLatestComic(req);
		res.send(renderHtml(getComicAsHtml(result)));
	} catch (e) {
		logger.error(_C + 'Error loading comic:', e);
		res.send(renderHtml('<h2>Error loading latest comic:</h2>' + e));
	}
});

module.exports = router;
