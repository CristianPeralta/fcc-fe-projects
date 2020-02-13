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

const Wrap = (props) => {
  const classByType = {
    editor: "editorWrap",
    preview: "previewWrap",
  }
  return (
    <div className={classByType[props.type]}>
      {props.children}
    </div>
  )
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorMaximized: false,
      previewMaximized: false
    };
  }

  handleEditorMaximize() {
    this.setState({
      editorMaximized: !this.state.editorMaximized
    });
  }

  handlePreviewMaximize() {
    this.setState({
      previewMaximized: !this.state.previewMaximized
    });
  }
  
  render() {
    return (
      <div>
        <Wrap type="editor">
          <Toolbar icon="fa fa-arrows-alt" text="Editor"/>
        </Wrap>
        <Wrap type="preview">
          <Toolbar icon="fa fa-compress" text="Previewer"/>
        </Wrap>
      </div>
    )
  }
}

export default App;
