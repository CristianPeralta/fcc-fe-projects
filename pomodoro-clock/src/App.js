import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 1500,
      timerType: 'Session',
      timerState: 'stopped',
    };
    this.startStopTimer = this.startStopTimer.bind(this);
    this.displayTimer = this.displayTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  startStopTimer() {
    const currentTimerState = this.state.timerState === 'stopped';
    if (currentTimerState) {
      this.timer = setInterval(() => this.setState({
        time: this.state.time - 1
      }), 1000);
    } else {
      clearInterval(this.timer);
    }
    this.setState({
      timerState: currentTimerState ? 'started' : 'stopped',
    });
  }

  resetTimer() {
    this.setState({time: 1500})
  }

  displayTimer() {
    let minutes = Math.floor(this.state.time / 60);
    let seconds = this.state.time - minutes * 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return minutes + ':' + seconds;
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
      </div>
    )
  }
}

export default App;
