import "./SortingVisualizer.css";
import { useEffect, useState } from "react";
import SortingController from "../components/SortingController";
import Bar from "../components/Bar";
import { useSortingValue } from "../sortingContext";
import {
  generateRandomArray,
  NameOfSortingAlgorithm,
} from "../common/common.module";

const SortingVisualizer = () => {
  const [arraySteps, setArraySteps] = useState([]);
  const [colorSteps, setColorSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeouts, setTimeouts] = useState([]);
  const [currentArray, setCurrentArray] = useState([]);
  const [colorKey, setColorKey] = useState([]);

  const { array, setArray, algorithm, delay, arraySize, minNumber, maxNumber } =
    useSortingValue();

  // Clear all timeouts
  const clearTimeouts = () => {
    timeouts.forEach(clearTimeout);
    setTimeouts([]);
  };

  // Initialize color key and color steps
  const initializeColorKey = () => {
    const blankKey = new Array(arraySize).fill(0);
    setColorKey(blankKey);
    setColorSteps([blankKey]);
  };

  // Generate sorting steps based on the selected algorithm
  const generateSortingSteps = (newArray) => {
    const steps = [];
    const colorSteps = [];
    NameOfSortingAlgorithm[algorithm](newArray.slice(), 0, steps, colorSteps);
    setArraySteps(steps);
    setColorSteps(colorSteps);
  };

  // Generate a new random array
  const handleRandomArray = () => {
    clearTimeouts();
    initializeColorKey();
    const newArray = generateRandomArray(arraySize, minNumber, maxNumber);
    setArray(newArray);
    setCurrentArray(newArray);
    setArraySteps([newArray]);
    setCurrentStep(0);
    generateSortingSteps(newArray);
  };

  // Reset the array to the initial state
  const resetArray = () => {
    setCurrentArray(array);
    setCurrentStep(0);
  };

  // Handles the sorting animation
  const startSorting = () => {
    clearTimeouts();
    executeStep(currentStep);
  };

  // Executes a specific sorting step
  const executeStep = (stepIndex) => {
    if (stepIndex >= arraySteps.length) return;
    setCurrentArray(arraySteps[stepIndex]);
    setColorKey(colorSteps[stepIndex]);
    setCurrentStep(stepIndex + 1);

    const timeout = setTimeout(() => {
      executeStep(stepIndex + 1);
    }, delay);
    setTimeouts((prev) => [...prev, timeout]);
  };

  // Show previous sorting step
  const previousStep = () => {
    if (currentStep === 0) return;
    setCurrentStep(currentStep - 1);
    setCurrentArray(arraySteps[currentStep - 1]);
    setColorKey(colorSteps[currentStep - 1]);
  };

  // Show next sorting step
  const nextStep = () => {
    if (currentStep >= arraySteps.length) return;
    setCurrentStep(currentStep + 1);
    setCurrentArray(arraySteps[currentStep]);
    setColorKey(colorSteps[currentStep]);
  };

  // Handles effect when arraySize, delay, or algorithm changes
  useEffect(() => {
    if (array.length === 0 || array.length !== arraySize) {
      handleRandomArray();
    } else {
      resetArray();
    }
  }, [arraySize, delay, algorithm]);
  useEffect(() => {
    // Cleanup function to clear timeouts when the component unmounts
    return () => {
      clearTimeouts();
    };
  }, []);

  return (
    <div className="app-child">
      <div className="frame">
        <div className="barsDiv container card">
          {currentArray.map((value, index) => (
            <Bar
              key={index}
              index={index}
              length={value}
              color={colorKey[index]}
            />
          ))}
        </div>

        <SortingController
          previousSteps={previousStep}
          nextSteps={nextStep}
          start={startSorting}
          stop={arraySteps.length === currentStep}
          resetSteps={resetArray}
          generate={handleRandomArray}
        />

        {/* Display the sorting steps */}
        <div className="sorting-steps">
          <h3>Initial Array:</h3>
          <div>
            {array.map((value, index) => (
              <span key={index} style={{ marginRight: "5px" }}>
                {value}
              </span>
            ))}
          </div>

          <h3>Steps Count:</h3>
          <div>
            {/* Ensure currentStep is within bounds before accessing arraySteps */}
            {currentStep < arraySteps.length && (
              arraySteps.slice(0, currentStep).map((step, index) => (
                <div key={index}>
                  {step.map((value, i) => (
                    <span key={i} style={{ marginRight: "5px" }}>
                      {value}
                    </span>
                  ))}
                </div>
              ))
            )}
          </div>

          <h3>Current Sorting Step:</h3>
          <div>
            {currentArray.map((value, index) => (
              <span key={index} style={{ marginRight: "5px" }}>
                {value}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortingVisualizer;
