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

export const stepDuplications = (rangeTop: number, rangeBottom: number = 0) => {
  const lengthAndDupesArray = amountOfStepsRange(rangeTop, rangeBottom).map(
    (curr, i, array) => {
      if (
        curr.length === array[i - 1]?.length ||
        curr.length === array[i + 1]?.length
      ) {
        return { length: curr.length, dupe: true, array: array[i] };
      } else {
        return { length: curr.length, dupe: false, array: array[i] };
      }
    }
  );
  const allLengths = lengthAndDupesArray.map((item) => {
    return item.length;
  });
  maxNumber = Math.max(...allLengths);
  minNumber = Math.min(...allLengths);
  console.log({maxNumber, minNumber});
  
  return lengthAndDupesArray;
};
