import React, { Component } from 'react';
import './App.css';

const DEFAULT_TIME = 1500;

class TimerLengthControl extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="length-control">
        <div id={this.props.titleID}>
          {this.props.title}
        </div>
        <button id={this.props.reduceID}
          className="btn-level"
          onClick={this.props.reduce} > 
          <i className="fa fa-arrow-down fa-2x"/>
        </button>
        <div id={this.props.lengthID} className="btn-level">
          {this.props.length}
        </div>
        <button id={this.props.addID}
          className="btn-level"
          onClick={this.props.add} >
          <i className="fa fa-arrow-up fa-2x"/>
        </button>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: DEFAULT_TIME,
      breakLength: 5,
      sessionLength: 25,
      timerType: 'Session',
      timerState: 'stopped',
      timer: ''
    };
    this.buzzer = this.buzzer.bind(this);
    this.warning = this.warning.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.displayTimer = this.displayTimer.bind(this);
    this.decrementTimer = this.decrementTimer.bind(this);
    this.startStopTimer = this.startStopTimer.bind(this);
    this.addLength = this.addLength.bind(this);
    this.reduceLength = this.reduceLength.bind(this);
  }

  addLength(type) {
    this.setState({
      [type]: this.state[type] + 1
    });
  }

  reduceLength(type) {
    if (this.state[type] === 1) return;
    this.setState({
      [type]: this.state[type] - 1
    });
  }

  startStopTimer() {
    const currentTimerState = this.state.timerState === 'stopped';
    if (currentTimerState) {
      this.setState({
        timer: setInterval(() => {
          this.decrementTimer();
          this.control(this.state.time);
        }, 1000),
      })
    } else {
      clearInterval(this.state.timer);
    }
    this.setState({
      timerState: currentTimerState ? 'started' : 'stopped',
    });
  }

  control(time) {
    this.buzzer(time);
    this.warning(time);
    time === 0 && clearInterval(this.state.timer);
  }

  decrementTimer() {
    this.setState({
      time: this.state.time - 1
    });
  }

  warning(timer) {
    timer <= 60 ? 
    this.setState({alarmColor: {color: '#a50d0d'}}) : 
    this.setState({alarmColor: {color: 'white'}});
  }

  resetTimer() {
    this.setState({
      timerState: 'stopped',
      timerType: 'Session',
      time: DEFAULT_TIME,
      alarmColor: {color: 'white'}
    });
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  }

  displayTimer() {
    let minutes = Math.floor(this.state.time / 60);
    let seconds = this.state.time - minutes * 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return minutes + ':' + seconds;
  }

  buzzer(timer) {
    if (timer === 0) {
      this.audioBeep.play();
    }
  }

  render() {
    return (
      <div className="app">
        <TimerLengthControl
          title="Session Length"
          titleId="session-label"
          lengthID="session-length"
          length={this.state.sessionLength}
          addID="session-increment"
          reduceID="session-decrement"
          add={() => this.addLength("sessionLength")}
          reduce={() => this.reduceLength("sessionLength")}
        />
        <TimerLengthControl
          title="Break Length"
          titleId="break-label"
          lengthID="break-length"
          length={this.state.breakLength}
          addID="break-increment"
          reduceID="break-decrement"
          add={() => this.addLength("breakLength")}
          reduce={() => this.reduceLength("breakLength")}
        />
        <div className="timer" style={this.state.alarmColor}>
          <div className="timer-wrapper">
            <div id='timer-label'>
              {this.state.timerType}
            </div>
            <div id='time-left'>
              {this.displayTimer()}
            </div>
          </div>
        </div>
        <button id="start_stop" onClick={this.startStopTimer}>
          <i className="fa fa-play fa-2x"/>
          <i className="fa fa-pause fa-2x"/>
        </button>
        <button id="reset" onClick={this.resetTimer}>
          <i className="fa fa-refresh fa-2x"/>
        </button>
        <audio id="beep" preload="auto" 
          src="https://goo.gl/65cBl1"
          ref={(audio) => { this.audioBeep = audio; }} />
      </div>
    )
  }
}

export default App;
