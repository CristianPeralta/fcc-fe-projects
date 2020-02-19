import React, { Component } from 'react';
import './App.css';


const isOperator = /[x/+‑]/;
const endsWithOperator = /[x+-/]$/;
const endsWithNegativeSign = /[x/+]-$/;
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
      prevVal: "0",
      formula: "",
      evaluated: false
    };
    this.handleNumbers = this.handleNumbers.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.handleEvaluate = this.handleEvaluate.bind(this);
    this.initialize = this.initialize.bind(this);
  }

  handleNumbers(e) {
    const { currentVal, formula, evaluated } = this.state;
    const { value } = e.target;
    if (evaluated) {
      this.setState({
        currentVal: value,
        formula: value !== "0" ? value : ""
      });
    } else {
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
  }

  handleOperators(e) {
    const { formula, prevVal, evaluated } = this.state;
    const { value } = e.target;
    this.setState({ currentVal: value, evaluated: false });

    if (evaluated) {
      this.setState({ formula: prevVal + value });
    } else if (!endsWithOperator.test(formula)) {
      this.setState({
        prevVal: formula,
        formula: formula + value
      });
    } else if (!endsWithNegativeSign.test(formula)) {
      this.setState({
        formula:
          (endsWithNegativeSign.test(formula + value) ? formula : prevVal) +
          value
      });
    } else if (value !== "‑") {
      this.setState({
        formula: prevVal + value
      });
    }
  }

  handleDecimal() {
    if (this.state.evaluated === true) {
      this.setState({
        currentVal: "0.",
        formula: "0.",
        evaluated: false
      });
    } else if (!this.state.currentVal.includes(".")) {
      this.setState({ evaluated: false });
      if (
        endsWithOperator.test(this.state.formula) ||
        (this.state.currentVal === "0" && this.state.formula === "")
      ) {
        this.setState({
          currentVal: "0.",
          formula: this.state.formula + "0."
        });
      } else {
        this.setState({
          currentVal: this.state.formula.match(/(-?\d+\.?\d*)$/)[0] + ".",
          formula: this.state.formula + "."
        });
      }
    }
  }

  handleEvaluate() {
    let expression = this.state.formula;
    const indexOfEqual = expression.indexOf("=");
    if (indexOfEqual !== -1) {
      expression = expression.slice(0, indexOfEqual);
    }
    while (endsWithOperator.test(expression)) {
      expression = expression.slice(0, -1);
    }
    expression = expression.replace(/x/g, "*").replace(/‑/g, "-");
    console.log('expression', expression);
    const answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;
    this.setState({
      currentVal: answer.toString(),
      formula:
        expression.replace(/\*/g, "⋅").replace(/-/g, "‑") + "=" + answer,
      prevVal: answer,
      evaluated: true
    });
  }

  initialize() {
    this.setState({
      currentVal: "0",
      prevVal: "0",
      formula: "",
      evaluated: false
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
            evaluate={this.handleEvaluate}
            decimal={this.handleDecimal}
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
          value: 'x',
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
          onClick: this.props.decimal
        },
        {
          key: 'equals',
          value: '=',
          style: equalsStyle,
          onClick: this.props.evaluate,
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
