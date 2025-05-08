// Drop Down Component

import "beercss";

export default function DropDown(props) {
    return(
        <div className="field label suffix border">
            <select value={props.value} onChange={props.onChange}>
                <option>{props.itemone}</option>
                <option>{props.itemtwo}</option>
                <option>{props.itemthree}</option>
                <option>{props.itemfour}</option>
            </select>
            <label>{props.label}</label>
            <i>arrow_drop_down</i>
        </div>
    )
}