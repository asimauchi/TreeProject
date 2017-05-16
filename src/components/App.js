import React, { Component } from 'react';
import SkillTree from './SkillTree';
import logo from '../assets/logo.svg';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
    <div>
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>SkillTree Editor</h2>
        </div>
      </div>
      <div>
        <SkillTree />
      </div>
    </div>
    );
  }
}

export default App;
