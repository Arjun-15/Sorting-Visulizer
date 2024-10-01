const quickSort = (array, position, arraySteps, colorSteps) => {
    const quickSortRecursive = (arr, left, right) => {
        if (left < right) {
            let pivotIndex = partition(arr, left, right);

            // Recursively sort elements before and after partition
            quickSortRecursive(arr, left, pivotIndex - 1);
            quickSortRecursive(arr, pivotIndex + 1, right);
        }
    };

    const partition = (arr, left, right) => {
        let pivot = arr[right];
        let i = left - 1;
        
        for (let j = left; j < right; j++) {
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                arraySteps.push(arr.slice());
            }
        }
        [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
        arraySteps.push(arr.slice());
        
        return i + 1;
    };

    quickSortRecursive(array, 0, array.length - 1);
    colorSteps.push(new Array(array.length).fill(2));
    arraySteps.push(array.slice());
};

export default quickSort;
