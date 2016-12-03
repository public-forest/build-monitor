
export const settings = {
	// Port configuration
	websocketPort: process.env.WS_PORT || 3000,
	appPort: process.env.PORT || 4000,

	// Gitlab settings
	gitlabApi: process.env.GITLAB_API || 'https://gitlab.com/api/v3',
	appUrl: process.env.APP_URL || '',
};

export default settings;
