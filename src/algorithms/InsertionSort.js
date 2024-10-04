const insertionSort = (array, position, arraySteps, colorSteps) => {
  // Initialize colorKey with the same length as the array (0: unsorted, 1: being compared, 2: sorted)
  let colorKey = new Array(array.length).fill(0);

  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;

    // Highlight the key being inserted
    colorKey[i] = 1; // Set color for the key
    colorSteps.push(colorKey.slice()); // Record the current state of colors
    arraySteps.push(array.slice()); // Record the array state after insertion

    // Shift larger elements to the right
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j]; // Shift
      arraySteps.push(array.slice()); // Record the array state after shifting

      colorKey[j + 1] = 1; // Highlight the element being compared
      colorSteps.push(colorKey.slice()); // Record colors after shifting
      j--; // Move to the next element
    }

    array[j + 1] = key; // Insert the key in the correct position
    arraySteps.push(array.slice()); // Record the array state after insertion

    // Mark the current position as sorted
    colorKey[j + 1] = 2; // Highlight sorted position
    colorSteps.push(colorKey.slice()); // Record colors after insertion

    // Ensure previous elements retain sorted state
    for (let k = 0; k < i; k++) {
      if (colorKey[k] !== 2) colorKey[k] = 0; // Mark as unsorted if not sorted
    }
  }

  // Final state of the array
  arraySteps.push(array.slice());
  colorSteps.push(new Array(array.length).fill(2)); // Mark all as sorted
};

export default insertionSort;
