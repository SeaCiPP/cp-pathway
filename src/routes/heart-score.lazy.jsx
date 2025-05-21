// HEART or HEAR score page

import { useState } from "react";
import "../App.css";

import SegmentedButton from "../components/SegmentedButton.jsx";
import Checkbox from "../components/Checkbox.jsx";
import Button from "../components/Button.jsx";

import { useForm } from "../FormContext.jsx";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute('/heart-score')({
  component: HeartScore
})

function HeartScore() {
  const { formData, setFormData } = useForm();

  // to handle the risk checkboxes
  const [items, setItems] = useState([
    { label: "Hypercholesterolemia", checked: false },
    { label: "Hypertension", checked: false },
    { label: "Diabetes Mellitus", checked: false },
    { label: "Obesity (BMI > 30 kg/m2)", checked: false },
    { label: "Smoking History (>3mo Usage)", checked: false },
    { label: "Family History of CVD", checked: false },
    { label: "History of Atherosclerotic Disease", checked: false },
    { label: "Peripheral Arterial Disease", checked: false },
    { label: "Obstructive CAD", checked: false },
    { label: "Non-Obstructive CAD", checked: false },
  ]);

  const handleRisk = (index) => {
    const updated = [...items];
    updated[index].checked = !updated[index].checked;
    setItems(updated);
  }
  const checkedCount = items.filter((item) => item.checked).length;

  const handleSegChange = (value) => {
    setFormData((prev) => ({ ...prev, history: value }));
  };


  // determine points for each thing in heart score
  // history, ekg, age, riskfactor, trop
  // H 
  let historyPoints = 0;
  if (formData.history == "Low") {
      historyPoints = 0;
  } else if (formData.history == "Medium") {
      historyPoints = 1;
  } else if (formData.history == "High") {
      historyPoints = 2;
  }
  
  // E
  let ecgPoints = 0;
  if (formData.ecg === "Option 1: Normal ECG") {
    ecgPoints = 0;
  } else if (formData.ecg === "Option 2: Non-specific repolarization abnormalities") {
    ecgPoints = 1;
  } else if (formData.ecg === "Option 3: ST segment depressions (not due to LBBB/LVH)") {
    ecgPoints = 2;
  }

  // A
  let agePoints = 0;
  if (formData.age < 45) {
        agePoints = 0;
    } else if (formData.age >= 45 && formData.age <= 60) {
        agePoints = 1;
    } else if (formData.age > 60) {
        agePoints = 2;
  }

  // R
  let riskPoints = 0;
  if (checkedCount == 0) {
        riskPoints = 0;
    } else if (checkedCount == 1 || checkedCount == 2) {
        riskPoints = 1;
    } else if (checkedCount >= 3) {
        riskPoints = 2;
    }

  // T
  let tropPoints = 0; 
  let trop;
  if (formData.tropType === "hs") {
    tropPoints = 0; // HEAR score if hs trop used 
    trop = "N/A";
  } else { // tropType is I/T
      trop = Math.max(formData.tropZero, formData.tropThree);
      if (trop < 0.04) {
        tropPoints = 0;
    } else if (trop >= 0.04 && trop <= 0.08) {
        tropPoints = 1;
    } else if (trop >= 0.08) {
        tropPoints = 2;
    }
  }

  let heartScore = historyPoints + ecgPoints + agePoints + riskPoints + tropPoints;
  
  return(
    <div>
      <header className="header">
        <h1>SCiPP Chest Pain Pathway</h1>
      </header>

      <div className="container">
        <h4>Acute Chest Pain</h4>
        <h5>Heart Score Calculation</h5>

        <div className="row-between">
          <p>Age:
            <span className="gray-box">{formData.age}</span>
          </p>
          <p>Troponin:
            <span className="gray-box">{trop}</span>
          </p>
        </div>

        <p1>Suspicion Level from Patient History</p1>
        <p><strong>**Includes: </strong>Retrosternal pain, pressure, radiation to jaw/left shoulder/arms, duration 5–15 min, initiated by exercise/cold/emotion, perspiration, nausea/vomiting, reaction on nitrates within mins, patient recognizes symptoms.</p>
        <p><strong>**Low suspicion features include:</strong> well localized, sharp, non-exertional, no diaphoresis, no nausea or vomiting, and reproducible with palpation.</p>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <p></p>
          <SegmentedButton 
           selected={formData.history} 
           onChange={handleSegChange} 
           />
          <p></p>
        </div>

        <div style={{ paddingTop: "15px" }}>
          <p1>Risk Factors</p1>
          <div className="checkboxes">
            {items.map((item, idx) => (
              <Checkbox
                key={idx}
                label={item.label}
                checked={item.checked}
                onChange={() => handleRisk(idx)}
              />
            ))}
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ marginLeft: "auto" }}>
              <h4>Heart Score:
                <span className="gray-box">{heartScore}</span>
              </h4>
          </div>
        </div>

        <Button
        image= "check"
        text= "Done"
        />

        <div className ="back-button">
          <Button
          image="Home"
          text="Back"
          toPage="/"
          />
        </div>

      </div>
    </div>
  )
}
