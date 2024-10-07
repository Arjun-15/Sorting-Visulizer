import insertionSort from "./InsertionSort";

const BucketSort = (array, position, arraySteps, colorSteps) => {
  const bucketSortRecursive = (arr) => {
    let numBuckets = Math.ceil(Math.sqrt(arr.length)); // Determine the number of buckets
    let buckets = new Array(numBuckets).fill(null).map(() => []); // Create empty buckets

    let max = Math.max(...arr); // Find the max value to normalize bucket ranges

    // Place elements into their respective buckets
    for (let i = 0; i < arr.length; i++) {
      let bucketIndex = Math.floor((arr[i] / max) * (numBuckets - 1));
      buckets[bucketIndex].push(arr[i]);

      // Mark elements as placed into a bucket (colorKey 1 for being processed)
      let colorKey = new Array(arr.length).fill(0); // Default color state
      colorKey[i] = 1; // Color the current element
      colorSteps.push(colorKey.slice()); // Push color state
      arraySteps.push(arr.slice()); // Push array state
    }

    // Sort each bucket using insertion sort
    let sortedArray = [];
    buckets.forEach((bucket, bucketIndex) => {
      if (bucket.length > 0) {
        insertionSort(bucket, position, arraySteps, colorSteps); // Sort each bucket
        sortedArray = sortedArray.concat(bucket); // Concatenate sorted buckets

        // Mark bucket as being sorted (colorKey 2 for sorted)
        let colorKey = new Array(arr.length).fill(0);
        for (let i = 0; i < sortedArray.length; i++) {
          colorKey[i] = 2; // Mark elements as sorted
        }
        colorSteps.push(colorKey.slice()); // Push color state
        arraySteps.push(sortedArray.slice()); // Push array state
      }
    });

    return sortedArray;
  };

  // Perform bucket sort
  array = bucketSortRecursive(array);

  // Mark the entire array as fully sorted (final color state)
  colorSteps.push(new Array(array.length).fill(2)); // All elements sorted (colorKey 2)
  arraySteps.push(array.slice()); // Final sorted array
};

export default BucketSort;
