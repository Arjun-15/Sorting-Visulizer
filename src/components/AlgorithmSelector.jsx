// AlgorithmSelector.js
import React from "react";
import { SortingType, useSortingValue } from "../sortingContext";
import { generateOptGroup } from "../common/common.module";

const AlgorithmSelector = () => {
  const {
    arraySize,
    handleArraySize,
    delay,
    handleDelay,
    algorithm,
    setAlgorithm,
  } = useSortingValue();
  return (
    <div style={{width: '11%',}}>
      <input
        type="number"
        placeholder="Count"
        value={arraySize}
        onChange={(e) => handleArraySize(e.target.value)}
        style={{ margin: "5px", padding: "5px" }}
      />
      <input
        type="number"
        placeholder="Delay (ms)"
        value={delay}
        onChange={(e) => handleDelay(e.target.value)}
        style={{ margin: "5px", padding: "5px" }}
      />

      <select
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value)}
        style={{ margin: "10px", padding: "5px" }}
      >
        {generateOptGroup(SortingType)}
      </select>
    </div>
  );
};

export default AlgorithmSelector;

