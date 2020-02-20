import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 60,
      timerType: 'Session',
    };
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
  }

  startTimer() {
    this.timer = setInterval(() => this.setState({
      time: this.state.time - 1
    }), 1000)
  }
  stopTimer() {
    clearInterval(this.timer)
  }
  resetTimer() {
    this.setState({time: 60})
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
              {this.state.time}
            </div>
          </div>
        </div>
        <button onClick={this.startTimer}>start</button>
        <button onClick={this.stopTimer}>stop</button>
        <button onClick={this.resetTimer}>reset</button>
      </div>
    )
  }
}

export default App;
