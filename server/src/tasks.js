import { getHooks, getProjects, createHook, } from './api';
import { settings } from './settings';

// Get the hooks for each project
export const fetchHooks = function(projects) {
	const body = projects.body;
	return Promise.all(
		body.map((project) => {
			return getHooks(project.id).then((hooks) => { 
				return {hooks: hooks.body, details: project}
			})
		})
	);
}

export const findHookless = function(projects) {
	console.log(projects[0]);
	// Figure out which projects don't have the hook yet
	return projects.filter((project) => {
		return !project.hooks || !project.hooks.some((item) => item.url === settings.appUrl);
	}).map(function(project) {
		return project.details.id;
	})
}

// Register hooks for the projects that don't have them yet
export const registerHooks = function(secret) {
	return (projects) => {
		return Promise.all( 
			projects.map((project) => createHook(project, secret))
		);		
	}
}

export const updateHooks = function(secret) {
	return getProjects()
		.then(fetchHooks)
		.then(findHookless)
		.then(registerHooks(secret))
		.then((result) => console.log(result.body))
		.catch(function(error) {
			console.error(error);
		}); 
}

export default {
	registerHooks,
	findHookless,
	fetchHooks,
	updateHooks,
};