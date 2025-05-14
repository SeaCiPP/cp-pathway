// HEART or HEAR score page

import { useState } from "react";
import "./App.css";

import SegmentedButton from "./components/SegmentedButton";
import Checkbox from "./components/Checkbox";
import Input from "./components/Input";

import { useForm } from "./FormContext.jsx";


export default function HeartScore() {
  const { formData, setFormData } = useForm();

  const [selected, setSelected] = useState("");

  return(
    <div>
      <header className="header">
        <h1>SCiPP Chest Pain Pathway</h1>
      </header>

      <div className="container">
        <h4>Acute Chest Pain</h4>
        <h5>Heart Score Calculation</h5>

        <p>Age:{formData.age}</p>
        <p>Troponin:</p>

        <p1>Suspicion Level from Patient History</p1>
        <p><strong>**Includes: </strong>Retrosternal pain, pressure, radiation to jaw/left shoulder/arms, duration 5–15 min, initiated by exercise/cold/emotion, perspiration, nausea/vomiting, reaction on nitrates within mins, patient recognizes symptoms.</p>
        <p><strong>**Low risk features include:</strong> well localized, sharp, non-exertional, no diaphoresis, no nausea or vomiting, and reproducible with palpation.</p>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <p></p>
          <SegmentedButton 
          selected={selected}
          onChange{setSelected}
          />
          <p></p>
        </div>

        <div className="checkboxes">
          <p1>Risk Factors</p1>
          <Checkbox 
          text = "Hypercholesterolemia"
          />
          <Checkbox 
          text = "Hypertension" 
          />
          <Checkbox 
          text = "Diabetes Mellitus"
          />
          <Checkbox 
          text = "Obesity (BMI > 30 kg/m2)"
          />
          <Checkbox 
          text = "Smoking History (>3mo Usage)"
          />
          <Checkbox
          text = "Family History of CVD"
          />
          <Checkbox
          text = "History of Atherosclerotic Disease"
          />
          <Checkbox
          text = "Peripheral Arterial Disease"
          />
          <Checkbox
          text = "Obstructive CAD"
          />
          <Checkbox
          text = "Non-Obstructive CAD"
          />
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ marginLeft: "auto" }}>
              <p>Heart Score:</p>
          </div>
        </div>

      </div>
    </div>

  )

}
