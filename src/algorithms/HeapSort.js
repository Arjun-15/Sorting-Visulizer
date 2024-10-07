const HeapSort = (array, position, arraySteps, colorSteps) => {
  const heapify = (arr, n, i) => {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    let colorKey = new Array(arr.length).fill(0); // Initialize colorKey

    // Compare the left child
    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }

    // Compare the right child
    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }

    // If the largest is not the root
    if (largest !== i) {
      // Color the swapped elements
      colorKey[i] = 1; // Element being swapped
      colorKey[largest] = 1; // Element being swapped
      colorSteps.push(colorKey.slice());
      arraySteps.push(arr.slice()); // Push array state before the swap

      // Swap and heapify the affected subtree
      [arr[i], arr[largest]] = [arr[largest], arr[i]];

      // Push the array and color states after swap
      arraySteps.push(arr.slice()); // Push array after swap
      colorSteps.push(colorKey.slice()); // Push color state

      heapify(arr, n, largest); // Recursively heapify the affected subtree
    }
  };

  const heapSortRecursive = (arr) => {
    let n = arr.length;

    // Build the heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(arr, n, i);
    }

    // One by one extract elements from heap
    for (let i = n - 1; i > 0; i--) {
      // Swap the current root (largest element) with the end element
      [arr[0], arr[i]] = [arr[i], arr[0]];

      // Mark the sorted element (final position) in the color key
      let colorKey = new Array(arr.length).fill(0); // Default color
      colorKey[i] = 2; // Mark as sorted (color 2)
      colorSteps.push(colorKey.slice());
      arraySteps.push(arr.slice()); // Push array state after swap

      // Heapify the reduced heap
      heapify(arr, i, 0);

      // Push the array and color state after heapify
      colorSteps.push(colorKey.slice()); // Keep sorted elements highlighted
      arraySteps.push(arr.slice());
    }

    // Mark the last remaining element as sorted
    colorSteps.push(new Array(arr.length).fill(2)); // All elements sorted
    arraySteps.push(arr.slice()); // Final array state
  };

  // Start the heap sort
  heapSortRecursive(array);
};

export default HeapSort;
