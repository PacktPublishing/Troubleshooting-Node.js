const fetch = require('node-fetch');
const logFetch = require('./logHelpers').logFetch;

const getJSONorFail = async (_C, response) => {
	let results;
	try {
		results = await response.json();
	} catch (e) {
		logger.warn(_C + `failed to parse response: [response ok ${response.ok}][status ${response.status}]`);
	}

	return results;
};

const fetchGet = async (host, options = {}) => {
	let {context = '', query = ''} = options;
	logFetch(context, host, query);
	let response;
	try {
		response = await fetch(host + query, {
			method: 'GET'
		});
	} catch (error) {
		logger.error(context + `request failure: [response ok ${response.ok}][status ${response.status}]`);
		response = null;
	}

	return response;
};

module.exports = {
	fetchGet,
	getJSONorFail
};
