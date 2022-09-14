import './App.css';
// import { useContext, useState, createContext } from 'react';
import React from 'react';
import { render } from '@testing-library/react';


// var declarations

// const DisplayContext = createContext({});
let defaultMin = 25;
let min = defaultMin;

let defaultSec = 0;
let sec = defaultSec;

let defaultBreak = 5;
let sessionBreak = defaultBreak;

let defaultTime = `${defaultMin}:${defaultSec.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}`;

let running = false; // for reset handling to know if a session/break has started.
// reset button will set to defaults. 
let paused = false; // for play/pause button

let breakTime = false; // if running = true && breakTime = true, its break time

// main component
function App() {
  return (
    <div className="App">
      <AppBody />
    </div>
  );
}



// render body 
const AppBody = () => {
  
    return (
<div id="body">

<div id="timer-label">Session Time/Break Time (toggle this)</div>

<TimeLeft />
<div id="pauseplay">
  <button id="start_stop">pause/play</button>
  <button id="reset">reset</button>
</div>


{/* BREAK TIMER BLOCK */}
<div id="editor-block">
  <div id="label-block">
    <div id="break-label">Break Length</div>
      <div id="label-subblock">
        <button className="numButton" id="break-decrement">-</button>
        <div className="numLength" id="break-length">{defaultBreak}</div>
        <button className="numButton" id="break-increment addremovebutton">+</button>
      </div>
  </div>

  {/* SESSION TIMER BLOCK */}
  <div id="label-block">
    <div id="session-label">Session Length</div>
      <div id="label-subblock">
        <button className="numButton" id="session-decrement addremovebutton">-</button>
        <div className="numLength" id="session-length">{defaultMin}</div>
        <button className="numButton" id="session-increment addremovebutton">+</button>
      </div>
  </div>
</div>


</div>
    )
}

const TimeLeft = () => {
return (
  <div id="time-left">
    <div id="time-num">
      {defaultTime}
    </div>
  </div>

)
}



// second timer
const secondCounter = () => {
  setInterval(function() {
    // logic here goes as follows 

    // allow pausing by adding a status handler (paused = false)
    // i.e, if(!paused) { do code }
    // then have play/pause onClick run a function that toggles paused

    // if (sec == 0 && min >= 1) { min -= 1; sec = 59 }

    // else if (sec == 0 && min = 0) { end timer, switch to break timer, play audio}


  }, 1000) // every 1000ms execute this code.
}

const playPause = () => {

}





























export default App;
