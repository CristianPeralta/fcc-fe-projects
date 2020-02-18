import React, { Component } from 'react';
import './App.css';


const isOperator = /[x/+‑]/;
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
      formula: ""
    };
    this.handleNumbers = this.handleNumbers.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.initialize = this.initialize.bind(this);
  }

  handleNumbers(e) {
    const { currentVal, formula } = this.state;
    const { value } = e.target;
    this.setState({
      currentVal: currentVal === "0" || isOperator.test(currentVal)
        ? value : currentVal + value,
      formula: currentVal === "0" && value === "0"
              ? formula === "" ? value : formula
              : /([^.0-9]0|^0)$/.test(formula)
                ? formula.slice(0, -1) + value
                : formula + value
    });
  }

  handleOperators(e) {
    const { formula } = this.state;
    const { value } = e.target;
    this.setState({
      currentVal: value,
      formula: formula + value
    });
  }

  initialize() {
    this.setState({
      currentVal: "0",
      formula: ""
    });
  }

  render() {
    return (
      <div>
        <div className="calculator">
          <Formula formula={this.state.formula.replace(/x/g, "⋅")} />
          <Output currentValue={this.state.currentVal} />
          <Buttons 
            numbers={this.handleNumbers}
            operators={this.handleOperators}
            initialize={this.initialize}
          />
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
          onClick: this.props.initialize,
          className: 'jumbo'
        },
        {
          key: 'divide',
          value: '/',
          style: operatorStyle,
          onClick: this.props.operators
        },
        {
          key: 'multiply',
          value: '*',
          style: operatorStyle,
          onClick: this.props.operators,
        },
        {
          key: 'seven',
          value: '7',
          onClick: this.props.numbers
        },
        {
          key: 'eight',
          value: '8',
          onClick: this.props.numbers
        },
        {
          key: 'nine',
          value: '9',
          onClick: this.props.numbers
        },
        {
          key: 'subtract',
          value: '-',
          style: operatorStyle,
          onClick: this.props.operators,
        },
        {
          key: 'four',
          value: '4',
          onClick: this.props.numbers
        },
        {
          key: 'five',
          value: '5',
          onClick: this.props.numbers
        },
        {
          key: 'six',
          value: '6',
          onClick: this.props.numbers
        },
        {
          key: 'add',
          value: '+',
          style: operatorStyle,
          onClick: this.props.operators,
        },
        {
          key: 'one',
          value: '1',
          onClick: this.props.numbers
        },
        {
          key: 'two',
          value: '2',
          onClick: this.props.numbers
        },
        {
          key: 'three',
          value: '3',
          onClick: this.props.numbers
        },
        {
          key: 'zero',
          value: '0',
          onClick: this.props.numbers,
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
          onClick: this.props.operators,
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

class Formula extends Component {
  render() {
    return <div className="formulaScreen">{this.props.formula}</div>;
  }
}

export default App;
