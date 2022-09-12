import './App.css';

function App() {
  return (
    <div className="App">
      <div id="body">

        <div id="timer-label"></div>

        <div id="time-left">00:00</div>
        <div id="start_stop">pause/play</div>
        <div id="reset">reset</div>


        <div id="editor-block">
          <div id="label-block">
            <div id="break-label">Break Length</div>
              <div id="label-subblock">
                <button className="numButton" id="break-decrement">-</button>
                <div className="numLength" id="break-length">5</div>
                <button className="numButton" id="break-increment addremovebutton">+</button>
              </div>
          </div>

          <div id="label-block">
            <div id="session-label">Session Length</div>
              <div id="label-subblock">
                <button className="numButton" id="session-decrement addremovebutton">-</button>
                <div className="numLength" id="session-length">25</div>
                <button className="numButton" id="session-increment addremovebutton">+</button>
              </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
