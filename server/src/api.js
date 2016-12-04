import originalRequest from 'request';
import promisify from 'promisify-node';
import { settings } from './settings';
const request = promisify(originalRequest);
const gitlabApiToken = process.env.GITLAB_API_TOKEN;

const gitlabRequest = (url, method = 'GET', body = null) => {
	return request({
		method,
		json: true,
		body: body,
		url, 
		headers: {
			'PRIVATE-TOKEN': gitlabApiToken,
      "content-type": "application/json",
		}
	});
}

export const getProjects = () => gitlabRequest(`${settings.gitlabApi}/projects`);
export const getBuilds = (projectId) => gitlabRequest(`${settings.gitlabApi}/projects/${projectId}/builds`);
export const getHooks = (projectId) => gitlabRequest(`${settings.gitlabApi}/projects/${projectId}/hooks`);

export const createHook = (projectId, secret) => {
	return gitlabRequest(`${settings.gitlabApi}/projects/${projectId}/hooks`, 'POST', {
		token: secret,
		id: projectId,
		url: settings.appUrl,
		build_events: true,
	})
};

export default {
	getProjects,
	getHooks,
	createHook,
}