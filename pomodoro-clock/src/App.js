import React, { Component } from 'react';
import './App.css';

const DEFAULT_TIME = 5;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: DEFAULT_TIME,
      timerType: 'Session',
      timerState: 'stopped',
      timer: ''
    };
    this.startStopTimer = this.startStopTimer.bind(this);
    this.displayTimer = this.displayTimer.bind(this);
    this.buzzer = this.buzzer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.decrementTimer = this.decrementTimer.bind(this);
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

  control (time) {
    this.buzzer(time);
    time === 0 && clearInterval(this.state.timer);
  }

  decrementTimer () {
    this.setState({
      time: this.state.time - 1
    });
  }

  resetTimer() {
    this.setState({
      timerState: 'stopped',
      timerType: 'Session',
      time: DEFAULT_TIME
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
        <div className="timer">
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
