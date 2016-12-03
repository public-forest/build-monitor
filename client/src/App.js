import React, { Component } from 'react';
import logo from './logo.svg';
// import './App.css';

import {ProjectList} from './components';
import projectsJson from './assets/projects.json';

class App extends Component {
  render() {
    return (
      <ProjectList
        projects={projectsJson.projects}
      />
    );
  }
}

export default App;
