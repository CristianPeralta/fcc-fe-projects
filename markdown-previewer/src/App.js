import React from 'react';
import './App.css';

const Toolbar = (props) => {
  return (
    <div className="toolbar">
      <i title="no-stack-dub-sack" className="fa fa-free-code-camp"/>      
      {props.children}
      <i onClick={props.onClick} className={props.icon}></i>
    </div>
 )
};

function App() {
  return (
    <div>
      <div className="editorWrap maximized">
        <p>Toolbar + Editor</p>
        <Toolbar icon="fa fa-arrows-alt">
                Editor
        </Toolbar>
      </div>
      <div className="previewWrap">
        <p>Toolbar + Previewer</p>
        <Toolbar icon="editorWrap maximized">
              Previewer
        </Toolbar>
      </div>
    </div>
  )
}

export default App;
