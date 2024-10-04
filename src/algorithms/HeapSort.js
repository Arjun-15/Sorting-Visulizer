const HeapSort = (array, position, arraySteps, colorSteps) => {
  const heapify = (arr, n, i) => {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      arraySteps.push(arr.slice());
      heapify(arr, n, largest);
    }
  };

  const heapSortRecursive = (arr) => {
    let n = arr.length;

    // Build heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(arr, n, i);
    }

    // Extract elements
    for (let i = n - 1; i >= 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      arraySteps.push(arr.slice());
      heapify(arr, i, 0);
    }
  };

  heapSortRecursive(array);
  colorSteps.push(new Array(array.length).fill(2));
};

export default HeapSort;
