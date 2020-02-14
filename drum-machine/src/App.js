import React, { Component } from 'react';
import './App.css';

const Logo = (props) => {
  return (
    <div className="logo">
      <div className="inner-logo ">{'FCC (CPS)' + String.fromCharCode(160)}</div>
      <i className="inner-logo fa fa-free-code-camp" />
    </div>
  );
};

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
        
        <Logo />

        <div className="controls-container">
          CONTROL CONTAINER
        </div>

      </div>
    )
  }
}

export default App;
