import React, { Component } from 'react';
import marked from 'marked';
import './App.css';

function classList(classes) {
  return Object
    .entries(classes)
    .filter(entry => entry[1])
    .map(entry => entry[0])
    .join(' ');
}

marked.setOptions({
  breaks: true,
});

const renderer = new marked.Renderer();

renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}` + '</a>';
}

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
  const wrapClasses = classList({
    editorWrap: props.type === 'editor',
    previewWrap: props.type === 'preview',
    maximized: props.maximized,
    hide: props.hide,
  });

  return (
    <div className={wrapClasses}>
      {props.children}
    </div>
  )
};

const Editor = (props) => {
  return (
    <textarea id="editor"
      value={props.markdown}
      onChange={props.handleChange}
      type="text"/>
    )
};

const Preview = (props) => {
  return (
      <div id='preview' dangerouslySetInnerHTML={{__html: marked(props.markdown, { renderer: renderer })}} />
    )
}

const placeholder = 
`# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: placeholder,
      editorMaximized: false,
      hideEditor: false,
      previewMaximized: false,
      hidePreviewer: false,
    };
    this.handleEditorMaximize = this.handleEditorMaximize.bind(this);
    this.handlePreviewMaximize = this.handlePreviewMaximize.bind(this);
  }

  handleEditorMaximize() {
    const newValue = !this.state.editorMaximized;
    this.setState({
      hidePreviewer: newValue,
      editorMaximized: newValue
    });
  }

  handlePreviewMaximize() {
    const newValue = !this.state.previewMaximized;
    this.setState({
      hideEditor: newValue,
      previewMaximized: newValue
    });
  }

  getIconClass (isMaxizimed) {
    return isMaxizimed ? "fa fa-arrows-alt" : "fa fa-compress";
  }

  render() {
    return (
      <div>
        <Wrap type="editor" maximized={this.state.editorMaximized} hide={this.state.hideEditor}>
          <Toolbar 
            icon={this.getIconClass(this.state.editorMaximized)} text="Editor"
            onClick={this.handleEditorMaximize}/>
          <Editor markdown={this.state.markdown}/>
        </Wrap>
        <Wrap type="preview" maximized={this.state.previewMaximized} hide={this.state.hidePreviewer}>
          <Toolbar icon={this.getIconClass(this.state.previewMaximized)} text="Previewer"
            onClick={this.handlePreviewMaximize}/>
            <Preview markdown={this.state.markdown}></Preview>
        </Wrap>
      </div>
    )
  }
}

export default App;
