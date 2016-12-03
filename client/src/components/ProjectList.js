import React from 'react';
import ProjectCard from './ProjectCard';
import backgroundImage from '../assets/wood-background.jpg'
import { style } from './style';

export const ProjectList = (props) => (
  <div style={style.container}>
    {
      props.projects.map((project, index) => (
        <ProjectCard 
          key={index}
          title={project.name}
          path={project.path_with_namespace}
          status={index % 2 === 0 ? 'pending' : 'success'}
          user={'Administrator'}
          duration={9000}
          finished_at={null}
        />
      ))
    }
  </div>
);

export default ProjectList;