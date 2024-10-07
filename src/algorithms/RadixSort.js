const RadixSort = (array, position, arraySteps, colorSteps) => {
  const getMax = (arr) => Math.max(...arr);

  const countingSortByDigit = (arr, exp) => {
    let output = new Array(arr.length).fill(0); // To store sorted output based on current digit
    let count = new Array(10).fill(0); // Counting array for digits (0-9)
    let colorKey = new Array(arr.length).fill(0); // Color key for visualization

    // Count the occurrences of each digit
    for (let i = 0; i < arr.length; i++) {
      let digit = Math.floor(arr[i] / exp) % 10;
      count[digit]++;
      colorKey[i] = 1; // Highlight the digit being processed
      colorSteps.push(colorKey.slice()); // Record color step
      arraySteps.push(arr.slice()); // Record array step
    }

    // Adjust count array to accumulate counts
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    // Build the output array based on the current digit
    for (let i = arr.length - 1; i >= 0; i--) {
      let digit = Math.floor(arr[i] / exp) % 10;
      output[count[digit] - 1] = arr[i];
      count[digit]--;

      colorKey[i] = 2; // Mark element as sorted in this digit's pass
      colorSteps.push(colorKey.slice()); // Record color step
      arraySteps.push(output.slice()); // Record sorted output step
    }

    // Copy the sorted output array to the original array
    for (let i = 0; i < arr.length; i++) {
      arr[i] = output[i];
      colorKey[i] = 2; // Mark the current element as sorted
    }

    arraySteps.push(arr.slice()); // Record array state after completing the pass
    colorSteps.push(colorKey.slice()); // Record the final color state for this digit
  };

  // Get the maximum number to know the number of digits
  let max = getMax(array);

  // Perform counting sort for every digit, starting from the least significant digit
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSortByDigit(array, exp);
  }

  // After all passes, mark the entire array as fully sorted
  colorSteps.push(new Array(array.length).fill(2)); // Final sorted state
  arraySteps.push(array.slice()); // Final array state
};

export default RadixSort;
