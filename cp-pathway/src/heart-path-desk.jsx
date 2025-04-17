import { useState } from "react";
import "./heart-path-desk.css"; // need to change this to import correct corresponding heart-path stylesheet

function HeartPath() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Heart Path</h1>

      <h3>"toggle button" CAD</h3>
      <p>Does the patient have coronary artery disease?</p>

      <h2>Select What Applies</h2>
      <div>
          <h3>Risk Factors</h3>
          <p>checkbox item placeholder</p>

          <h3>EKG Points</h3>
          <p>checkbox item placeholder</p>

          <h3>History Points</h3>
          <p>Retrosternal pain, pressure, radiation to jaw/left shoulder/arms, duration 5–15 min, 
          initiated by exercise/cold/emotion, perspiration, nausea/vomiting, reaction on nitrates 
          within mins, patient recognizes symptoms. Low risk features of chest pain include: well 
          localized, sharp, non-exertional, no diaphoresis, no nausea or vomiting, and reproducible with palpation.</p>
          <p>checkbox item placeholder</p>

          <h3>Age</h3>
          <p>checkbox item placeholder</p>

          <h3>Troponin Levels</h3>
          <p>checkbox item placeholder</p>
      </div>
    </>
  );
}

export default HeartPath;

{/*output javascript object to determine color + output number for heart score*\}

// probably want some sort of checkbox custom component to reuse
// probably want some sort of toggle switch for checking CAD