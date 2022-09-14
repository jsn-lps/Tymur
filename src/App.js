import './App.css';
import { useContext, useState, createContext, useEffect, useRef } from 'react';
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

  const [sesMin, setMin] = useState(defaultMin);
  const [brkMin, setBrkMin] = useState(defaultBreak);
  const [sesSec, setSec] = useState(defaultSec);


    const childTest = (e) => {
      setMin(e)
    }
  
  return (
    <div className="App">
      <NumsContext.Provider value={{ ses: [sesMin, setMin], sec: [sesSec, setSec], brk: [brkMin, setBrkMin]}}>
      <div id="body">

      <div id="timer-label">{breakTime ? "Break Time" : "Session Time"}</div>
      <div></div>

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
  // console.log(running);
  if(running && !paused){

  }
}






const EditableTimers = () => {
  // let [sesMin, setMin] = useState(defaultMin);
  // let [brkMin, setBrkMin] = useState(defaultBreak);
  const {ses, brk} = useContext(NumsContext)

  const [sesMin, setMin] = ses;
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
            setMin(sesMin - 1);
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
            setMin(sesMin + 1);
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




////////// testing 

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

////////// testing 






const TimeLeft = () => {
  const {ses, sec, brk} = useContext(NumsContext)
  const [sesMin, setMin] = ses;
  const [sesSec, setSec] = sec;
  const [brkMin, setBrkMin] = brk;

  
  
  useInterval(() => {
    if (running == true && paused == false){
      if (breakTime == true) {
        setMin(sesHolder);
        setSec(59);
        breakTime = false;
      } else if(sesMin > 0 && sesSec < 1) {
        setSec(0 + 59);
        setMin(sesMin - 1);
      } else if (sesSec > 0){
        setSec(sesSec - 1);
      } else 
      paused = true
      console.log(sesSec)
    }
  }, 1000);

  useInterval(() => {
    if (running == true && paused == true){
      if (breakTime == false) {
        setMin(brkMin - 1);
        setSec(59);
        breakTime = true;
      
      } else if (sesMin > 0 && sesSec < 1) {
      setMin(sesMin - 1);
      setSec(0 + 59);
      } else 
      paused = false;
    }

  }, 1000);

        
        // logic here goes as follows 
        
        // allow pausing by adding a status handler (paused = false)
        // i.e, if(!paused) { do code }
        // then have play/pause onClick run a function that toggles paused
        
        // if (sec == 0 && sesMin >= 1) { sesMin -= 1; sec = 59 }
        
        // else if (sec == 0 && sesMin = 0) { end timer, switch to break timer, play audio}
        
 // every 1000ms execute this code.


  
  let curTime = `${sesMin.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:${sesSec.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}`;

return (
  <div id="time-left">
    <div id="time-num">
      {curTime}
    </div>
  </div>

)
}


































export default App;
