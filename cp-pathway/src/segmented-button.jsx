import React, { useState } from 'react';
import "./segmented-button.css";
import "beercss";

export default function SegmentedButton(props) {
  return (
    <div className="segmented-button">
      {props.options.map((option, index) => (
        <button
          key={index}
          value={option}
          checked={props.selected === props.option}
          onClick={props.onChange}
        >
          {option}
        </button>
      ))}
    </div>
  );
}