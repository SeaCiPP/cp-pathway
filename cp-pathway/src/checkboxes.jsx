import React, { useState } from 'react';
import "./checkboxes.css";

function Checkboxes({ title, options }) {
  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setCheckedItems([...checkedItems, value]);
    } else {
      setCheckedItems(checkedItems.filter((item) => item !== value));
    }
  };

  return (
    <>
        <legend>{title} </legend>
      {options.map((option, index) => (
        <label>
          <input
            key={index}
            type='checkbox'
            value={option}
            checked={checkedItems.includes(option)}
            onChange={handleCheckboxChange}
          />
          {option}<br/>
        </label>
      ))}
    </>
  );
}

export default Checkboxes;


{/* EXAMPLE IMPLEMENTATION
  const checkTitle = 'Sample Checkbox Title';
  const checkOptions = ['A', 'B', 'C', 'D', 'E'];

  return (
    <>
      <Checkboxes title={checkTitle} options={checkOptions}/>
    </>
  );
*/}