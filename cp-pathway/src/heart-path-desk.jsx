import { useState } from "react";
import "./heart-path-desk.css";
import SegmentedButton from "./segmented-button.jsx";

function HeartPath() {
  const cad = useState(true)
  const [score, setScore] = useState(0);

  // Patient History Segmented Button Inputs
  const historyOptions = ['Low','Moderate', 'High'];
  const [selectedHistory, setSelectedHistory] = useState(historyOptions[0]);
  const handleHistoryChange = (value) => {
    setSelectedHistory(value);
    console.log('Selected history:', value);
  };

  // ECG Segmented Button Inputs
  const ecgOptions = ['Normal','Abnormal'];
  const [selectedECG, setSelectedECG] = useState(ecgOptions[0]);
  const handleECGChange = (value) => {
    setSelectedECG(value);
    console.log('Selected ECG:', value);
  };

  // Age Segmented Button Inputs
  const ageOptions = ['< 45','45-60','61+'];
  const [selectedAge, setSelectedAge] = useState(ageOptions[0]);
  const handleAgeChange = (value) => {
    setSelectedAge(value);
    console.log('Selected age:', value);
  };

  return (
    <>
      <h2><u>Heart Score Calculator</u></h2>

      <fieldset>
          <legend>CAD</legend>
          <p>Does the patient have coronary artery disease?</p>
          <label>
            <input type="checkbox" name="cad"/>
            CAD
          </label>
          <label>
            <input type="checkbox" name="cad"/>
            No CAD
          </label>
      </fieldset>

      <h3>Select What Applies</h3>
      <div>
          <fieldset>
              <legend>Suspicion Level from Patient History</legend>
              {/*<p><i>Retrosternal pain, pressure, radiation to jaw/left shoulder/arms, duration 5–15 min, 
              initiated by exercise/cold/emotion, perspiration, nausea/vomiting, reaction on nitrates 
              within mins, patient recognizes symptoms. Low risk features of chest pain include: well 
              localized, sharp, non-exertional, no diaphoresis, no nausea or vomiting, and reproducible
              with palpation.</i></p>*/}
              <SegmentedButton options={historyOptions} onChange={handleHistoryChange} />
          </fieldset>
          
          <fieldset>
              <legend>ECG Results</legend>
              <SegmentedButton options={ecgOptions} onChange={handleECGChange} />
          </fieldset>

          <fieldset>
              <legend>Age</legend>
              <SegmentedButton options={ageOptions} onChange={handleAgeChange} />
          </fieldset>

          <fieldset className = "riskFactors">
              <legend>Risk Factors</legend>
              <label>
                <input type="checkbox" name="riskFactors"/>
                Hypertension <br/>
              </label>
              <label>
                <input type="checkbox" name="riskFactors"/>
                Diabetes Mellitus <br/>
              </label>
              <label>
                <input type="checkbox" name="riskFactors"/>
                Smoking history <br/>
              </label>
              <label>
                <input type="checkbox" name="riskFactors"/>
                Atherosclerotic Disease <br/>
              </label>
              <label>
                <input type="checkbox" name="riskFactors"/>
                Hypercholesterolemia <br/>
              </label>
              <label>
                <input type="checkbox" name="riskFactors"/>
                Obesity (BMI <span>&#62;</span> 30) <br/>
              </label>
              <label>
                <input type="checkbox" name="riskFactors"/>
                Family History of Cardiovascular Disease <br/>
              </label>
          </fieldset>

          <fieldset>
              <legend>Troponin Levels</legend>
              <label>
                <input type="checkbox" name="troponin"/>
                Troponin <span>&#60;</span> 0.04ng/mL
              </label>
              <label>
                <input type="checkbox" name="troponin"/>
                0.04ng/mL <span>&#8804;</span> Troponin <span>&#8804;</span> 0.08ng/mL
              </label>
              <label>
                <input type="checkbox" name="troponin"/>
                0.08 ng/mL <span>&#8804;</span> Troponin
              </label>
          </fieldset>
      </div>
    </>
  );
}

export default HeartPath;