import logo from './logo.svg';
import './App.css';
import { Game } from './components/Game';

function App() {
  return (
    <div className="App">
      <h2 style={{color: "#FFFFFF"}}>Three.js study</h2>
      <div id="logs" style={{color: "#FFFFFF"}}></div>
      <Game></Game>
    </div>
  );
}

export default App;
