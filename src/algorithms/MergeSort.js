const MergeSort = (array, position, arraySteps, colorSteps) => {
  const merge = (left, right, startIdx, colorKey) => {
    let sorted = [], i = 0, j = 0;
    let resultColorKey = colorKey.slice(); // Copy the color key

    while (i < left.length && j < right.length) {
      // Compare and push the smaller element into the sorted array
      if (left[i] < right[j]) {
        sorted.push(left[i]);
        resultColorKey[startIdx + sorted.length - 1] = 1; // Color the merging element
        arraySteps.push(array.slice(0, startIdx).concat(sorted, left.slice(i + 1), right.slice(j)));
        colorSteps.push(resultColorKey.slice());
        i++;
      } else {
        sorted.push(right[j]);
        resultColorKey[startIdx + sorted.length - 1] = 1; // Color the merging element
        arraySteps.push(array.slice(0, startIdx).concat(sorted, left.slice(i), right.slice(j + 1)));
        colorSteps.push(resultColorKey.slice());
        j++;
      }
    }

    // Concat remaining elements and push them into sorted
    sorted = sorted.concat(left.slice(i)).concat(right.slice(j));
    arraySteps.push(array.slice(0, startIdx).concat(sorted));
    resultColorKey.fill(2, startIdx, startIdx + sorted.length); // Mark as sorted
    colorSteps.push(resultColorKey.slice());

    return sorted;
  };

  const mergeSortRecursive = (arr, startIdx, colorKey) => {
    if (arr.length <= 1) return arr;

    let mid = Math.floor(arr.length / 2);
    
    // Recursively split and merge
    let left = mergeSortRecursive(arr.slice(0, mid), startIdx, colorKey);
    let right = mergeSortRecursive(arr.slice(mid), startIdx + mid, colorKey);

    // Merge the two halves and return the merged array
    return merge(left, right, startIdx, colorKey);
  };

  // Initialize colorKey and start the recursive merge sort
  let colorKey = new Array(array.length).fill(0); // 0 = unsorted, 1 = processing, 2 = sorted
  arraySteps.push(array.slice());
  colorSteps.push(colorKey.slice());

  // Call the recursive merge sort
  array = mergeSortRecursive(array, 0, colorKey);

  // Mark the final sorted state
  colorSteps.push(new Array(array.length).fill(2)); // Mark everything as sorted
  arraySteps.push(array.slice());
};

export default MergeSort;
