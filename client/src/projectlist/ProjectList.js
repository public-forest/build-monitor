import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dispatch } from 'redux';

import { ProjectCard } from './components';
import { style } from './style';

import * as ProjectListActions from './ProjectListActions';

class ProjectListContainer extends Component {

  constructor(props) {
    super(props);

    if(!this.props.loaded) {
      this.props.loadProjects();
    }
  }

  render(){ 
    return (
      <div style={style.container}>
        {
          this.props.projects
            .sort((a,b) => {
              if (a.last_activity_at > b.last_activity_at) {
                return -1;
              } 
              else if(a.last_activity_at < b.last_activity_at) {
                return 1;
              }
              return 0;
            })
            .map((project, index) => (
              <ProjectCard 
                key={index}
                title={project.name}
                path={project.path_with_namespace}
                status={project.builds ? project.builds.status : 'none'}
                user={project.builds && project.builds.user ? project.builds.user.name : null}
                started_at={project.builds ? project.builds.started_at : null}
                finished_at={project.builds ? project.builds.finished_at : null}
              />
            ))
        }
      </div>
    );
  }
} 

export const ProjectList = connect(state => state.projectlist, ProjectListActions)(ProjectListContainer); 
export default ProjectList;