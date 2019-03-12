const config = require('config');
const { fetchGet, getJSONorFail } = require('../utils/fetchHelpers');
const { toNiceDate } = require('../utils/formatters');
const getContext = require('../utils/context')
	.seed(__filename);

const fetchLatestComic = async (req) => {
	const _C = getContext('fetchLatestComic', req);
	let response = await fetchGet(config.xkcd.host, { context: _C });
	if (!response) {
		return response;
	}

	logger.info(_C + `completed request to [host ${config.xkcd.host}][response ${response.ok}]`);
	let results = await getJSONorFail(_C, response);
	if (!response.ok) {
		logger.warn(_C + `failed request: [results ${results}]`);
	}

	logger.verbose(_C + 'raw response:', response);

	return results;
};

const getComicAsHtml = (comic) =>
	`<!-- xckd comic number #${comic.num} -->
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

module.exports = {
	fetchLatestComic,
	getComicAsHtml
};
