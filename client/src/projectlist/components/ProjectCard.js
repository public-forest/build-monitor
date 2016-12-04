import React from 'react';
import moment from 'moment';

import { style } from './style';
import { images } from '../../config';

function formatDate(date) {
	const momentDate = moment(date);

	if (!momentDate.isValid()) {
		return null;
	}

	return 'finished ' + momentDate.fromNow();
}

function getDuration(from, until) {
	const momentFrom = moment(from);
	let momentUntil = moment(until);

	if (!momentFrom.isValid()) {
		return null;
	}

	if (!momentUntil.isValid()) {
		momentUntil = moment(); // Now
	}

	return 'ran for ' + moment.duration( momentUntil.diff(momentFrom) ).humanize();
}

export const ProjectCard = (props) => (
  <div style={Object.assign({}, style.card, style.status[props.status])}>
  	<h1 style={style.title}>{props.title}</h1>

  	<div style={style.content}>
	  	<div style={style.projectInfo}>
		  	<h3 style={style.path}>{props.path}</h3>
		  	<h2 style={style.buildStatus}>
		  		{props.status !== 'none' ? props.status : 'No builds available' }
		  	</h2>
		  	{
		  		props.user ?
		  			(<h3 style={style.user}><img src={images.user} style={style.userImage} />{props.user}</h3>)
		  			:
		  			null
		  	}
		  	
		  </div>
	  	{
	  		props.started_at ? 	
		  	(
				  <div style={style.buildInfo}>
			  		<img src={images.clock} style={style.clockImage}/>
				  	<div style={style.buildInfoDetails}>
					  	<span>{formatDate(props.finished_at)}</span>
					  	<span>{props.finished_at ? getDuration(props.started_at, props.finished_at) : null}</span>
				  	</div>
				  </div>
			  ) 
			  :
			  null
		  }
	  </div>
  </div>
);

export default ProjectCard;