import React from "react";
import * as THREE from "three";

import "./App.css";

const COUNT: number = 2000;
let maxNumber: number = 0;
let minNumber: number = 0;

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
  const lengthAndDupesArray = amountOfStepsRange(rangeTop, rangeBottom).map(
    (curr, i, array) => {
      if (
        curr.length === array[i - 1]?.length ||
        curr.length === array[i + 1]?.length
      ) {
        return { length: curr.length, dupe: true };
      } else {
        return { length: curr.length, dupe: false };
      }
    }
  );
  const allLengths = lengthAndDupesArray.map((item) => {
    return item.length;
  });
  maxNumber = Math.max(...allLengths);
  minNumber = Math.min(...allLengths);
  return lengthAndDupesArray;
};

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  3000
);
camera.position.set(0, 0, 2500);
camera.lookAt(1000, 0, 0);

const scene = new THREE.Scene();

//create a blue LineBasicMaterial
const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

const points: THREE.Vector3[] = [];

const steps = stepDuplications(COUNT);

console.log({steps, maxNumber, minNumber});

steps.forEach((step, i, arr) => {
  points.push(new THREE.Vector3(i, step.length, 0));
})

const geometry = new THREE.BufferGeometry().setFromPoints(points);

const line = new THREE.Line(geometry, material);

scene.add(line);
renderer.render(scene, camera);





document.body.appendChild(renderer.domElement);
function App() {
  return <div className="App"></div>;
}

export default App;
