// First acute chest pain pathway page

import { useState } from "react";

import Checkbox from "./Checkbox";
import Radio from "./Radio";
import DropDown from "./Dropdown";
import Input from "./Input";
import Button from "./Button";

export default function AcuteOne() {
    const [selected, setSelected] = useState(""); // State to track selected value
    
    const handleChange = (e) => {
        setSelected(e.target.value); // Updates the selected value when a radio button is clicked
    };

    return (
        <div className = "">
            <h4>Acute Chest Pain</h4>
            <h5>Chest Pain Checklist</h5>

            <Checkbox 
            text = "Vitals Taken?"
            />

            <DropDown 
            itemone = "boop"
            itemtwo = "bop"
            itemthree = "bow"
            label = "ECG Result"
            />

            <div>
                <p>Age</p>
                <Input/>
                <p>Duration of Chest Pain (in hours)</p>
                <Input/>
                <p>Troponin Level (time zero)</p>
                <Input/>
            </div>

            <div>
                <Radio 
                value="hs"
                name="trop"
                label="HS-Troponin (units)"
                selected={selected}
                onChange={handleChange}
                />
                <Radio 
                value="it"
                name="trop"
                label="Troponin I/T (units)"
                selected={selected}
                onChange={handleChange}
                />
            </div>

            <div>
                <p>Troponin at 1 Hour</p>
                <Input/>
                <p>HEART Score</p>
                <Input/>
            </div>

            <Button />
        </div>
    )
}