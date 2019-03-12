class Context {
	constructor(projectRoot) {
		this.projectRoot = projectRoot;
	}

	seed(filePath) {
		let path = Context.stripPathToProjectRoot(this.projectRoot, filePath);

		return function getContext(method, req) {
			method = method || '';
			return path + '#' + method + Context.getDataFromReq(req) + ' ';
		};
	}

	static stripPathToProjectRoot(projectRoot, filePath) {
		let rootIndex = filePath.indexOf(projectRoot);
		let stripIndex = rootIndex + projectRoot.length;

		return rootIndex === -1 ? filePath : filePath.slice(stripIndex);
	}

	static getDataFromReq(req) {
		return req ? ` [ip ${req.ip}]` : '';
	}
}

const INSTANCE = new Context('/var/www/section-1/1.5/burger-app');
module.exports = INSTANCE;
