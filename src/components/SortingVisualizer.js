import "./SortingVisualizer.css";
import { useEffect, useState } from "react";
import AlgorithmSelector from "./sortingComponent/AlgorithmSelector";
import SortingController, {
  NameOfSortingAlgorithm,
} from "./sortingComponent/SortingController";
import Bar from "./sortingComponent/Bar";

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [arraySteps, setArraySteps] = useState([]);
  const [colorKey, setColorKey] = useState([]);
  const [colorSteps, setColorSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeouts, setTimeouts] = useState([]);
  const [count, setCount] = useState(11); // Default count
  const [delay, setDelay] = useState(500); // Default delay
  const [minNumber, setMinNumber] = useState(1);
  const [maxNumber, setMaxNumber] = useState(100);
  const [algorithm, setAlgorithm] = useState("Insertion Sort");
  const [currentArray, setCurrentArray] = useState([]); // To show current sorting step

  const clearTimeouts = () => {
    timeouts.forEach((timeout) => clearTimeout(timeout));
    setTimeouts([]);
  };

  const clearColorKey = () => {
    const blankKey = new Array(count).fill(0);
    setColorKey(blankKey);
    setColorSteps([blankKey]);
  };

  const generateSteps = () => {
    if (array.length === 0) return;
    const steps = [];
    const colorsteps = [];
    NameOfSortingAlgorithm[algorithm](array.slice(), 0, steps, colorsteps);
    setArraySteps(steps);
    setColorSteps(colorsteps);
  };

  const generateRandomArray = () => {
    clearTimeouts();
    clearColorKey();
    const temp = generateArray(count, minNumber, maxNumber);
    setArray(temp);
    setCurrentArray(temp);
    setArraySteps([temp]);
    setCurrentStep(0);
    generateSteps();
  };

  const changeArray = (index, value) => {
    const newArray = [...array];
    newArray[index] = value;
    setArray(newArray);
    setCurrentArray(newArray);
  };

  const resetArray = () => {
    setCurrentArray(array);
    setCurrentStep(0);
  };

  useEffect(() => {
    if (array.length === 0) {
      generateRandomArray(); // Generate a random array on component mount
    } else {
      resetArray();
    }
  }, [count, delay, algorithm]); // Rerun when count changes

  const start = () => {
    clearTimeouts();
    const executeStep = async (stepIndex) => {
      if (stepIndex >= arraySteps.length) return;
      setCurrentArray(arraySteps[stepIndex]);
      setColorKey(colorSteps[stepIndex]);
      setCurrentStep(stepIndex + 1);
      console.log(stepIndex, arraySteps[stepIndex]);
      const timeout = setTimeout(() => {
        executeStep(stepIndex + 1);
      }, delay);
      setTimeouts((prev) => [...prev, timeout]);
    };
    executeStep(currentStep);
  };

  const previousSteps = () => {
    if (currentStep === 0) return;
    setCurrentStep(currentStep - 1);
    setCurrentArray(arraySteps[currentStep - 1]);
    setColorKey(colorSteps[currentStep - 1]);
  };

  const nextSteps = () => {
    if (currentStep >= arraySteps.length) return;
    setCurrentStep(currentStep + 1);
    setCurrentArray(arraySteps[currentStep]);
    setColorKey(colorSteps[currentStep]);
  };

  return (
    <div className="app-child">
      <AlgorithmSelector
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        count={count}
        setCount={setCount}
        delay={delay}
        setDelay={setDelay}
      />

      <div className="frame">
        <div className="barsDiv container card">
          {currentArray.map((value, index) => (
            <Bar
              key={index}
              index={index}
              length={value}
              max={maxNumber}
              color={colorKey[index]}
              changeArray={changeArray}
            />
          ))}
        </div>

        <SortingController
          previousSteps={previousSteps}
          nextSteps={nextSteps}
          start={start}
          stop={arraySteps.length === currentStep}
          resetSteps={resetArray}
          generate={generateRandomArray}
        />

        {/* Display the sorting steps */}
        <div className="sorting-steps">
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

const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const generateArray = (count, min, max) => {
  const temp = [];
  for (let i = 0; i < count; i++) {
    temp.push(generateRandomNumber(min, max));
  }
  return temp;
};

export default SortingVisualizer;
