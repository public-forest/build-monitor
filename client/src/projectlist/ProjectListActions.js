const LOAD = '@PROJECTLIST/LOAD';
const LOAD_SUCCESS = '@PROJECTLIST/LOAD_SUCCESS';
const LOAD_FAILURE = '@PROJECTLIST/LOAD_FAILURE';


const initialState = {
	projects: [],
}

export default function reducer ( state = initialState, action = {}) {
	switch(action.type) {
		case LOAD: 
			return {
				...state, 
				loading: true,
			};
		case LOAD_SUCCESS: 
			return {
				...state, 
				loading: false,
				loaded: true,
				projects: action.result,
			};
		case LOAD_FAILURE:
			return {
				...state, 
				loading: false,
				loaded: false,
				loadError: action.error,
			};
		default:
			return state;
	}
};

export function isLoaded(globalState) {
  return globalState.projectlist && globalState.projectlist.loaded;
}

export function loadProjects() {
	return {
		types: [LOAD, LOAD_SUCCESS, LOAD_FAILURE],
		promise: (client) => client.get('/projects')
	}
}