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
            />
            <label>Value</label>
        </div>
    )
}