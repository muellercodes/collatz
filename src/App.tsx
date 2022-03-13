import React from 'react';
// import d3 from 'd3';

import logo from './logo.svg';
import './App.css';


const isEven = (number: number) => (number % 2 === 0) ? true : false;
const nextNumber = (x: number) => isEven(x) ? x/2 : 3 * x + 1;
const processCollatz = (x: number, array: number[] = []) => {

  if (x !== 1) {
    array.push(x);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    processCollatz(nextNumber(x), array);
  }

  return array;
};

const amountOfStepsRange = (rangeTop: number, rangeBottom: number = 0) => { 
  let array = new Array(rangeTop-rangeBottom);
  let stepsArray = [];
  for (let index = rangeBottom+1; index <= array.length; index++) {
    const processed = processCollatz(index);
    stepsArray.push(processed.length);
  }
  return stepsArray;
};

const stepDuplications = (rangeTop: number, rangeBottom: number = 0) => { return amountOfStepsRange(rangeTop, rangeBottom).map((curr, i, array) => {
  if (curr === array[i-1] || curr === array[i+1]) {
    return {curr, dupe: true}
  } else {
    return {curr, dupe: false}
  }
})};



console.log(stepDuplications(5000));



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
