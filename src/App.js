import './App.css';
import { useContext, useState, createContext, useEffect, useRef } from 'react';
import React from 'react';


// var declarations

const NumsContext = React.createContext({});



let defaultMin = 25;
let defaultBreak = 5;
let defaultSec = 0;
let brkHolder = defaultBreak + 0;
let sesHolder = defaultMin + 0;


// reset button will set to default values of false.
let running = false; // has the timer ever started ( lengths aren't editable when true)
let paused = false; // for play/pause button usage
let breakTime = false; // for controlling displays when toggling break and session timers
let isSession = true; // help with toggling break and session timers



////////// custom hook for timer 
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
////////// custom hook for timer 




// main component
function App() {
  // state declarations
  const [sesMin, setMin] = useState(defaultMin);
  const [brkMin, setBrkMin] = useState(defaultBreak);
  const [sesSec, setSec] = useState(defaultSec);

  // times up sound
  const beepSound = useRef();
  const handleBeep = () => {
    if (beepSound.current !== null) {
      beepSound.current.play();
    }
  }
  // anytime session flag triggers, play audio
  useEffect(() => {
    if (running) {
    handleBeep()}
    }, 
    [isSession]
  )

  // for pressing the reset button
  const ResetButton = () => {
    // time values 
    setMin(defaultMin);
    setSec(defaultSec);
    setBrkMin(defaultBreak);
    brkHolder = defaultBreak;
    sesHolder = defaultMin;
    // flags 
    running = false;
    paused = false;
    breakTime = false;
    beepSound.current.pause();
    beepSound.current.currentTime = 0;
  }

  return (
    <div className="App">
      <NumsContext.Provider value={{ ses: [sesMin, setMin], sec: [sesSec, setSec], brk: [brkMin, setBrkMin]}}>
      <div id="body">
      <div id="timer-label">{breakTime ? "Break Time" : "Session Time"}</div>
      <TimeLeft /> 
      <div id="pauseplay">
        <button onClick={RunningToggle} id="start_stop">pause/play</button>
        <button onClick={ResetButton} id="reset">reset</button>
        </div>
      </div> 
        <EditableTimers />
        </NumsContext.Provider >
        <audio id="beep" ref={beepSound} preload="auto" type='audio' src="https://www.myinstants.com/media/sounds/taco-bell-bong-sfx.mp3" />
    </div>
  );
}

// on/off switch for pause/play button
// "running" toggle
const RunningToggle = () => {
  running ? running = false : running = true

}

const EditableTimers = () => {

  const {ses, brk} = useContext(NumsContext)

  const [sesMin, setMin] = ses;
  const [brkMin, setBrkMin] = brk;

  const DecrementBrk = () => {setBrkMin((prev) => prev - 1)}
  const IncrementBrk = () => {setBrkMin((prev) => prev + 1)}
  const DecrementMin = () => {setMin((prev) => prev - 1)}
  const IncrementMin = () => {setMin((prev) => prev + 1)}

    const Decrement = (e) => {
      // only allow if running == false
      if (!running) {
        if(e.target.value === "break-btn") {
          if(brkMin != 1) {
            setBrkMin((prev) => prev - 1) // functional updater?? hello?? ?????
          // console.log(brkMin)
          brkHolder--;
          }
      
        } else if(e.target.value === "session-btn") {
          if (sesMin != 1) {
            DecrementMin();
            sesHolder--;
            }
          }
        }
      }
    
    
    const Increment = (e) => {
      // only allow if running == false
      if (!running) {
        if(e.target.value === "break-btn") {
          if(brkMin != 60) {
            IncrementBrk()
            brkHolder++;
          // console.log(brkMin)
          }
      
        } else if(e.target.value === "session-btn") {
          if (sesMin != 60) {
            IncrementMin();
            sesHolder++;
          }
        }
      }
    }

  return (
    <div>
      {/* BREAK TIMER BLOCK */}
  <div id="editor-block">
    <div id="label-block">
      <div id="break-label">Break Length</div>
        <div id="label-subblock">
          <button onClick={Decrement} value="break-btn" className="numButton" id="break-decrement">-</button>
          <div className="numLength" id="break-length">{brkHolder}</div>
          <button onClick={Increment} value="break-btn" className="numButton" id="break-increment">+</button>
        </div>
    </div>

    {/* SESSION TIMER BLOCK */}
    <div id="label-block">
      <div id="session-label">Session Length</div>
        <div id="label-subblock">
          <button onClick={Decrement} value="session-btn" className="numButton" id="session-decrement">-</button>
          <div className="numLength" id="session-length">{sesHolder}</div>
          <button onClick={Increment} value="session-btn" className="numButton" id="session-increment">+</button>
        </div>
      </div>
    </div>

  </div>
  )
}


const TimeLeft = () => {
  const {ses, sec, brk} = useContext(NumsContext)
  const [sesMin, setSesMin] = ses;
  const [sesSec, setSesSec] = sec;

  const setSec = (e) => {setSesSec((prev) => e);}
  
  // session increment
  useInterval(() => { 
    if (running == true && paused == false) {
      if(sesMin > 0 && sesSec < 1) {
        isSession = true
        setSesMin((prev) => prev - 1);
        setSec(59);
        console.log("session -1 min");

        // increment seconds
      } else if (sesSec > 1){
        setSesSec((prev) => prev - 1)
        console.log("session -1 sec")

      } else if (sesMin > 0 && sesSec == 1) {
        setSec(0);
        console.log("session 00 sec with more mins")

        // prep for break time
      } else if (sesMin == 0 && sesSec == 1) {
        setSec(0);
        breakTime = true;
        console.log("session 1 sec left")


        // go to break time!!
      } else if (sesMin == 0 && sesSec == 0 && isSession == true ) {
        console.log("Going to break"); 
        setSesMin(() => brkHolder)
        paused = true;
      }
    } 
  }, 100); // 1000 for real time. 100ms for speedy testing
  

  // break increment
  useInterval(() => {
    if (running == true && paused == true){
      if (sesMin > 0 && sesSec < 1) {
        isSession = false
        setSesMin((prev) => prev - 1);
        setSec(59);
        console.log("break -1 min")

        // increment seconds
      } else if (sesSec > 1){
        setSesSec((prev) => prev - 1)
        console.log("break -1 sec")

      } else if (sesMin > 0 && sesSec == 1) {
        setSec(0);
        console.log("break 00 sec with more mins")

        // prep for session time
      } else if (sesMin == 0 && sesSec == 1) {
        setSec(0);
        breakTime = false;
        console.log("break 1 sec left")


        // go back to session!!
     } else if (sesMin == 0 && sesSec == 0 && isSession == false) {
        console.log("Going to session")
        setSesMin(() => sesHolder)
        paused = false;
        
      }
    } 

  }, 100);

  
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