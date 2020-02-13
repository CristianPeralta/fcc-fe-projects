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
        <Toolbar icon="fa fa-arrows-alt">
                Editor
        </Toolbar>
      </div>
      <div className="editorWrap maximized">
        <Toolbar icon="'fa fa-arrows-alt">
              Previewer
        </Toolbar>
      </div>
    </div>
  )
}

export default App;
