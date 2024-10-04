const RadixSort = (array, position, arraySteps, colorSteps) => {
  const getMax = (arr) => Math.max(...arr);

  const countingSortByDigit = (arr, exp) => {
    let output = new Array(arr.length).fill(0);
    let count = new Array(10).fill(0);

    for (let i = 0; i < arr.length; i++) {
      let digit = Math.floor(arr[i] / exp) % 10;
      count[digit]++;
    }

    for (let i = 1; i < 10; i++) count[i] += count[i - 1];

    for (let i = arr.length - 1; i >= 0; i--) {
      let digit = Math.floor(arr[i] / exp) % 10;
      output[count[digit] - 1] = arr[i];
      count[digit]--;
    }

    for (let i = 0; i < arr.length; i++) {
      arr[i] = output[i];
    }

    arraySteps.push(arr.slice());
  };

  let max = getMax(array);

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSortByDigit(array, exp);
  }

  colorSteps.push(new Array(array.length).fill(2));
};

export default RadixSort;
