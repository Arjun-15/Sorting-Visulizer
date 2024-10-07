const ShellSort = (array, position, arraySteps, colorSteps) => {
  let gap = Math.floor(array.length / 2);

  // Initialize the colorKey for visualization (0: unsorted, 1: being compared, 2: sorted)
  let colorKey = new Array(array.length).fill(0);

  while (gap > 0) {
    for (let i = gap; i < array.length; i++) {
      let temp = array[i];
      let j = i;

      // Highlight the current element being compared
      colorKey[i] = 1; // Mark the current element being inserted
      colorSteps.push(colorKey.slice()); // Record the current color state
      arraySteps.push(array.slice()); // Record the current array state

      // Compare and shift elements with a gap distance
      while (j >= gap && array[j - gap] > temp) {
        array[j] = array[j - gap]; // Shift element to the right
        colorKey[j] = 1; // Mark the element being compared
        colorSteps.push(colorKey.slice()); // Record color state during comparison
        arraySteps.push(array.slice()); // Record array state during comparison

        j -= gap;
      }

      array[j] = temp; // Insert the temp element in its correct position
      colorKey[j] = 2; // Mark the position as sorted
      colorSteps.push(colorKey.slice()); // Record the color state after insertion
      arraySteps.push(array.slice()); // Record the array state after insertion

      // Reset the color for unsorted elements after the gap comparison
      for (let k = 0; k < array.length; k++) {
        if (colorKey[k] !== 2) {
          colorKey[k] = 0; // Reset to unsorted
        }
      }
    }

    gap = Math.floor(gap / 2); // Reduce the gap size
  }

  // Final pass: mark all elements as fully sorted
  colorSteps.push(new Array(array.length).fill(2));
  arraySteps.push(array.slice());
};

export default ShellSort;
