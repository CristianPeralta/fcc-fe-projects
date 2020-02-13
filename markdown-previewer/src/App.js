import React, { Component } from 'react';
import './App.css';

const Toolbar = (props) => {
  return (
    <div className="toolbar">
      <i title="no-stack-dub-sack" className="fa fa-free-code-camp"/>
      {props.text}
      <i onClick={props.onClick} className={props.icon}></i>
    </div>
 )
};

class App extends Component {

  render() {
    return (
      <div>
        <div className="editorWrap maximized">
          <Toolbar icon="fa fa-arrows-alt" text="Editor">
          </Toolbar>
        </div>
        <div className="previewWrap maximized">
          <Toolbar icon="'fa fa-arrows-alt" text="Previewer">
          </Toolbar>
        </div>
      </div>
    )
  }
}

export default App;
