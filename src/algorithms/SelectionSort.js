import { swap } from "../common/common.module";

const selectionSort = (array, position, arraySteps, colorSteps) => {
    let colorKey = new Array(array.length).fill(0); // Initialize all bars as uncolored

    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;

        // Color the position we're considering as the minimum
        colorKey[minIndex] = 1; // Mark current minimum
        colorSteps.push(colorKey.slice()); // Push current color state

        for (let j = i + 1; j < array.length; j++) {
            // Color the element being compared
            colorKey[j] = 1; // Mark as being compared
            colorSteps.push(colorKey.slice()); // Push current color state

            // Find the minimum element
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }

            // Reset color for j after comparison
            colorKey[j] = 0; // Reset the color of compared element
            colorSteps.push(colorKey.slice()); // Push current color state
        }

        if (minIndex !== i) {
            // Swap the found minimum element with the first element
            array = swap(array, i, minIndex);

            // Record the array after swapping
            arraySteps.push(array.slice());
        }

        // Mark the sorted part of the array
        colorKey[i] = 2; // Mark this element as sorted (final position)
        colorKey[minIndex] = 0; // Reset the color of the swapped element
        colorSteps.push(colorKey.slice()); // Push the color state after sorting
    }

    // Mark all elements as sorted
    colorSteps.push(new Array(array.length).fill(2));

    return;
};

export default selectionSort;
