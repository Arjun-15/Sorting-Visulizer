import React, { useEffect, useState } from "react";
import styled from "styled-components";
import shellSort from "../algorithms/ShellSort";
import bucketSort from "../algorithms/BucketSort";
import BubbleSort from "../algorithms/BubbleSort";
import insertionSort from "../algorithms/InsertionSort";
import radixSort from "../algorithms/RadixSort";
import selectionSort from "../algorithms/SelectionSort";
import mergeSort from "../algorithms/MergeSort";
import quickSort from "../algorithms/QuickSort";
import heapSort from "../algorithms/HeapSort";
import countingSort from "../algorithms/CountingSort";

// Styled components for Dropdown
const DropdownContainer = styled.div`
  width: 300px;
  margin: 20px;
`;

const DropdownButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
  border-radius: 4px;
  font-size: 16px;
`;

const DropdownList = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
  display: ${(props) => (props.show === "true" ? "block" : "none")};
  margin-top: 5px;
  position: relative;
  z-index: 1000;
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const Description = styled.div`
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const sortingAlgorithms = {
  Simple: {
    "Bubble Sort":
      "Iteratively swaps adjacent elements if they are in the wrong order.",
    "Insertion Sort":
      "Builds the sorted array one element at a time by inserting the current element into its correct position.",
    "Selection Sort":
      "Finds the minimum element in the unsorted portion of the array and swaps it with the first element.",
  },
  Efficient: {
    "Merge Sort":
      "Divides the array into halves, sorts each half recursively, and merges the sorted halves.",
    "Quick Sort":
      "Picks a pivot element, partitions the array around the pivot, and recursively sorts the subarrays.",
    "Heap Sort":
      "Builds a max heap from the array and repeatedly extracts the maximum element and swaps it with the last element.",
  },
  Other: {
    "Radix Sort": "Sorts integers by their individual digits.",
    "Counting Sort":
      "Sorts integers in a range by counting the number of occurrences of each value.",
    "Bucket Sort":
      "Sorts elements by distributing them into buckets and sorting each bucket.",
    "Shell Sort":
      "A variation of insertion sort that compares elements that are a certain distance apart.",
  },
};

const SortingDropdown = ({ algorithm, selectDrop }) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(algorithm || "");
  const [description, setDescription] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (selectedAlgorithm) {
      // Find the corresponding description when algorithm is selected/loaded initially
      Object.entries(sortingAlgorithms).forEach(([category, algorithms]) => {
        if (algorithms[selectedAlgorithm]) {
          setDescription(algorithms[selectedAlgorithm]);
        }
      });
    }
  }, [selectedAlgorithm]); // This will run when selectedAlgorithm changes

  const handleAlgorithmSelect = (name, desc) => {
    setSelectedAlgorithm(name);
    setDescription(desc);
    setShowDropdown(false);
    selectDrop(name);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={toggleDropdown}>
        {selectedAlgorithm || "Select a Sorting Algorithm"}
      </DropdownButton>
      <DropdownList show={showDropdown.toString()}>
        {Object.entries(sortingAlgorithms).map(([category, algorithms]) => (
          <div key={category}>
            <strong>{category}</strong>
            {Object.entries(algorithms).map(([name, desc]) => (
              <DropdownItem
                key={name}
                onClick={() => handleAlgorithmSelect(name, desc)}
              >
                {name}
              </DropdownItem>
            ))}
          </div>
        ))}
      </DropdownList>
      {description && <Description>{description}</Description>}
    </DropdownContainer>
  );
};

export default SortingDropdown;

export const NameOfSortingAlgorithm = {
  "Bubble Sort": BubbleSort,
  "Insertion Sort": insertionSort,
  "Selection Sort": selectionSort,
  "Merge Sort": mergeSort,
  "Quick Sort": quickSort,
  "Heap Sort": heapSort,
  "Radix Sort": radixSort,
  "Counting Sort": countingSort,
  "Bucket Sort": bucketSort,
  "Shell Sort": shellSort,
};
