import React, { Component } from 'react';
import data from '../src/resources/data';
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

const pad = {
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'Heater-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
};

const inactiveStyle = {
  backgroundColor: 'grey',
  marginTop: 10,
  boxShadow: "3px 3px 5px black"
};

class DrumPad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      padStyle: inactiveStyle,
    }
    this.playSound = this.playSound.bind(this);
  }

  playSound(keyTrigger) {
    const sound = document.getElementById(keyTrigger);
    sound.currentTime = 0;
    sound.play();
  }
  render() {
    return (
      <div id={this.props.padId}
        className="drum-pad"
        onClick={() => this.playSound(this.props.keyTrigger)}
        style={this.state.padStyle} >
          <audio className='clip' id={this.props.keyTrigger} src={this.props.url}></audio>
          {this.props.keyTrigger}
      </div>
    );
  };
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      power: true,
      currentPadBankGroup: 'Heater Kit',
      display: String.fromCharCode(160)
    }
    this.powerControl = this.powerControl.bind(this);
    this.bankGroupControl = this.bankGroupControl.bind(this);
  }

  powerControl() {
    this.setState({
      power: !this.state.power,
      display: String.fromCharCode(160)
    });
  }

  bankGroupControl() {
    if (!this.state.power) return;
    let defaultGroup = 'Heater Kit';
    const name = this.state.currentPadBankGroup === defaultGroup ? 'Smooth Piano Kit' : defaultGroup;
    this.setState({
      currentPadBankGroup: name,
      display: name,
    });
  }

  render() {
    const powerSlider = this.state.power ? ({ float: 'right' }) :  ({ float: 'left' });
    const bankSlider = this.state.currentPadBankGroup === 'Heater Kit' ? ({ float: 'left' }) :  ({ float: 'right' });;
    return (
      <div id="drum-machine" className="inner-container">

        <div className="pad-bank">
          PAD BANK
          <div className="pad-bank" >
            {(
              <DrumPad padId={pad.id} keyTrigger={pad.keyTrigger} url={pad.url} />
            )}
          </div>
        </div>

        <Logo />

        <div className="controls-container">
          <Control name="POWER" slider={powerSlider} changeControlStatus={this.powerControl} />
          <p id="display">
						{this.state.display}
					</p>
          <Control name="BANK" slider={bankSlider} changeControlStatus={this.bankGroupControl} />
        </div>

      </div>
    )
  }
}

export default App;
