import { swap } from "./helpers";

const selectionSort = (array, position, arraySteps, colorSteps) => {
    let colorKey = colorSteps[colorSteps.length - 1].slice();

    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;

        // Color the position we're considering as the minimum
        colorKey[minIndex] = 1;
        colorSteps.push(colorKey.slice());

        for (let j = i + 1; j < array.length; j++) {
            // Color the element being compared
            colorKey[j] = 1;
            colorSteps.push(colorKey.slice());

            // Find the minimum element
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }

            // Reset color for j after comparison
            colorKey[j] = 0;
            colorSteps.push(colorKey.slice());
        }

        // Swap the found minimum element with the first element
        array = swap(array, i, minIndex);

        // Record the array after swapping
        arraySteps.push(array.slice());

        // Mark the sorted part of the array
        colorKey[i] = 2;
        colorKey[minIndex] = 0;  // Reset the color of the swapped element if it's not at i
        colorSteps.push(colorKey.slice());
    }

    // Mark all elements as sorted
    colorSteps.push(new Array(array.length).fill(2));

    return;
}

export default selectionSort;
