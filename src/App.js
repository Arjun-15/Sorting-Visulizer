import "./App.css";
import { useState } from "react";
import SortSelection from "./components/SortSelection";
import SortingDropdown from "./components/SortingDropdown";

const App = () => {
  // Replacing state with useState hook
  const [array, setArray] = useState([]);
  const [count, setCount] = useState(7);
  const [delay, setDelay] = useState(100);
  const [algorithm, setAlgorithm] = useState("Bubble Sort");

  const handleArray = (event) => {
    const arrString = event.target.value;
    // Split the string by either ',' or '|', and trim any whitespace
    const temp = arrString.split(/[,|]/).map((num) => num.trim());
    setCount(temp.length);
    // Set the array to the state
    setArray(temp);
  };

  return (
    <div className="app">
      <div className="app-child">
        {/* Count input */}
        <input
          type="number"
          pleaceholder="Enter elements count"
          style={{
            textAlign: "left",
            fontSize: "large",
            width: "10%",
            padding: 5,
            marginLeft: "21px",
            marginTop: "5px",
          }}
          value={count}
          onChange={(event) => {
            if (event.target.value < 100) setCount(event.target.value);
          }}
        />
        <input
          type="number"
          pleaceholder="Enter elements count"
          style={{
            textAlign: "left",
            fontSize: "large",
            width: "15%",
            padding: 5,
            marginLeft: "2px",
            marginTop: "5px",
          }}
          value={delay}
          onChange={(event) => {
            if (event.target.value < 100000) setDelay(event.target.value);
          }}
        />
        <input
          type="number"
          pleaceholder="Enter elements count"
          style={{
            textAlign: "left",
            fontSize: "large",
            width: "98%",
            padding: 5,
            marginLeft: "21px",
            marginTop: "5px",
          }}
          value={array}
          onChange={handleArray}
        />
        {/* Dropdown for sorting algorithm selection */}
        <SortingDropdown
          selectDrop={(name) => {
            setAlgorithm(name);
          }}
          algorithm={algorithm}
        />
      </div>

      <div className="app-child">
        {/* Sorting visualization component */}
        <SortSelection
          Algorithm={algorithm}
          count={count}
          SetArray={array}
          delay={delay}
          minNumber={0}
          maxNumber={200}
          handleArray={(array) => {
            setArray(array);
          }}
        />
      </div>
    </div>
  );
};

export default App;
