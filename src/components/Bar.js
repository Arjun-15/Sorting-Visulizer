import { useEffect, useState } from 'react';
import './Bar.css';

function Bar({ index, length, color, changeArray ,max}) {
  const [len, setLen] = useState(length);

  useEffect(() => {
    setLen(length);  // Update len whenever length prop changes
  }, [length]);

  const inputStyle = {
    position: 'relative',
    top: Math.floor(len / 2) - 12,
    width: len,
    left: -Math.floor(len / 2) + 13,
    border: 'none',
    background: 'none',
  };

  const colors = [
    ['rgba(61,90,241,0.5)', 'rgba(61,90,241,0.2)'],
    ['rgba(255,48,79,1)', 'rgba(255,48,79,0.5)'],
    ['rgba(131,232,90,0.5)', 'rgba(131,232,90,0.2)'],
  ];

  const front_bottom = {
    transform: `translateY(${max - len}px) rotateX(-90deg)`,
    backgroundColor: `${colors[color][0]}`, // Corrected array access
    boxShadow: `5px 5px 50px 5px ${colors[color][1]}`, // Corrected box-shadow
    transition: '0.3s',
  };

  const right_left = {
    height: `${len}px`,
    transform: `translateY(${max - len}px)`,
    backgroundColor: `${colors[color][0]}`, // Corrected array access
    boxShadow: `5px 5px 50px 5px ${colors[color][1]}`, // Corrected box-shadow
    transition: '0.3s',
  };

  const quantity = { position: 'relative', top: 225 };

  const handleChange = (e) => {
    let val = e.target.value;
    if (val === '') {
      setLen(0);
      changeArray(index, 0);
    } else {
      val = parseInt(val);
      if (val > max) {
        setLen(max);
        changeArray(index, max);
      } else {
        setLen(val);
        changeArray(index, val);
      }
    }
  };

  const increment = () => {
    setLen((prev) => Math.min(prev + 1, max)); // Ensure max is 200
    changeArray(index, len + 1);
  };

  const decrement = () => {
    setLen((prev) => Math.max(prev - 1, 0)); // Ensure min is 0
    changeArray(index, len - 1);
  };

  return (
    <>
      <div className="bar">
        <div className='side top'></div>
        <div className='side bottom' style={front_bottom}></div>
        <div className='side right'>
          <div className='color-bar right-color-bar' style={right_left}></div>
        </div>
        <div className='side left'>
          <div className='color-bar left-color-bar' style={right_left}></div>
        </div>
        <div className='side front'>
          <div className='color-bar front-color-bar' style={right_left}>
            <input
              type="number"
              style={inputStyle}
              className='input'
              value={len}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className='side back'>
          <div className='color-bar back-color-bar' style={front_bottom}></div>
        </div>
        <div className='quantity-nav'>
          <div className='quantity-button quantity-up' style={quantity} onClick={increment}>+</div>
          <div className='quantity-button quantity-down' style={quantity} onClick={decrement}>-</div>
        </div>
      </div>
    </>
  );
}

export default Bar;
