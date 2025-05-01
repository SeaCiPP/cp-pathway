// Drop Down Component

import "beercss";

export default function DropDown(props) {
    return(
        <div className="field suffix fill border">
            <select>
                <option>{props.itemone}</option>
                <option>{props.itemtwo}</option>
                <option>{props.itemthree}</option>
            </select>
            <i>arrow_drop_down</i>
            <span className="helper">{props.helper}</span>
        </div>
    )
}