import React, { Component } from 'react';
import './App.css';

const clearStyle = { background: "#ac3939" };
const operatorStyle = { background: "#666666" };
const equalsStyle = {
  background: "#004466",
  position: "absolute",
  height: 130,
  bottom: 5
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVal: "0",
    }
  }

  render() {
    return (
      <div>
        <div className="calculator">
          <Output currentValue={this.state.currentVal} />
          <Buttons />
        </div>
      </div>
    );
  }
}

class Buttons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonList: [
        {
          key: 'clear',
          value: 'AC',
          style: clearStyle,
          action: this.props.initialize,
          className: 'jumbo'
        },
        {
          key: 'divide',
          value: '/',
          style: operatorStyle,
          action: this.props.operators
        },
        {
          key: 'multiply',
          value: '*',
          style: operatorStyle,
          action: this.props.operators,
        },
        {
          key: 'seven',
          value: '7',
          action: this.props.numbers
        },
        {
          key: 'eight',
          value: '8',
          action: this.props.numbers
        },
        {
          key: 'nine',
          value: '9',
          action: this.props.numbers
        },
        {
          key: 'subtract',
          value: '-',
          style: operatorStyle,
          action: this.props.operators,
        },
        {
          key: 'four',
          value: '4',
          action: this.props.numbers
        },
        {
          key: 'five',
          value: '5',
          action: this.props.numbers
        },
        {
          key: 'six',
          value: '6',
          action: this.props.numbers
        },
        {
          key: 'add',
          value: '+',
          style: operatorStyle,
          action: this.props.operators,
        },
        {
          key: 'one',
          value: '1',
          action: this.props.numbers
        },
        {
          key: 'two',
          value: '2',
          action: this.props.numbers
        },
        {
          key: 'three',
          value: '3',
          action: this.props.numbers
        },
        {
          key: 'zero',
          value: '0',
          className: 'jumbo'
        },
        {
          key: 'decimal',
          value: '.',
        },
        {
          key: 'equals',
          value: '=',
          style: equalsStyle,
          action: this.props.operators,
        }
      ],
    }
  }
  render() {
    return (
      <div>
        {this.state.buttonList.map(element => {
          return (
            <button
              id={element.key}
              {...element}
              >{element.value}</button>
          )
        })}
      </div>
    );
  }
}

class Output extends Component {
  render() {
    return (
      <div className="outputScreen" id="display">
        {this.props.currentValue}
      </div>
    );
  }
}
export default App;