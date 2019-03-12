const logFetch = (context, host, query) => {
	logger.info(context + `connecting to [host ${host}]`);
	if (query) {
		logger.silly(context + `sending to [query ${query}]`);
	}
};

module.exports = {
	logFetch
};
