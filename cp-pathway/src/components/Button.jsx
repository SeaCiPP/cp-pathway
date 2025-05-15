// Button component

import "beercss";

export default function Button(props) {
    return(
        <button className="border small-round">
            <i>{props.image}</i>
            <span>{props.text}</span>
        </button>
    )
}