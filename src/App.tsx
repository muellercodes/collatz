import "./App.css";
import { Visual } from "./components/visual";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">A Collatz Conjecture Visualization</header>
      {/* <input className="App-input" onChange={(e) => setCount(parseInt(e.target.value))} type="text"></input> */}
      <Visual />
    </div>
  );
};

export default App;
