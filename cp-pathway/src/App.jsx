import { useState } from "react";
import "./heart-path-desk.css";
import SegmentedButton from "./segmented-button.jsx";
import Checkboxes from "./checkboxes.jsx";

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

  // Risk Factor Checkbox List
  const checkTitle = 'Risk Factors';
  const checkOptions = ['Hypercholesterolemia',
                        'Hypertension',
                        'Diabetes Mellitus',
                        'Obesity (BMI > 30kg/m^2)',
                        'Smoking History (>3mo usage)',
                        'Family History of CVD',
                        'History of atherosclerotic disease',
                        'Peripheral Artery Disease',
                        'Obstructive CAD',
                        'Non-obstructive CAD',];

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
              <label htmlFor="age">Age: </label>
                <input id="age" type="number" name="age" />
          </fieldset>

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

          <Checkboxes title={checkTitle} options={checkOptions}/>

      </div>
    </>
  );
}

export default HeartPath;