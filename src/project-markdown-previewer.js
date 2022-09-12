marked.setOptions({
    gfm: true,
    breaks: true,
});

const Toolbar = (props) => {
    return(
        <div className="toolbar">
           <i className="fa-solid fa-dragon"></i>        
             {props.text}
           <i className={props.icon} onClick={props.onClick} />
        
        </div>
    );
}

const Editor = (props) => {
    return(
        <textarea id="editor" type="text" onChange={props.onChange} value={props.markdown}>
  
        </textarea>
    );
}

const Previewer = (props) => {
    
    return(
        <div  dangerouslySetInnerHTML={{__html: marked.parse(props.markdown)}} id="preview">
            
        </div>
    );
}


class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            markdown: placeholder,
            editorOpen: false,
            previewerOpen: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.editorMaximize = this.editorMaximize.bind(this);
        this.previewerMaximize = this.previewerMaximize.bind(this);
    }
    handleChange(event){
        this.setState({
            markdown : (event.target.value),
        })
    };
    editorMaximize(){
        this.setState({
            editorOpen: !this.state.editorOpen,
        })
    };
    previewerMaximize(){
        this.setState({
            previewerOpen: !this.state.previewerOpen,
        })
    }
    
    
    render(){
        const status = this.state.editorOpen ? ["editorOpen","hide","fa-solid fa-arrow-down-left-and-arrow-up-right-to-center"]
                    : this.state.previewerOpen ? ["hide", "previewerOpen", "fa-solid fa-arrow-down-left-and-arrow-up-right-to-center"]
                    : ["editorWrap","previewerWrap", "fa-solid fa-arrows-maximize"];
        return (
            <div className="content">
                <div className={status[0]}>
                    <Toolbar onClick={this.editorMaximize} icon={status[2]} text="Editor" />
                    <Editor markdown={this.state.markdown} onChange={this.handleChange}/>
                </div>
                <div></div>
                <div className={status[1]}>
                    <Toolbar onClick={this.previewerMaximize} icon={status[2]} text="Previewer" />
                    <Previewer markdown={this.state.markdown}/>
                </div>
            </div>
        );
    }
}

const placeholder= `# Welcome to my React Markdown Previewer!

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

There's also [links](https://www.freecodecamp.org), and
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


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;


const container = document.getElementById("container");
const root = ReactDOM.createRoot(container);
root.render(<App />);
