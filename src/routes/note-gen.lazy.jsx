// page for note generation at end of pathway

import "../App.css";

import { useForm } from "../FormContext.jsx";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute('/note-gen')({
    component: NoteGen
})

function NoteGen() {
    const formData = useForm();

    return(
        <div>
            <header className="header">
                <h1>SCiPP Chest Pain Pathway</h1>
            </header>

            <div className="container">
                <h4>Note for Cardiologist</h4>
                <p>This patient is {formData.age} years old.</p>
            </div>
        </div>
    )


}