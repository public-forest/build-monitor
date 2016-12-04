'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createHook = exports.getHooks = exports.getBuilds = exports.getProjects = undefined;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _promisifyNode = require('promisify-node');

var _promisifyNode2 = _interopRequireDefault(_promisifyNode);

var _settings = require('./settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = (0, _promisifyNode2.default)(_request2.default);
var gitlabApiToken = process.env.GITLAB_API_TOKEN;

var gitlabRequest = function gitlabRequest(url) {
	var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GET';
	var body = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

	return request({
		method: method,
		json: true,
		body: body,
		url: url,
		headers: {
			'PRIVATE-TOKEN': gitlabApiToken,
			"content-type": "application/json"
		}
	});
};

var getProjects = exports.getProjects = function getProjects() {
	return gitlabRequest(_settings.settings.gitlabApi + '/projects');
};
var getBuilds = exports.getBuilds = function getBuilds(projectId) {
	return gitlabRequest(_settings.settings.gitlabApi + '/projects/' + projectId + '/builds');
};
var getHooks = exports.getHooks = function getHooks(projectId) {
	return gitlabRequest(_settings.settings.gitlabApi + '/projects/' + projectId + '/hooks');
};

var createHook = exports.createHook = function createHook(projectId, secret) {
	return gitlabRequest(_settings.settings.gitlabApi + '/projects/' + projectId + '/hooks', 'POST', {
		token: secret,
		id: projectId,
		url: _settings.settings.appUrl,
		build_events: true
	});
};

exports.default = {
	getProjects: getProjects,
	getHooks: getHooks,
	createHook: createHook
};