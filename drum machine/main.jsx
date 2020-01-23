let lit = ['Q','W','E','A','S','D','Z','X','C'];
let sounds = [
  {sound:'https://raw.githubusercontent.com/Gelelus/front-end-lib_sertification/master/drum%20machine/do.mp3',name: 'NoteDoo'},
  {sound:'https://raw.githubusercontent.com/Gelelus/front-end-lib_sertification/master/drum%20machine/re.mp3',name: 'NoteRe'},
  {sound: 'https://raw.githubusercontent.com/Gelelus/front-end-lib_sertification/master/drum%20machine/mi.mp3',name: 'NoteMi'},
  {sound: 'https://raw.githubusercontent.com/Gelelus/front-end-lib_sertification/master/drum%20machine/fa.mp3',name: 'NoteFa' },
  {sound: 'https://raw.githubusercontent.com/Gelelus/front-end-lib_sertification/master/drum%20machine/sol.mp3',name: 'NoteSol'},
  {sound: 'https://raw.githubusercontent.com/Gelelus/front-end-lib_sertification/master/drum%20machine/lja.mp3',name: 'NoteLiaa'},
  {sound: 'https://raw.githubusercontent.com/Gelelus/front-end-lib_sertification/master/drum%20machine/si.mp3',name: 'NoteSi'},
  {sound: 'https://raw.githubusercontent.com/Gelelus/front-end-lib_sertification/master/drum%20machine/ding.mp3',name: 'ding'},
  {sound: 'https://raw.githubusercontent.com/Gelelus/front-end-lib_sertification/master/drum%20machine/string-pluck.mp3',name: 'string-pluck'}
]
class Pad extends React.Component {
  constructor(props){
    super(props)
    this.playSound = this.playSound.bind(this);
    this.KeyPress = this.KeyPress.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.KeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.KeyPress);
  }
  KeyPress(e) {
    if (e.code === 'Key' + this.props.value) {
      this.playSound();
    }
  }
  playSound(){
    let sound = document.getElementById(this.props.name);
    sound.volume = this.props.soundValue;
    sound.currentTime = 0;
    sound.play();
    this.props.setDisplay(this.props.name)
  }
  render(){
    return (
      <div class ='drum-pad' onClick = {this.playSound} >{this.props.value}<audio class ='sound  clip' id={this.props.name} src={this.props.sound}></audio>
      </div>
    )
  }
}

class PadBox extends React.Component {
  constructor(props){
    super(props)
  }
  
  render(){
    let pads = sounds.map((a,i)=><Pad setDisplay ={this.props.setDisplay} name = {a.name} sound = {a.sound} soundValue ={this.props.soundValue} value = {lit[i]}/>)
    return (
      <div id ='pad-box'>
           {pads}
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      display:'',
      soundValue: 0.3,
      soundSequence:'seeseesaewqdqdseesaewq',
      sequences: ['seeseesaewqdqdseesaewq','xcxxcxc'],
      num:0
    }
    this.playSequence = this.playSequence.bind(this)
    this.adjustVolume = this.adjustVolume.bind(this)
    this.setDisplay = this.setDisplay.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.addSequence = this.addSequence.bind(this)
    this.more = this.more.bind(this)
  }
  setDisplay(name){
    this.setState({
          display: name
        });
  }
  more(n){
     if(this.state.num+n<0 || this.state.num+n > this.state.sequences.length-1){return}
     this.setState({
          num: this.state.num+n
        });
  }
    adjustVolume(e) {
      this.setState({
        soundValue: e.target.value
      });
  }
    handleChange(e){
       this.setState({
        soundSequence: e.target.value
      });
    }
    addSequence(){
      this.setState((state)=>({
        sequences: [...state.sequences, this.state.soundSequence],
        soundSequence: ''
      }));
    }
    playSequence(){
       this.setState((state)=>{
        let sound = document.getElementsByClassName('sound');
        let sequence = state.soundSequence.toUpperCase().split('').map(a=>lit.indexOf(a));
        (function go(i){
          if(i == sequence.length){return}
          sound[sequence[i]].currentTime = 0;
          sound[sequence[i]].volume = state.soundValue;
          sound[sequence[i]].play();
          setTimeout(go, 900, i+1);
        })(0)
        return 
       })
      
    }
  
  render(){
    let sec = this.state.sequences[this.state.num].slice(0,26);
    return (
      <div id ='drum-machine'>
        <PadBox setDisplay = {this.setDisplay} soundValue={this.state.soundValue}/>
        <div id = 'menu'>
           <p>Create pad Sequence</p>
           <div className="play-cons">
						  <input type="text" onChange={this.handleChange} value= {this.state.soundSequence}/>
              <button onClick = {this.playSequence}>play</button>
             <button onClick = {this.addSequence}>add</button>
			    </div>
          <p id = 'display'>{this.state.display}</p>
          <div className="volume-slider">
             
						   <label >Sound-volume: </label> <input type="range" min="0" max="1" step="0.01" value={this.state.soundValue} onChange={this.adjustVolume} />
			    </div>
               <div id = 'seqs' ><strong>Pads Sequences</strong>
                 <div id = 'seq'><i onClick = {()=>this.more(-1)} class="fa fa-arrow-left" aria-hidden="true"></i> {sec} <i class="fa fa-arrow-right" aria-hidden="true" onClick = {()=>this.more(1)}></i>
</div>
               </div>
        </div>
      </div> 
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
