const insertionSort = (array, position, arraySteps, colorSteps) => {
  // Initialize colorKey with the same length as the array (0: unsorted, 1: being compared, 2: sorted)
  let colorKey = new Array(array.length).fill(0);

  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;

    // Highlight the key being inserted
    colorKey[i] = 1; // Mark key as being compared (1 = being processed)
    colorSteps.push(colorKey.slice()); // Record the current state of colors
    arraySteps.push(array.slice()); // Record the array state before insertion

    // Shift larger elements to the right
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j]; // Shift element to the right
      arraySteps.push(array.slice()); // Record the array state after shifting

      colorKey[j + 1] = 1; // Highlight the element being compared (1 = being processed)
      colorSteps.push(colorKey.slice()); // Record the color state after shifting
      j--; // Move to the previous element
    }

    // Insert the key in the correct position
    array[j + 1] = key;
    arraySteps.push(array.slice()); // Record the array state after insertion

    // Mark the current position as sorted
    colorKey[j + 1] = 2; // Mark the inserted element as sorted (2 = sorted)
    colorSteps.push(colorKey.slice()); // Record the color state after insertion

    // Reset the color of all processed elements except the sorted ones
    for (let k = 0; k <= i; k++) {
      if (colorKey[k] !== 2) colorKey[k] = 0; // Reset color for unsorted elements
    }
  }

  // Final state of the array: mark all elements as sorted
  arraySteps.push(array.slice()); // Push the final sorted array state
  colorSteps.push(new Array(array.length).fill(2)); // Mark all as sorted (2 = sorted)
};

export default insertionSort;
