const shellSort = (array, position, arraySteps, colorSteps) => {
    let gap = Math.floor(array.length / 2);

    while (gap > 0) {
        for (let i = gap; i < array.length; i++) {
            let temp = array[i];
            let j = i;

            while (j >= gap && array[j - gap] > temp) {
                array[j] = array[j - gap];
                j -= gap;
                arraySteps.push(array.slice());
            }

            array[j] = temp;
            arraySteps.push(array.slice());
        }
        gap = Math.floor(gap / 2);
    }

    colorSteps.push(new Array(array.length).fill(2));
};

export default shellSort;
