import { createContext, useContext, useState } from "react";
import AlgorithmSelector from "./components/AlgorithmSelector";

// Rename sortingContext to SortingContext for consistency and proper naming convention
const SortingContext = createContext();

// Use sortingValue to access context in components that consume it
export const useSortingValue = () => {
  const value = useContext(SortingContext);
  if (!value) {
    throw new Error(
      "useSortingValue must be used within a SortingContextProvider"
    );
  }
  return value;
};

// SortingContext provider component
export function SortingContextProvider({ children }) {
  const [array, setArray] = useState([]);
  const [algorithm, setAlgorithm] = useState(SortingType.SIMPLE.BUBBLESORT);
  const [delay, setDelay] = useState(500);
  const [arraySize, setArraySize] = useState(5);
  const [minNumber, setMinNumber] = useState(1);
  const [maxNumber, setMaxNumber] = useState(500);
  const handleArraySize = (size) => {
    setArraySize(Math.max(minNumber, Math.min(maxNumber, Number(size))));
  };
  const handleDelay = (Delay) => {
    setDelay(Math.max(maxNumber, Number(Delay)));
  };
  const changeArray = (index, value) => {
    const newArray = [...array];
    newArray[index] = value;
    setArray(newArray);
  };
  return (
    <SortingContext.Provider
      value={{
        array,
        setArray,
        changeArray,
        algorithm,
        setAlgorithm,
        delay,
        handleDelay,
        arraySize,
        handleArraySize,
        minNumber,
        maxNumber,
      }}
    >
      <AlgorithmSelector />
      {children /* Now rendering the children prop */}
    </SortingContext.Provider>
  );
}

// Define sorting algorithms categories
export const SortingType = {
  SIMPLE: {
    BUBBLESORT: "Bubble Sort",
    INSERTIONSORT: "Insertion Sort",
    SELECTIONSORT: "Selection Sort",
  },
  EFFICIENT: {
    MERGESORT: "Merge Sort",
    QUICKSORT: "Quick Sort",
    HEAPSORT: "Heap Sort",
  },
  OTHER: {
    RADIXSORT: "Radix Sort",
    COUNTINGSORT: "Counting Sort",
    BUCKETSORT: "Bucket Sort",
    SHELLSORT: "Shell Sort",
  },
};

// sortingAlgorithms could be used elsewhere, but it is currently unused. Remove it or use it as needed.
const sortingAlgorithmsDef = {
  "Bubble Sort":
    "Iteratively swaps adjacent elements if they are in the wrong order.",
  "Insertion Sort":
    "Builds the sorted array one element at a time by inserting the current element into its correct position.",
  "Selection Sort":
    "Finds the minimum element in the unsorted portion of the array and swaps it with the first element.",

  "Merge Sort":
    "Divides the array into halves, sorts each half recursively, and merges the sorted halves.",
  "Quick Sort":
    "Picks a pivot element, partitions the array around the pivot, and recursively sorts the subarrays.",
  "Heap Sort":
    "Builds a max heap from the array and repeatedly extracts the maximum element and swaps it with the last element.",

  "Radix Sort": "Sorts integers by their individual digits.",
  "Counting Sort":
    "Sorts integers in a range by counting the number of occurrences of each value.",
  "Bucket Sort":
    "Sorts elements by distributing them into buckets and sorting each bucket.",
  "Shell Sort":
    "A variation of insertion sort that compares elements that are a certain distance apart.",
};

