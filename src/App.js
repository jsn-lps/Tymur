import './App.css';

function App() {
  return (
    <div className="App">
      <div id="body">

        <div id="timer-label"></div>

        <div id="time-left">00:00</div>
        <div id="start_stop">pause/play</div>
        <div id="reset">reset</div>


      <div id="yuh"></div>
      <div id="break-label">Break Length</div>
        <button id="break-decrement">-</button>
        <div id="break-length">5 default</div>
        <button id="break-increment">+</button>


      <div id="session-label">Session Length</div>
        <button id="session-decrement">-</button>
        <div id="session-length">25 default</div>
        <button id="session-increment">+</button>


      </div>
    </div>
  );
}

export default App;
