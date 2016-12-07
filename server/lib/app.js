'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _ws = require('ws');

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _api = require('./api');

var _tasks = require('./tasks');

var _settings = require('./settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Configuration
var http = require('http');

var wsOptions = { port: _settings.settings.websocketPort };

var app = (0, _express2.default)();
var server = http.createServer();
var wss = new _ws.Server({ server: server });

// @TODO Move this to the front end, have it deliver the api token
var gitlabApiToken = process.env.GITLAB_API_TOKEN;

var eventEmitter = new _events2.default();

app.use(_express2.default.static('../client/build'));

app.get('/projects', function (req, res) {
	(0, _api.getProjects)().then(function (projects) {
		return Promise.all(projects.body.map(function (project) {
			return (0, _api.getBuilds)(project.id).then(function (builds) {
				return Object.assign({}, project, { builds: builds.body[0] || [] });
			});
		}));
	}).then(function (projectsWithBuilds) {
		res.json(projectsWithBuilds);
	});
});

app.post('/webhook', function (req, res) {
	// Check: X-Gitlab-Event: Build Hook
	eventEmitter.emit(res.secret, res.body);
});

wss.on('connection', function connection(ws) {
	var hash = _crypto2.default.createHash('md5').update(gitlabApiToken).digest('hex');

	(0, _tasks.updateHooks)(hash);

	eventEmitter.on(hash, function (body) {
		// Push the builds and projectId to the front end
		ws.send(body);
	});

	// TODO: Replace this by some form of a hook to get rid of polling
	// Check for new projects every day
	var interval = setInterval(function () {
		return (0, _tasks.updateHooks)(hash);
	}, 24 * 60 * 60000);

	eventEmitter.on(hash + '-close', function () {
		clearInterval(interval);
	});

	// Test event emission
	eventEmitter.emit(hash, "{data: 'hello'}");
});

// Link app and server together
server.on('request', app);

server.listen(_settings.settings.appPort, '0.0.0.0', function () {
	console.log("Server started");
});

// app.listen(appPort, function () {
//   console.log(`Build monitor live on port ${appPort}!`)
// });