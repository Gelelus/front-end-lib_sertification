class PomdoroClock extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      breakLength:5,
      sessionLength:25,
      timer: 1500,
      stop: true,
      timerMode: 'Session'
    }
    this.switcher = this.switcher.bind(this)
    this.change = this.change.bind(this)
    this.reset = this.reset.bind(this)
    this.timerSet = this.timerSet.bind(this)
    this.goTimer = this.goTimer.bind(this)
  }
  change (e){
    if(!this.state.stop){return}
    switch(e.target.id){
      case 'session-increment':
        if(this.state.sessionLength != 60){
          this.setState({
            sessionLength: this.state.sessionLength + 1,
            timer: this.state.timerMode == 'Session' ? (this.state.sessionLength + 1)*60 : this.state.timer
                    })}
        break;
      case "session-decrement":
        if(this.state.sessionLength != 1){
          this.setState({
            sessionLength: this.state.sessionLength - 1,
            timer: this.state.timerMode == 'Session' ? (this.state.sessionLength - 1)*60 : this.state.timer
          })}
        break;
      case "break-increment":
        if(this.state.breakLength != 60){
          this.setState({
            breakLength: this.state.breakLength + 1,
            timer: this.state.timerMode == 'Break' ? (this.state.sessionLength + 1)*60 : this.state.timer
          })}
        break;
      case "break-decrement":
        if(this.state.breakLength != 1){
          this.setState({
            breakLength: this.state.breakLength - 1,
            timer: this.state.timerMode == 'Break' ? (this.state.sessionLength - 1)*60 : this.state.timer
          })}
    }
  }
  switcher(e){
    if(e.target.className!="fa fa-retweet"){
    e.target.className = e.target.className == "fa fa-play" ? "fa fa-pause" : "fa fa-play"}
    this.setState({
      stop: !this.state.stop
    })
    setTimeout(this.goTimer);
  }
  goTimer(){
    if(this.state.stop){return}
    if(this.state.timer == 0 ){
      document.getElementById('beep').currentTime = 0;
      document.getElementById('beep').play();
      let val = this.state.timerMode == 'Session';
      this.setState({
        timer: val ? this.state.breakLength * 60 : this.state.sessionLength * 60 ,
        timerMode: val ? 'Break' : 'Session'
      })
    }else{
      this.setState({
        timer: this.state.timer - 1
      })
    }
  
    setTimeout(this.goTimer, 1000);
  }
  timerSet(time){
    return `${Math.floor(time/60) > 9 ? Math.floor(time/60): '0' + Math.floor(time/60)}:${time%60 > 9 ? time%60 : '0' + time%60}`
  }
  reset(){
    document.getElementById('beep').pause();
    document.getElementById('beep').currentTime = 0;
    this.setState({
      breakLength:5,
      sessionLength:25,
      timer: 1500,
      stop: true,
      timerMode: 'Session'
    })
  }
  render(){
    return (
      <div id ='pomdoro'>
       <div class = 'list first'></div>
       <div class = 'list second'></div>
       <div class = 'main'></div>
       <h1>Pomodoro</h1>
       <div class = 'options' onClick = {this.change}>
         <div class = 'option-break'>
           <p id="break-label">Break Length</p>
           <i  id="break-increment" class="fa fa-caret-up" aria-hidden="true"></i> <span id="break-length">{this.state.breakLength}</span> <i class="fa fa-caret-down" aria-hidden="true" id="break-decrement"></i>
         </div>
         <div class = 'option-session' >
           <p id="session-label">Session Length</p>
           <i id="session-increment"  class="fa fa-caret-up" aria-hidden="true"></i> <span id="session-length">{this.state.sessionLength}</span> <i class="fa fa-caret-down" aria-hidden="true" id="session-decrement"></i>
         </div>
       </div>
        <div class = 'display'>
          <h3 id="timer-label">{this.state.timerMode}</h3>
          <p id="time-left">{this.timerSet(this.state.timer)}</p>
        </div>
        <div class = 'btns'>
          <button id="start_stop" onClick = {this.switcher}><i class="fa fa-play" aria-hidden="true"></i>
</button>
          <button id="reset" onClick = {this.reset}><i class="fa fa-retweet" aria-hidden="true"></i>
</button>
        </div>
        <audio id="beep" src = 'https://raw.githubusercontent.com/Gelelus/front-end-lib_sertification/master/pomodoroTimer/soun11.mp3'/>
        <a href ='https://en.wikipedia.org/wiki/Pomodoro_Technique' target="_blank">About pomodoro</a>
      </div>
      
    )
  }
}
ReactDOM.render(<PomdoroClock  />, document.getElementById('app'));
