import React, { useState } from 'react';
import "./segmented-button.css";

function SegmentedButton({ options, onChange }) {
  const [selectedValue, setSelectedValue] = useState(options[0]);

  {/*const handleButtonClick = (value) => {
    setSelectedValue(value);
    onChange(value);
  };*/}

  const handleButtonClick = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <div className="segmented-button">
      {options.map((option) => (
        <button
          key={option}
          value={option}
          className={`segment-button ${selectedValue === option ? 'selected' : ''}`}
          onClick={() => handleButtonClick(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default SegmentedButton;


{/* EXAMPLE IMPLEMENTATION
  const options = ['A', 'B', 'C', 'D', 'E'];
  const [selectedValue, setSelectedValue] = useState(options[0]);

  const handleSegmentChange = (value) => {
    setSelectedValue(value);
    console.log('Selected value:', value);
  };

  return (
    <>
      <SegmentedButton options={options} onChange={handleSegmentChange} />
    </>
  );
*/}