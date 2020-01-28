const buttons =[{value:'CE', id:'lite-clear'},{value:'C', id:'clear'},{value:'/', id:"divide"},{value:'7', id:"seven"},{value:'8', id:"eight"},{value:'9', id:"nine"} ,{value:'*', id:"multiply"},{value:'4', id:"four"},{value:'5', id:"five"},{value:'6', id:"six"},{value:'-', id:"subtract"},{value:'1', id:"one"},{value:'2', id:"two"},{value:'3', id:"three"},{value:'+', id:"add"},{value:'0', id:"zero"},{value:'.', id:"decimal"},{value:'=', id:"equals"}]

class InterFace extends React.Component {
  constructor (props){
    super(props)
  }
  
  render() {
    let buts = buttons.map(a=><button class= {a.id + ' but'} id ={a.id}>{a.value}</button>)
    return (
    <div id = 'inter-face' onClick={this.props.addToFormula}>
      {buts}
    </div>    
    )
  }
}

class App extends React.Component {
  constructor (props){
    super(props)
      this.state = {
      displayVal: "0",
      formula: "",
      previousVal:'0',
      
    };
    this.addToFormula = this.addToFormula.bind(this)
    this.scroll = this.scroll.bind(this)
  }
  scroll(n,element){
    element.scrollLeft += n
  }
  addToFormula(e){
    
    let change = /[+*\/-]/.test(this.state.previousVal);
    let equal = this.state.previousVal.includes('=');
    let val = e.target.innerText;
    let display = this.state.displayVal;
    
    if(/[0-9]/.test(val)){
      if(equal){return}
      this.setState({
      displayVal: display == '0' || (change && (display != '-' && display != '+') ) ?  val : display + val
      
    })}
    else if(val == '.' ){
       if(equal){return}
       if(display.includes('.') && !change){return}
       this.setState({
         displayVal: change ? '0.' : display + val
     })}
    
    else if(val == 'CE'){
      if(equal){return}
      this.setState({
         displayVal: '0'
     })}
    else if(val == 'C'){
      this.setState({
         formula:'',
         displayVal: '0'
     })}
     else if(val == '='){
       if(equal){return}
      let result = String(Math.round(100000000000 * eval(change ? this.state.formula.slice(0,-2) : this.state.formula + ' ' + display)) / 100000000000);
      this.setState({
         formula:change ?'('+ this.state.formula.slice(0,-2)+')' : '('+this.state.formula + ' ' + display+' )',
         displayVal: result
     })
     }
     else {
      if(equal){
        this.setState({
      formula: this.state.formula + val
    })
      } else{
        
      this.setState({
      formula: change ? (val == '-' || val == '+'  ?  this.state.formula : this.state.formula.slice(0, -2) + ' ' + val) : this.state.formula + ' ' + display + ' ' + val +' ',
      displayVal: (val == '-' || val == '+') && change ? val : display
    })}}
    this.setState({
     previousVal: val
    })
    this.scroll(-200, document.getElementById("display"))
  }
  render(){
    
    return (
      <div id ='Calculator'>
        <div class = 'screen'>
          <span onClick = {()=>this.scroll(-200,document.getElementById("formul"))} class = 'scroll-butn left-formul'><i class="fa fa-angle-left" aria-hidden="true"></i>
</span>
          <span onClick = {()=>this.scroll(200,document.getElementById("formul"))} class = 'scroll-butn right-formul'><i class="fa fa-angle-right" aria-hidden="true"></i>
</span>
          <span onClick = {()=>this.scroll(-200, document.getElementById("display"))} class = 'scroll-butn left-display'><i class="fa fa-angle-left" aria-hidden="true"></i>
</span>
          <span onClick = {()=>this.scroll(200,document.getElementById("display"))}  class = 'scroll-butn right-display'><i class="fa fa-angle-right" aria-hidden="true"></i>
</span>
          <div id ='formul'>{this.state.formula}</div>
          <div id ='display'>{this.state.displayVal}</div>
        </div>
        <InterFace addToFormula = {this.addToFormula}/>
       </div> 
    )
  }
}


ReactDOM.render(<App />, document.getElementById("app"));
