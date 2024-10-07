import { useEffect, useState } from "react";
import "./Bar.css"; // Ensure this file has the appropriate styles
import { useSortingValue } from "../sortingContext";

function Bar({ index, length, color }) {
  const [len, setLen] = useState(length);
  const {minNumber,maxNumber,changeArray} = useSortingValue();

  useEffect(() => {
    setLen(length); // Update length when prop changes
  }, [length]);

  const inputStyle = {
    position: "relative",
    top: -Math.floor(len / 2),
    width: "100%", // Make input full width of the bar
    border: "none",
    background: "none",
    textAlign: "center", // Center text
    fontWeight: "bold",
    color: "black",
    rotate: "-90deg",
  };

  const colors = [
    ["rgba(61,90,241,0.5)", "rgba(61,90,241,0.2)"],
    ["rgba(255,48,79,1)", "rgba(255,48,79,0.5)"],
    ["rgba(131,232,90,0.5)", "rgba(131,232,90,0.2)"],
  ];

  const barStyle = {
    height: `${len}px`,
    backgroundColor: colors[color][0],
    boxShadow: `5px 5px 50px 5px ${colors[color][1]}`,
    transition: "1s",
    background: `radial-gradient(circle, #fff 0%, ${colors[color][0]} 100%)`,
  };
  const changeValue = (val) => {
    if (val === "") {
      setLen(0);
      changeArray(index, 0);
    } else {
      val = Math.max(minNumber, Math.min(maxNumber, parseInt(val))); // Clamp value between 0 and max
      setLen(val);
      changeArray(index, val);
    }
  }
  return (
    <div className="bar" style={barStyle}>
      <input
        type="text"
        style={inputStyle}
        className="input"
        value={len}
        onChange={(e) => changeValue(e.target.value)}
      />
    </div>
  );
}

export default Bar;
