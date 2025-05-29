// User Input Component

import "beercss";

export default function Input(props) {
    return(
        <div className="field label border">
            <input 
            type= "number"
            step="any"
            value = {props.value}
            onChange={props.onChange} 
            disabled={props.disabled}
            style={{ color: '#000' }}
            />
            <label>{props.label || "Value"}</label>
        </div>
    )
}