// Button component
import { Link } from "@tanstack/react-router";
import "beercss";

export default function Button(props) {
    return(
        <Link to={props.toPage}>
            <button className="border small-round">
                <i>{props.image}</i>
                <span>{props.text}</span>
            </button>
        </Link>
    )
}