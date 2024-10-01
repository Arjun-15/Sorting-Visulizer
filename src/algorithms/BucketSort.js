import insertionSort from "./InsertionSort";

const bucketSort = (array, position, arraySteps, colorSteps) => {
    const bucketSortRecursive = (arr) => {
        let numBuckets = Math.ceil(Math.sqrt(arr.length));
        let buckets = new Array(numBuckets).fill(null).map(() => []);
        
        let max = Math.max(...arr);
        for (let i = 0; i < arr.length; i++) {
            let bucketIndex = Math.floor((arr[i] / max) * (numBuckets - 1));
            buckets[bucketIndex].push(arr[i]);
        }

        buckets.forEach(bucket => {
            insertionSort(bucket, position, arraySteps, colorSteps);
        });

        return buckets.flat();
    };

    array = bucketSortRecursive(array);
    colorSteps.push(new Array(array.length).fill(2));
    arraySteps.push(array.slice());
};

export default bucketSort;
