import './App.css';
import { useContext, useState, createContext, useEffect } from 'react';
import React from 'react';
import { render } from '@testing-library/react';


// var declarations

const NumsContext = React.createContext({});



let defaultMin = 25;
let defaultBreak = 5;
let defaultSec = 0;
let brkHolder = defaultBreak;
let sesHolder = defaultMin;


// context for these? 
let running = false; // for reset handling to know if a session/break has started.
// reset button will set to default values of false.
let paused = false; // for play/pause button

let breakTime = false; // if running = true && breakTime = true, its break time


// main component
function App() {

  const [sesMin, setSesMin] = useState(defaultMin);
  const [brkMin, setBrkMin] = useState(defaultBreak);
  const [sesSec, setSesSec] = useState(defaultSec);


    const childTest = (e) => {
      setSesMin(e)
    }
  
  return (
    <div className="App">
      <NumsContext.Provider value={{ ses: [sesMin, setSesMin], sec: [sesSec, setSesSec], brk: [brkMin, setBrkMin]}}>
      <div id="body">

      <div id="timer-label">Session Time/Break Time (toggle this)</div>

      <TimeLeft />

      <div id="pauseplay">
        <button onClick={runningToggle} id="start_stop">pause/play</button>
        <button id="reset">reset</button>
      </div>

      </div> 
        <EditableTimers />
        </NumsContext.Provider >
    </div>
  );
}


const runningToggle = () => {
  running ? running = false : running = true;
  console.log(running);
  if(running && !paused){

  }
}






const EditableTimers = () => {
  // let [sesMin, setSesMin] = useState(defaultMin);
  // let [brkMin, setBrkMin] = useState(defaultBreak);
  const {ses, brk} = useContext(NumsContext)

  const [sesMin, setSesMin] = ses;
  const [brkMin, setBrkMin] = brk;

  
  

    const Decrement = (e) => {
      // only allow if running == false
      if (!running) {
        if(e.target.value === "break-btn") {
          if(brkMin != 0) {
          setBrkMin(brkMin - 1);
          // console.log(brkMin)
          }
      
        } else if(e.target.value === "session-btn") {
          if (sesMin != 0) {
            setSesMin(sesMin - 1);
            }
          }
        }
        brkHolder = brkMin;
        sesHolder = sesMin;
      }
    
    
    const Increment = (e) => {
      // only allow if running == false
      if (!running) {
        if(e.target.value === "break-btn") {
          if(brkMin != 60) {
            setBrkMin(brkMin + 1);
          // console.log(brkMin)
          }
      
        } else if(e.target.value === "session-btn") {
          if (sesMin != 60) {
            setSesMin(sesMin + 1);
          }
        }
      }
      brkHolder = brkMin;
      sesHolder = sesMin;
    }

  return (
    <div>
      {/* BREAK TIMER BLOCK */}
  <div id="editor-block">
    <div id="label-block">
      <div id="break-label">Break Length</div>
        <div id="label-subblock">
          <button onClick={Decrement} value="break-btn" className="numButton" id="break-decrement">-</button>
          <div className="numLength" id="break-length">{running ? brkHolder : brkMin}</div>
          <button onClick={Increment} value="break-btn" className="numButton" id="break-increment addremovebutton">+</button>
        </div>
    </div>

    {/* SESSION TIMER BLOCK */}
    <div id="label-block">
      <div id="session-label">Session Length</div>
        <div id="label-subblock">
          <button onClick={Decrement} value="session-btn" className="numButton" id="session-decrement addremovebutton">-</button>
          <div className="numLength" id="session-length">{running ? sesHolder : sesMin}</div>
          <button onClick={Increment} value="session-btn" className="numButton" id="session-increment addremovebutton">+</button>
        </div>
      </div>
    </div>

  </div>
  )
}


const TimeLeft = () => {
  const {ses, sec} = useContext(NumsContext)
  const [sesMin, setSesMin] = ses;
  const [sesSec, setSesSec] = sec;
  
  
  useEffect(() => {
    setInterval(function() {
      if (running == true){
        if(sesMin > 0 && sesSec == 0) {
          setSesSec(sesSec + 59);
          setSesMin(sesMin - 1);
        } else {
          setSesSec(sesSec - 1);
        }
        console.log(sesSec)
        
        // logic here goes as follows 
        
        // allow pausing by adding a status handler (paused = false)
        // i.e, if(!paused) { do code }
        // then have play/pause onClick run a function that toggles paused
        
        // if (sec == 0 && sesMin >= 1) { sesMin -= 1; sec = 59 }
        
        // else if (sec == 0 && sesMin = 0) { end timer, switch to break timer, play audio}
        
      }
    }, 1000) // every 1000ms execute this code.
  }, [running])
  
  let curTime = `${sesMin.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:${sesSec.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}`;

return (
  <div id="time-left">
    <div id="time-num">
      {curTime}
    </div>
  </div>

)
}



// second timer
const secondCounter = () => {


}

const playPause = () => {

}





























export default App;
