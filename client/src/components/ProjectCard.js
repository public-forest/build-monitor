import React from 'react';

import { style } from './style';
import userImage from '../assets/user.png';


export const ProjectCard = (props) => (
  <div style={Object.assign({}, style.card, style.status[props.status])}>
  	<h1 style={style.title}>{props.title}</h1>

  	<div style={style.content}>
	  	<div style={style.projectInfo}>
		  	<h3 style={style.path}>{props.path}</h3>
		  	<h2 style={style.status}>{!!props.finished_at ? 'finished' : props.status}</h2>
		  	<h3 style={style.user}><img src={userImage} style={style.userImage} />{props.user}</h3>
		  </div>
		  <div style={style.buildInfo}>
		  	{props.finished_at}
		  	{props.duration}
		  </div>
	  </div>
  </div>
);

export default ProjectCard;