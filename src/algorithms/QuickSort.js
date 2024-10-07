const QuickSort = (array, position, arraySteps, colorSteps) => {
  // Helper function to partition the array
  const partition = (arr, left, right, colorKey) => {
    let pivot = arr[right];  // Choosing the pivot element (last element)
    let i = left - 1;

    // Mark pivot element
    colorKey[right] = 1; // Highlight the pivot
    colorSteps.push(colorKey.slice());

    for (let j = left; j < right; j++) {
      // Highlight the current element being compared
      colorKey[j] = 1;
      colorSteps.push(colorKey.slice());

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap smaller element to the left
        arraySteps.push(arr.slice()); // Push array state after swap
        colorSteps.push(colorKey.slice()); // Push color state after swap
      }

      // Unmark the current element after comparison
      colorKey[j] = 0;
      colorSteps.push(colorKey.slice());
    }

    // Swap pivot element to the correct position
    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
    arraySteps.push(arr.slice()); // Push array state after pivot swap
    colorKey[right] = 0; // Unmark pivot
    colorKey[i + 1] = 2; // Mark the pivot's final sorted position
    colorSteps.push(colorKey.slice());

    return i + 1; // Return the pivot index
  };

  // Recursive quicksort function
  const quickSortRecursive = (arr, left, right, colorKey) => {
    if (left < right) {
      let pivotIndex = partition(arr, left, right, colorKey); // Partition the array

      // Recursively sort elements before partition and after partition
      quickSortRecursive(arr, left, pivotIndex - 1, colorKey);
      quickSortRecursive(arr, pivotIndex + 1, right, colorKey);
    } else if (left >= 0 && right >= 0) {
      // Mark the current elements as sorted when recursion hits the base case
      for (let i = left; i <= right; i++) {
        colorKey[i] = 2; // Mark as sorted
      }
      colorSteps.push(colorKey.slice());
      arraySteps.push(arr.slice());
    }
  };

  // Initialize colorKey
  let colorKey = new Array(array.length).fill(0); // 0 = unsorted, 1 = being compared, 2 = sorted

  arraySteps.push(array.slice()); // Initial state
  colorSteps.push(colorKey.slice()); // Initial color state

  // Start recursive quicksort
  quickSortRecursive(array, 0, array.length - 1, colorKey);

  // Final sorted array
  colorSteps.push(new Array(array.length).fill(2)); // Mark everything as sorted
  arraySteps.push(array.slice()); // Final array state
};

export default QuickSort;
