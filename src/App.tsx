import React from "react";
// import d3 from 'd3';

import logo from "./logo.svg";
import "./App.css";

const COUNT: number = 1000;
let maxNumber: number;
let minNumber: number;

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
  const lengthAndDupesArray = amountOfStepsRange(rangeTop, rangeBottom).map((curr, i, array) => {
    if (
      curr.length === array[i - 1]?.length ||
      curr.length === array[i + 1]?.length
    ) {
      return {length: curr.length, dupe: true};
    } else {
      return {length: curr.length, dupe: false};
    }
  });
  const allLengths = lengthAndDupesArray.map((item) => {
    return item.length;
  })
  maxNumber = Math.max(...allLengths);
  minNumber = Math.min(...allLengths);
  console.log(maxNumber);
  return lengthAndDupesArray;

};

// rn takes about 4 seconds for one million iterations for that range
console.time(`stepDuplications_${COUNT}`);
console.log(stepDuplications(COUNT));
console.timeEnd(`stepDuplications_${COUNT}`);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      {stepDuplications(COUNT).map((step: {length: number, dupe: boolean}, i) => {
        // we want to map the min and max numbers to 0 and 100 and all in between
        // (value - min) / (max - min)
        const percentage = ((step.length - minNumber) / (maxNumber - minNumber)) * 100;
        
        return (
          <div key={i} style={{background: step.dupe ? 'grey' : 'white', filter: `brightness(${percentage}%)`}}>{`${step.dupe ? '-'.repeat(step.length) : '0'}`}</div>
        )
      })}
    </div>
  );
}

export default App;
