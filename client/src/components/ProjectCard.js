import React from 'react';

const style = {
	card: {
		width: 400,
		height: 200,
		backgroundColor: 'yellow',
		margin: 10,
		color: 'white',
		padding: 10
	},

	status: {
		pending: {
			backgroundColor: 'orange'
		},
		success: {
			backgroundColor: 'green'
		},
		failure: {
			backgroundColor: 'red'
		},


	}
};

export const ProjectCard = (props) => (
  <div style={Object.assign({}, style.card, style.status[props.status])}>
  	<div>
	  	<h1>{props.title}</h1>
	  	<h3>{props.path}</h3>
	  	<h2>{!!props.finished_at ? 'finished' : props.status}</h2>
	  	<h3>{props.user}</h3>
	  </div>
	  <div>
	  	{props.finished_at}
	  	{props.duration}
	  </div>
  </div>
);

export default ProjectCard;