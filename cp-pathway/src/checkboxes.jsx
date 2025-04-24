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

    onChange(checkedItems);
  };

  return (
    <fieldset>
        <legend>{title} </legend>
      {options.map((option) => (
        <label>
          <input
            type='checkbox'
            value={option}
            checked={checkedItems.includes(option)}
            onChange={handleCheckboxChange}
          />
          {option}<br/>
        </label>
      ))}
    </fieldset>
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