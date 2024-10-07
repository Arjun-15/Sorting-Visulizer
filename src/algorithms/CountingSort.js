const CountingSort = (array, position, arraySteps, colorSteps) => {
  const max = Math.max(...array);
  const count = new Array(max + 1).fill(0);

  // Step 1: Count occurrences of each value
  for (let i = 0; i < array.length; i++) {
    count[array[i]]++;

    // Color the element being counted
    let colorKey = new Array(array.length).fill(0); // Default color state (0 = uncolored)
    colorKey[i] = 1; // Color the current element being processed (1 = being processed)
    colorSteps.push(colorKey.slice()); // Push color state
    arraySteps.push(array.slice()); // Push current array state
  }

  // Step 2: Build the sorted array
  let sortedIndex = 0;
  for (let i = 0; i <= max; i++) {
    while (count[i] > 0) {
      array[sortedIndex] = i;
      
      // Color the element as sorted
      let colorKey = new Array(array.length).fill(0); // Default color state
      colorKey[sortedIndex] = 2; // Color the sorted element (2 = sorted)
      colorSteps.push(colorKey.slice()); // Push color state
      arraySteps.push(array.slice()); // Push current array state

      sortedIndex++;
      count[i]--;
    }
  }

  // Step 3: Mark the entire array as fully sorted
  colorSteps.push(new Array(array.length).fill(2)); // All elements sorted (color 2)
  arraySteps.push(array.slice()); // Push final sorted array state
};

export default CountingSort;
