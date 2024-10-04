// AlgorithmSelector.js
import React from "react";

const AlgorithmSelector = ({
  count,
  setCount,
  delay,
  setDelay,
  algorithm,
  setAlgorithm,
}) => {
  return (
    <>
      <input
        type="number"
        placeholder="Count"
        value={count}
        onChange={(e) =>
          setCount(Math.max(1, Math.min(100, Number(e.target.value))))
        }
        style={{ margin: "10px", padding: "5px" }}
      />
      <input
        type="number"
        placeholder="Delay (ms)"
        value={delay}
        onChange={(e) => setDelay(Math.max(100, Number(e.target.value)))}
        style={{ margin: "10px", padding: "5px" }}
      />

      <select
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value)}
        style={{ margin: "10px", padding: "5px" }}
      >
        <option value="Insertion Sort">Insertion Sort</option>
        <option value="Bubble Sort">Bubble Sort</option>
        <option value="Selection Sort">Selection Sort</option>
        {/* Add more algorithms as needed */}
      </select>
    </>
  );
};

export default AlgorithmSelector;
