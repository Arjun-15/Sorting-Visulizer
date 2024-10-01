import './App.css';
import { useState } from 'react';
import SortSelection from './components/SortSelection';
import SortingDropdown from './components/SortingDropdown';
import { StyledInput } from './components/Icon';

const App = () => {
  // Replacing state with useState hook
  const [array, setArray] = useState([4,6,2,8]);
  const [count, setCount] = useState(7);
  const [delay, setDelay] = useState(100);
  const [algorithm, setAlgorithm] = useState('Bubble Sort');

  const handleArray = (event) =>{
    const arrString = event.target.value;
    // Split the string by either ',' or '|', and trim any whitespace
    const temp = arrString.split(/[,|]/).map(num => num.trim());
    setCount(temp.length);
    // Set the array to the state
    setArray(temp);
  }

  return (
    <div className='app'>
      <div className='app-child'>
      
        {/* Count input */}
        <StyledInput
          type="number"
          placeholder="Enter element count."
          value={count}
          onChange={(event) => {if(event.target.value < 100) setCount(event.target.value);}}
          width={'10%'}
          marginLeft={"21px"}
          marginTop={'5px'}
        />
        <StyledInput
          type="number"
          placeholder="Enter element delay."
          value={delay}
          onChange={(event) => {if(event.target.value < 100000) setDelay(event.target.value);}}
          marginLeft={"2px"}
          width={'15%'}
          marginTop={'5px'}
        />
        <StyledInput
          type="text"
          placeholder="Enter element count."
          value={array}
          onChange={handleArray}
          marginLeft={"21px"}
          marginTop={'5px'}
        />
        {/* Dropdown for sorting algorithm selection */}
        <SortingDropdown selectDrop={(name)=> {setAlgorithm(name);}} algorithm={algorithm} />
      </div>
      
      <div className='app-child'>
        {/* Sorting visualization component */}
        <SortSelection algorithm={algorithm} count={count} array={array} delay={delay} handleArray={(array)=>{setArray(array)}}/>
      </div>
    </div>
  );
};

export default App;
