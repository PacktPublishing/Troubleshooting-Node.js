const toNiceDate = (month, day, year) => {
	let date = new Date(year, month - 1, day);

	return 'Date: ' + date.toLocaleDateString();
};

module.exports = {
	toNiceDate
};
