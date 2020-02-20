import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 60
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
      <div>
        <h3>timer: {this.state.time}</h3>
        <button onClick={this.startTimer}>start</button>
        <button onClick={this.stopTimer}>stop</button>
        <button onClick={this.resetTimer}>reset</button>
      </div>
    )
  }
}

export default App;
