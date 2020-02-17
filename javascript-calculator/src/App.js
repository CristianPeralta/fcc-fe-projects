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
  }

  render() {
    return (
      <div>
        <div className="calculator">
          <p style={{ color: 'white' }}>CALCULATOR</p>
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
          class: 'jumbo'
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
          class: 'jumbo'
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
        {this.state.buttonList.map(el => {
          return (
            <button 
              key={el.key}
              id={el.key}
              className={el.class}
              style={el.style}
              value={el.value}
              >{el.value}</button>
          )
        })}
      </div>
    );
  }
}

export default App;
