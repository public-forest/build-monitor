import express from 'express';
import EventEmitter from 'events';
import { Server as WebSocketServer } from 'ws';
import crypto from 'crypto';

import { getProjects } from './api';
import { updateHooks } from './tasks';
import { settings } from './settings';

// Configuration
const http = require('http');

const wsOptions = { port: settings.websocketPort };

const app = express();
const wss = new WebSocketServer(wsOptions);

// @TODO Move this to the front end, have it deliver the api token
const gitlabApiToken = process.env.GITLAB_API_TOKEN;

const eventEmitter = new EventEmitter();

app.use(express.static('../client/build'));

app.get('/projects', function(req, res){
	getProjects().then((projects) => {
		res.json(projects.body);
	});
});

app.post('/webhook', function (req, res) {
	// Check: X-Gitlab-Event: Build Hook
  eventEmitter.emit(res.secret, res.body);
});

wss.on('connection', function connection(ws) {
	const hash = crypto.createHash('md5').update(gitlabApiToken).digest('hex');
	
	updateHooks(hash);

	eventEmitter.on(hash, (body) => {
		const { build_name, build_stage, build_started_at, build_duration, project_id, commit, user } = body;
		// Push the builds and projectId to the front end
		ws.send({
			build_name, 
			build_stage, 
			build_started_at, 
			build_duration, 
			project_id,
			commit,
			user,
		})
	});
});

http.createServer(app).listen(settings.appPort, '0.0.0.0', function() {
	console.log("Server started");
});

// app.listen(appPort, function () {
//   console.log(`Build monitor live on port ${appPort}!`)
// });