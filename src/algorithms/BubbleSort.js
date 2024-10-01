import { swap } from "./helpers";

const BubbleSort = (array, position, arraySteps, colorSteps) => {
  //   debugger;
  //   let colorKey = colorSteps[colorSteps.length - 1];
  //   console.log("color steps", colorSteps);
  // Initialize colorKey with the same length as the array
  let colorKey = new Array(array.length).fill(0);
  console.log(colorKey);
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        array = swap(array, j, j + 1);
      }
      arraySteps.push(array.slice());
      colorKey[j] = 1;
      colorKey[j + 1] = 1;
      colorSteps.push(colorKey.slice());
      colorKey[j + 1] = 0;
      colorKey[j] = 0;
    }
    colorKey[array.length - 1 - i] = 2;
    arraySteps.push(array.slice());
    colorSteps.push(colorKey.slice());
  }
  colorSteps[colorSteps.length - 1] = new Array(array.length).fill(2);
  return;
};

export default BubbleSort;
