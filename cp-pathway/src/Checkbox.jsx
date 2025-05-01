// Checkbox Component

import "beercss";

export default function Checkbox(props) {
  return(
    <label className="checkbox">
      <input type="checkbox"/>
      <span>{props.text}</span>
    </label>
  );
}