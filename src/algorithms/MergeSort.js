const mergeSort = (array, position, arraySteps, colorSteps) => {
    const merge = (left, right, colorKey) => {
        let sorted = [], i = 0, j = 0;
        while (i < left.length && j < right.length) {
            if (left[i] < right[j]) {
                sorted.push(left[i++]);
            } else {
                sorted.push(right[j++]);
            }
        }
        return sorted.concat(left.slice(i)).concat(right.slice(j));
    };

    const mergeSortRecursive = (arr, colorKey) => {
        if (arr.length <= 1) return arr;

        let mid = Math.floor(arr.length / 2);
        let left = mergeSortRecursive(arr.slice(0, mid), colorKey);
        let right = mergeSortRecursive(arr.slice(mid), colorKey);

        return merge(left, right, colorKey);
    };

    array = mergeSortRecursive(array);
    colorSteps.push(new Array(array.length).fill(2));  // Final sorted state
    arraySteps.push(array.slice());
};

export default mergeSort;
