'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.updateHooks = exports.registerHooks = exports.findHookless = exports.fetchHooks = undefined;

var _api = require('./api');

var _settings = require('./settings');

// Get the hooks for each project
var fetchHooks = exports.fetchHooks = function fetchHooks(projects) {
	var body = projects.body;
	return Promise.all(body.map(function (project) {
		return (0, _api.getHooks)(project.id).then(function (hooks) {
			return { hooks: hooks.body, details: project };
		});
	}));
};

var findHookless = exports.findHookless = function findHookless(projects) {
	console.log(projects[0]);
	// Figure out which projects don't have the hook yet
	return projects.filter(function (project) {
		return !project.hooks || !project.hooks.some(function (item) {
			return item.url === _settings.settings.appUrl;
		});
	}).map(function (project) {
		return project.details.id;
	});
};

// Register hooks for the projects that don't have them yet
var registerHooks = exports.registerHooks = function registerHooks(secret) {
	return function (projects) {
		return Promise.all(projects.map(function (project) {
			return (0, _api.createHook)(project, secret);
		}));
	};
};

var updateHooks = exports.updateHooks = function updateHooks(secret) {
	return (0, _api.getProjects)().then(fetchHooks).then(findHookless).then(registerHooks(secret)).then(function (result) {
		return console.log(result.body);
	}).catch(function (error) {
		console.error(error);
	});
};

exports.default = {
	registerHooks: registerHooks,
	findHookless: findHookless,
	fetchHooks: fetchHooks,
	updateHooks: updateHooks
};