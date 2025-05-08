// Button component

import "beercss";

export default function Button(props) {
    return(
        <button className="border small-round">
            <i>search</i>
            <span>{props.text}</span>
        </button>
    )
}