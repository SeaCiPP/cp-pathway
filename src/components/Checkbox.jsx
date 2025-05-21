// Checkbox Component

import "beercss";

export default function Checkbox(props) {
  return(
    <label className="checkbox">
      <input type="checkbox"
      checked={props.checked}
      onChange={props.onChange}
      />
      <span>{props.label}</span>
    </label>
  );
}