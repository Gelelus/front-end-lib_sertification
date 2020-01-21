const renderer = new marked.Renderer();//  GitHub flavored markdown render

class App extends React.Component {
 constructor(props) {
    super(props);
    this.state = {
      EditText: startText 
    }
    this.handleChange = this.handleChange.bind(this)
  }

   handleChange(event) {
    this.setState({
      EditText: event.target.value
    });
  }
  render(){
    return(
      <div>
         <Editor value = {this.state.EditText} change ={this.handleChange}/>
         <Preview value = {this.state.EditText}/> 
      </div>
    )
  }
}
const Editor = function (props){
   return (
    <textarea 
    type = 'text'
    spellcheck="false"
    id='editor'
    onChange = {props.change}
    value = {props.value}
      />
  );
}
const Preview = function (props){
   return (
    <div id="preview" dangerouslySetInnerHTML={{__html: marked(props.value, { renderer: renderer })}}/>
  );
}
const startText = 
`# Welcome to React Markdown Previewer!

Markdown is a way to style text on the web. You control the display of the document; formatting words as bold or italic, adding images, and creating lists are just a few of the things we can do with Markdown. Mostly, Markdown is just regular text with a few non-alphabetic characters thrown in, like # or *

You can use Markdown most places around GitHub:

1. Gists
1. Comments in Issues and Pull Requests
1. Files with the \`.md\` or \`.markdown\` extension

## And right here you can check it yourself. It's very easy. Just try changing something on the left side.
You can use one \`#\` all the way up to \`######\` six for different heading sizes.
# h1 
## h2 
### and so on 

---
You can also make text *italic* or **bold**:

*This text will be italic*
_This will also be italic_

**This text will be bold**
__This will also be bold__

_You **can** combine them_

---

Heres some code, \`<h1>Hello!</h1>\`.

\`\`\`
// there’s even a multi-line code:

const Editor = function (props){
   return (
    <textarea type = 'text' value = {props.value}/>
  );
}
\`\`\`
> Some blockQuote!  

---
or table

First Header | Second Header | Third Header
------------ | ------------- | -------------
Content from cell 1 | Content from cell 2 | Content from cell 3 
Content in the first column | Content in the second column | Content in the third column

![React Logo w/ Text](https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Markdown-mark.svg/1200px-Markdown-mark.svg.png)

you can even easily use lists or embed image:



* 1 Unordered 
  * 2 Unordered
    * 3 Unordered


1.  Ordered 
   1. Ordered 
   1. Ordered 



Here you can see more about [Markdown format](https://guides.github.com/features/mastering-markdown/)
`
ReactDOM.render(<App />, document.getElementById('app'));
