// Button component
import { Link } from "@tanstack/react-router";

export default function Button(props) {
    const isStemiButton = props.text === "Use Institution Specific STEMI Protocol";
    
    const buttonContent = (
        <button
            onClick = {props.onClick} 
            style={{
                ...props.style,
                ...(isStemiButton && {
                    backgroundColor: "#ff0000",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    width: "100%",
                    maxWidth: "400px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px"
                })
            }}
        >
            <i style={{ color: isStemiButton ? "white" : "inherit" }}>{props.image}</i>
            <span style={{ color: isStemiButton ? "white" : "inherit" }}>{props.text}</span>
        </button>
    );

    return props.toPage ? (
        <Link to={props.toPage}>
            {buttonContent}
        </Link>
    ) : buttonContent;
}