import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="drum-machine" className="inner-container">

        <div className="pad-bank">
          PAD BANK
        </div>
        
        <div className="logo">
          LOGO
        </div>

        <div className="controls-container">
          CONTROL CONTAINER
        </div>

      </div>
    )
  }
}

export default App;
