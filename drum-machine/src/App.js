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

class PadBank extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="pad-bank" >
        {(
          data.map((pad) => {
            return (
              <DrumPad power={this.props.power} padId={pad.id} keyTrigger={pad.keyTrigger} keyCode={pad.keyCode} url={pad.url} updateDisplay={this.props.updateDisplay} />
            )
          })
        )}
      </div>
    );
  };
}

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
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  playSound() {
    if (!this.props.power) return;
    const sound = document.getElementById(this.props.keyTrigger);
    sound.currentTime = 0;
    sound.play();
    this.props.updateDisplay(this.props.padId.replace(/-/g, ' '));
  }

  handleKeyPress(e) {
    if (e.keyCode === this.props.keyCode) {
      this.playSound();
    }
  }
  render() {
    return (
      <div id={this.props.padId}
        className="drum-pad"
        onClick={this.playSound}
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
      display: String.fromCharCode(160)
    }
    this.powerControl = this.powerControl.bind(this);
    this.displayClipName = this.displayClipName.bind(this);
  }

  powerControl() {
    this.setState({
      power: !this.state.power,
      display: String.fromCharCode(160)
    });
  }

  displayClipName(name) {
    if (this.state.power) {
      this.setState({
        display: name
      });
    }
  }

  render() {
    const powerSlider = this.state.power ? ({ float: 'right' }) :  ({ float: 'left' });
    return (
      <div id="drum-machine" className="inner-container">

        <PadBank updateDisplay={this.displayClipName} power={this.state.power}/>

        <Logo />

        <div className="controls-container">
          <Control name="POWER" slider={powerSlider} changeControlStatus={this.powerControl} />
          <p id="display">
						{this.state.display}
          </p>
        </div>

      </div>
    )
  }
}

export default App;