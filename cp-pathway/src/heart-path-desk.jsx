import { useState } from "react";
import "./heart-path-desk.css";

function HeartPath() {
  const cad = useState(true)
  const [score, setScore] = useState(0);

  return (
    <>
      <h1>Heart Path</h1>

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
              <legend>Risk Factors</legend>
              <label>
                <input type="checkbox" name="riskFactors"/>
                Hypertension
              </label>
              <label>
                <input type="checkbox" name="riskFactors"/>
                Diabetes Mellitus
              </label>
              <label>
                <input type="checkbox" name="riskFactors"/>
                Patient has smoking history
              </label>
              <label>
                <input type="checkbox" name="riskFactors"/>
                Atherosclerotic Disease
              </label>
              <label>
                <input type="checkbox" name="riskFactors"/>
                Hypercholesterolemia
              </label>
              <label>
                <input type="checkbox" name="riskFactors"/>
                Obesity (BMI <span>&#62;</span> 30)
              </label>
              <label>
                <input type="checkbox" name="riskFactors"/>
                Family History of Cardiovascular Disease
              </label>
          </fieldset>
          
          <fieldset>
              <legend>EKG Points</legend>
              <label>
                <input type="checkbox" name="ekg"/>
                No ST depression but LBBB, LVH, repolarization changes (ex: digoxin)
              </label>
              <label>
                <input type="checkbox" name="ekg"/>
                ST depression/elevation not due to LBBB, LVH, or digoxin
              </label>
          </fieldset>

          <fieldset>
              <legend>History Points</legend>
              <p>Retrosternal pain, pressure, radiation to jaw/left shoulder/arms, duration 5–15 min, 
              initiated by exercise/cold/emotion, perspiration, nausea/vomiting, reaction on nitrates 
              within mins, patient recognizes symptoms. Low risk features of chest pain include: well 
              localized, sharp, non-exertional, no diaphoresis, no nausea or vomiting, and reproducible
              with palpation.</p>
              <label>
                <input type="checkbox" name="history"/>
                Slightly suspicious
              </label>
              <label>
                <input type="checkbox" name="history"/>
                Moderately suspicious
              </label>
              <label>
                <input type="checkbox" name="history"/>
                Highly suspicious
              </label>
          </fieldset>

          <fieldset>
              <legend>Age</legend>
              <label>
                <input type="checkbox" name="age"/>
                Under 45
              </label>
              <label>
                <input type="checkbox" name="age"/>
                45 - 60
              </label>
              <label>
                <input type="checkbox" name="age"/>
                60+
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