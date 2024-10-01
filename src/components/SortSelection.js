import "./SortSelection.css";
import { Component, useEffect, useState } from "react";
import Bar from "./Bar";
import { NextIcon, PlayIcon, PreviousIcon } from "./Icon";
import { NameOfSortingAlgorithm } from "./SortingDropdown";

const SortSelection = (props) => {
  // variable initialization
  const [array, setArray] = useState([]);
  const [arraySteps, setArraySteps] = useState([]);
  const [colorKey, setColorKey] = useState([]);
  const [colorSteps, setColorSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState([]);
  const [timeouts, setTimeouts] = useState([]);

  // props variable
  const {
    Algorithm,
    count,
    SetArray,
    delay,
    handleArray,
    minNumber,
    maxNumber,
  } = props;

  const clearTimeouts = () => {
    timeouts.forEach((timeout) => clearTimeout(timeout));
    setTimeouts([]);
  };

  const clearColorKey = () => {
    let blankKey = new Array(count).fill(0);
    setColorKey(blankKey);
    setColorSteps([blankKey]);
  };

  const generateSteps = async () => {
    const steps = arraySteps.slice();
    const colorsteps = colorSteps.slice();
    NameOfSortingAlgorithm[Algorithm](array.slice(), 0, steps, colorsteps);
    await setArraySteps(steps);
    await setColorSteps(colorsteps);
  };
  const generateRandomArray = async () => {
    clearTimeouts();
    clearColorKey();
    console.log(array);
    console.log(SetArray);
    const temp =
      array.length !== 0
        ? SetArray
        : generateArray(count, minNumber, maxNumber);
    await setArray(temp);
    await handleArray(temp);
    await setArraySteps([temp]);
    await setCurrentStep(0);
    generateSteps();
  };
  const changeArray = (index, value) => {
    array[index] = value;
  };
  useEffect(() => {
    // Algorithm, Count, SetArray, Delay, handleArray
    generateRandomArray();
  }, [SetArray, count, delay, Algorithm]);

  const start = () => {
    clearTimeouts();
    let index = 0;
    while (index < arraySteps.length - currentStep) {
      const timeout = setTimeout(() => {
        setArray(arraySteps[currentStep]);
        setColorKey(colorSteps[currentStep]);
        setCurrentStep(currentStep + 1);
      }, delay * index);
      timeouts.push(timeout);
      index++;
    }
  };
  const previousSteps = () => {
    if (currentStep === 0) return;
    setCurrentStep(currentStep - 1);
    setArray(arraySteps[currentStep]);
    setColorKey(colorSteps[currentStep]);
  };
  const nextSteps = () => {
    if (currentStep >= array.length) return;
    setCurrentStep(currentStep + 1);
    setArray(arraySteps[currentStep]);
    setColorKey(colorSteps[currentStep]);
  };

  const bars = array.map((value, index) => (
    <Bar
      key={index}
      index={index}
      length={value}
      max={maxNumber}
      color={colorKey[index]}
      changeArray={() => changeArray()}
    />
  ));
  const playButton =
    arraySteps.length === currentStep ? (
      <button className="controller" onClick={generateRandomArray}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/6119/6119650.png"
          alt="Reset Icon"
          width={30}
        />
      </button>
    ) : (
      <button className="controller" onClick={start}>
        <PlayIcon />
      </button>
    );

  return (
    <>
      <div className="frame">
        <div className="barsDiv container card">{bars}</div>
      </div>
      <div className="control-panel">
        <div className="control-buttons">
          <button className="controller" onClick={previousSteps}>
            <PreviousIcon />
          </button>
          {playButton}
          <button className="controller" onClick={nextSteps}>
            <NextIcon />
          </button>
        </div>
      </div>
      <div className="panel"></div>
    </>
  );
};

const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};
const generateArray = (count, min, max) => {
  let temp = new Array();
  for (let i = 0; i < count; i++) {
    temp.push(generateRandomNumber(min, max));
  }
  return temp;
};

export default SortSelection;
