import React from "react";
// import d3 from 'd3';

import logo from "./logo.svg";
import "./App.css";

const isEven = (number: number) => (number % 2 === 0 ? true : false);
const nextNumber = (x: number) => (isEven(x) ? x / 2 : 3 * x + 1);
const processCollatz = (x: number, array: number[] = []) => {
  if (x !== 1) {
    array.push(x);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    processCollatz(nextNumber(x), array);
  } else {
    array.push(x);
  }

  return array;
};

const amountOfStepsRange = (rangeTop: number, rangeBottom: number = 0) => {
  let array = new Array(rangeTop - rangeBottom);
  let stepsArray = [];
  for (let index = rangeBottom + 1; index <= array.length; index++) {
    const stepsToOne = processCollatz(index);
    stepsArray.push({ length: stepsToOne.length, steps: stepsToOne });
  }
  return stepsArray;
};

const stepDuplications = (rangeTop: number, rangeBottom: number = 0) => {
  return amountOfStepsRange(rangeTop, rangeBottom).map((curr, i, array) => {
    if (
      curr?.length === array[i - 1]?.length ||
      curr?.length === array[i + 1]?.length
    ) {
      return true;
    } else {
      return false;
    }
    // if (
    //   curr?.length === array[i - 1]?.length ||
    //   curr?.length === array[i + 1]?.length
    // ) {
    //   return { dupe: true, curr };
    // } else {
    //   return { dupe: false, curr };
    // }
  });
};

const count = 1000000;
// rn takes about 4 seconds for one million iterations for that range
console.time(`stepDuplications_${count}`);
console.log(stepDuplications(count));
console.timeEnd(`stepDuplications_${count}`);

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
