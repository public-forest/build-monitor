import backgroundImage from '../assets/wood-background.jpg'

export const style = {
  container: {
    // backgroundColor: 'white',
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: 'repeat',
    width: '100vw',
    height: '100vh',

    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

	card: {
		width: 450,
		height: 150,
		backgroundColor: '#008000',
		margin: 20,
		color: 'white',
		padding: 20,
		boxShadow: '0px 0px 15px 11px rgba(0,0,0,0.75)',
	},

	content: {
		display: 'flex',
		flexDirection: 'row',
	},

	projectInfo: {
		flex: 0.75,
	},

	buildInfo: {
		flex: 0.25,
	},

	status: {
		pending: {
			backgroundColor: 'orange'
		},
		inprogress: {
			backgroundColor: '#0000ff'
		},
		stopped: {
			backgroundColor: '#808080'
		},
		success: {
			backgroundColor: '#008000'
		},
		failure: {
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

	status: {
		margin: 0,

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
		filter: 'invert(1)',
		height: 22,
		alignSelf: 'center',
	}
};

export default style;