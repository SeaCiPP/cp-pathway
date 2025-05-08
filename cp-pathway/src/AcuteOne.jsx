// First acute chest pain pathway page

import { useState } from "react";
import "./App.css"; // CSS for styling

import Radio from "./components/Radio";
import DropDown from "./components/DropDown";
import Input from "./components/Input";
import Button from "./components/Button";

import { troponinTests } from './troponinTests.js';

export default function AcuteOne() {
   
    // for all user inputs
    const [formData, setFormData] = useState({
        ecg: "Option 1: Normal ECG", //
        age: "", // 
        duration: "", // 
        tropTest: "BeckmanCoulter",
        tropZero: "",
        tropType: "", //
        tropOne: ""
    });
    
    // saving categories for heart score variables 
    const [categories, setCategories] = useState({
        tropZero: null,
        tropOne: null,
        tropThree: null
    })

    // handles changes to form data (numeric)
    const handleNumChange = (field) => (e) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setFormData((prev) => ({
                ...prev, [field]: value, // updating the previous value for that field
            }));
        }
    };
    
    // handles to troponin levels & assigns categories 
    const handleTropChange = (field) => (e) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setFormData((prev) => ({
                ...prev, [field]: value, // updating the previous value for that field
            }));
        }

        let category = null;
        category = checkTrop(field, value);

        if (category !== null) {
            setCategories((prev) => ({ ...prev, [field]: category }));
        }
    };

    // returns categories for troponin levels
    const checkTrop = (field, trop) => {
        const values = troponinTests[formData.tropTest];

        // determine which column in the values to use 
        if (field === "tropZero") {
            if (trop < values[0]) {
                if (formData.duration > 3) {
                    // low risk -- exit ROUTE
                }
                return 0; // very low
            } else if (trop >= values[0] && trop <= values[3]) {
                return 1; // intermediate
            } else if (trop >= values[3]) {
                // high risk -- exit ROUTE
            }
        } else if (field === "tropOne") {
            trop = trop - formData.tropZero; // determine one hr delta
            if (trop < values[2]) {
                if (categories.tropZero === 0) {
                    // low risk -- exit ROUTE
                }
                return 1;
            } else if (trop >= values[4]) {
                // high risk -- exit ROUTE
            }
        }
    };

    // handles ecg selection
    const handleEcgChange = (e) => {
        const value = e.target.value;
        setFormData((prev) => ({...prev, ecg: value,}));

        if (value === "Option 4: STEMI") {
            // activate STEMI pathway -- exit ROUTE
        }
    }

    // handles other non-numeric inputs
    const handleChange = (field) => (e) => {
        const value = e.target.value;
        setFormData((prev) => ({ ...prev, [field]: value,}));
      };




    // remove the header later... it will be a component
    return (
        <div>
            <header className="header">
                <h1>SCiPP Chest Pain Pathway</h1>
            </header>

            <div className="container">
                <h4>Acute Chest Pain</h4>
                <h5>Chest Pain Checklist</h5>

                <p>Ensure vitals have been taken.</p>

                <p>ECG Result</p>
                <DropDown 
                value = {formData.ecg} onChange = {handleEcgChange}
                itemone = "Option 1: Normal ECG"
                itemtwo = "Option 2: Non-specific repolarization abnormalities"
                itemthree = "Option 3: ST segment depressions (not due to LBBB/LVH)"
                itemfour = "Option 4: STEMI"
                label = "Select"
                />

                <div>
                    <p>Age</p>
                    <Input
                    value = {formData.age}
                    onChange = {handleNumChange("age")}
                    />

                    <p>Duration of Chest Pain (in hours)</p>
                    <Input
                    value = {formData.duration}
                    onChange = {handleNumChange("duration")}
                    />
                </div>

                <div>
                    <p>Available Troponin Test</p>
                    <DropDown value = {formData.tropTest} onChange = {handleChange("tropTest")}
                    itemone = "BeckmanCoulter"
                    itemtwo = "Roche"
                    itemthree = "Abbott"
                    itemfour = "Siemens"
                    label = "Select"
                    />

                    <div className="radio-group">
                        <Radio 
                        value="hs"
                        name="trop"
                        label="HS-Troponin (units)"
                        selected={formData.tropType === "hs"}
                        onChange={handleChange("tropType")}
                        />
                        <Radio 
                        value="it"
                        name="trop"
                        label="Troponin I/T (units)"
                        selected={formData.tropType === "it"}
                        onChange={handleChange("tropType")}
                        />
                    </div>
                    <p>Troponin Level (time zero)</p>
                        <Input
                        value = {formData.tropZero}
                        onChange = {handleTropChange("tropZero")}
                        disabled={!formData.tropType}
                        />
                        <p>Your troponin level is {categories.tropZero || "not set"}</p>
                </div>   

                {formData.tropType === "hs" && (categories.tropZero === 0 || categories.tropZero === 1)? (
                    <>
                        <div className="input-group">
                            <p>Troponin at 1 Hour</p>
                            <Input
                            value = {formData.tropOne}
                            onChange = {handleTropChange("tropOne")}
                            />
                        </div>
                        {categories.tropOne === 1 && (
                            <>
                                <p>HEART Score</p>
                                <div style={{ display: "flex" }}>
                                    <div style={{ marginLeft: "auto" }}>
                                        <Button 
                                        text="Calculate"
                                        /> 
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                ) : formData.tropType === "it" ? (
                    <>
                        <p>HEART Score</p>
                        <div style={{ display: "flex" }}>
                            <div style={{ marginLeft: "auto" }}>
                                <Button 
                                text="Calculate"
                                /> 
                            </div>
                        </div>
                    </>
                ) : null } 
            </div>
        </div>
    )
}