export const style = {
	card: {
    width: '29%',
		height: 150,
		backgroundColor: '#808080',
		margin: 10,
		color: 'white',
		padding: 20,
		boxShadow: '0px 0px 6px 7px rgba(0,0,0,0.75)',
	},

	content: {
		display: 'flex',
		flexDirection: 'row',
	},

	projectInfo: {
		flex: 0.75,
	},

	clockImage: {
		height: 22,
		marginRight: 5,
	},

	buildInfo: {
		flex: 0.35,
		marginTop: '15px',
		display: 'flex',
		flexDirection: 'row',
	},

	buildInfoDetails: {
		display: 'flex',
		flexDirection: 'column',
		fontSize: 10
	},

	buildStatus: {
		margin: 0,
	},

	status: {
		//running, failed, success, canceled, skipped
		none: {
		},
		canceled: {
		},
		skipped: {
		},
		stopped: {
		},
		created: {
			backgroundColor: '#E96E52'
		},
		pending: {
			backgroundColor: '#E96E52'
		},
		running: {
			backgroundColor: '#0000ff'
		},
		success: {
			backgroundColor: '#008000'
		},
		failed: {
			backgroundColor: '#ff0000'
		},
	},

	title: {
		margin: 0,
		fontWeight: 'normal',
		fontSize: 30,
	},

	path: {
		fontSize: 15,
		fontWeight: 'normal',
	},

	user: {
		margin: 0,
		marginTop: 15,
		fontSize: 17,
		fontWeight: 'normal',
		display: 'flex',
		alignItems: 'center',
	},

	userImage: {
		marginRight: 10,
		height: 22,
		alignSelf: 'center',
	}
};

export default style;