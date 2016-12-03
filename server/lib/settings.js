'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var settings = exports.settings = {
	// Port configuration
	websocketPort: process.env.WS_PORT || 3000,
	appPort: process.env.PORT || 4000,

	// Gitlab settings
	gitlabApi: process.env.GITLAB_API || 'https://gitlab.com/api/v3',
	appUrl: process.env.APP_URL || ''
};

exports.default = settings;