const countingSort = (array, position, arraySteps, colorSteps) => {
    const max = Math.max(...array);
    const count = new Array(max + 1).fill(0);

    for (let i = 0; i < array.length; i++) {
        count[array[i]]++;
    }

    let sortedIndex = 0;
    for (let i = 0; i <= max; i++) {
        while (count[i] > 0) {
            array[sortedIndex++] = i;
            count[i]--;
            arraySteps.push(array.slice());
        }
    }

    colorSteps.push(new Array(array.length).fill(2));
};

export default countingSort;
