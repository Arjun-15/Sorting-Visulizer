const insertionSort = (array, position, arraySteps, colorSteps) => {
  let colorKey = colorSteps[colorSteps.length - 1].slice();
  debugger;
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;

    // Color the element being sorted
    colorKey[i] = 1;
    colorSteps.push(colorKey.slice());

    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      arraySteps.push(array.slice());

      colorKey[j + 1] = 1;
      colorSteps.push(colorKey.slice());

      j--;
    }
    array[j + 1] = key;

    // Record array after inserting the element
    arraySteps.push(array.slice());

    // Mark sorted part of the array
    colorKey[i] = 2;
    colorSteps.push(colorKey.slice());
  }
  colorSteps.push(new Array(array.length).fill(2));
};

export default insertionSort;
