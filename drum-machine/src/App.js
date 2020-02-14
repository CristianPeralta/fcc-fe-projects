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

const Control = (props) => {
  return (
    <div className="control">
      <p>{props.name}</p>
      <div onClick={props.changeControlStatus} className="select">
        <div style={props.slider} className="inner" />
      </div>
    </div>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      power: true,
      currentPadBankGroup: 'Heater Kit'
    }
    this.powerControl = this.powerControl.bind(this);
    this.bankGroupControl = this.bankGroupControl.bind(this);
  }

  powerControl() {
    this.setState({
      power: !this.state.power
    });
  }

  bankGroupControl() {
    let defaultGroup = 'Heater Kit';
    this.setState({
      currentPadBankGroup: this.state.currentPadBankGroup === defaultGroup ? 'Smooth Piano Kit' : defaultGroup
    });
  }
  render() {
    const powerSlider = this.state.power ? ({ float: 'right' }) :  ({ float: 'left' });
    const bankSlider = this.state.currentPadBankGroup === 'Heater Kit' ? ({ float: 'left' }) :  ({ float: 'right' });;
    return (
      <div id="drum-machine" className="inner-container">

        <div className="pad-bank">
          PAD BANK
        </div>
        
        <Logo />

        <div className="controls-container">
          CONTROL CONTAINER
          <Control name="POWER" slider={powerSlider} changeControlStatus={this.powerControl}/>
          <Control name="BANK" slider={bankSlider} changeControlStatus={this.bankGroupControl} />
        </div>

      </div>
    )
  }
}

export default App;
