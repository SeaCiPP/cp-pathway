// Alternative testing page
import { useState } from "react";
import "../App.css";

import Checkbox from "../components/Checkbox.jsx";
import Button from "../components/Button.jsx"

import { useForm } from "../FormContext.jsx";
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/alt-test')({
  component: AltTesting,
})

function AltTesting() {
  
    const formData = useForm();
  
     const [crit, setCrit] = useState([
    { key: "cannotWalk", label: "Cannot walk on a treadmill or 2 flights of stairs", checked: false },
    { key: "irregRhythm", label: "Irregular heart rhythm", checked: false },
    { key: "iodinatedAllergy", label: "Iodinated contrast allergy", checked: false },
    { key: "leftBlock", label: "Left bundle branch block", checked: false },
    { key: "severeDisease", label: "Severe reactive airway disease with active wheezing", checked: false },
    { key: "noHold", label: "Can't hold breath for 10 seconds", checked: false },
    { key: "irreg", label: "Frequent ectopy/irregular heart rate", checked: false },
    { key: "betaBlock", label: "Contraindications to lowering HR with beta blockers", checked: false },
    ]);


    const handleCrit = (idx) => {
        setCrit(prev =>
            prev.map((item, i) =>
            i === idx ? { ...item, checked: !item.checked } : item
            )
        );
    };

    const tests = [
        { name: 'Coronary CT Angiography (CCTA)', type: 'imaging' },
        { name: 'Treadmill Electrocardiogram', type: 'treadmill' },
        { name: 'Dobutamine Electrocardiogram', type: 'dobutamine' },
        { name: 'Treadmill Nuclear Perfusion (SPECT)', type: 'treadmill' },
        { name: 'Vasodilator Nuclear Perfusion (SPECT)', type: 'vasodilator' },
        { name: 'Dobutamine Nuclear Perfusion (SPECT)', type: 'dobutamine' },
        { name: 'Vasodilator Nuclear Perfusion (PET)', type: 'vasodilator' },
        { name: 'Vasodilator Stress MRI', type: 'vasodilator' },
        { name: 'Cardiology Consultation', type: 'consultation' }
    ]; 

const isTestAvailable = (test) => {
    // set up for ccta too
    const cannotWalk = crit.find(c => c.key === "cannotWalk")?.checked;
    const irregRhythm = crit.find(c => c.key === "irregRhythm")?.checked;
    const iodinatedAllergy = crit.find(c => c.key === "iodinatedAllergy")?.checked;
    const leftBlock = crit.find(c => c.key === "leftBlock")?.checked;
    const severeDisease = crit.find(c => c.key === "severeDisease")?.checked;
    const noHold = crit.find(c => c.key === "noHold")?.checked;
    const irreg = crit.find(c => c.key === "irreg")?.checked;
    const betaBlock = crit.find(c => c.key === "betaBlock")?.checked;

    if (cannotWalk && test.type === 'treadmill') return false;
    if (irregRhythm && test.name === 'Dobutamine Electrocardiogram') return false;
    if (iodinatedAllergy && test.type === 'imaging') return false;
    if (leftBlock && test.name === 'Treadmill Nuclear Perfusion (SPECT)') return false;
    if (severeDisease && test.type === 'vasodilator') return false;
    if (noHold && (test.type === 'imaging' || test.name === 'Vasodilator Stress MRI')) return false;
    if (irreg && (test.type === 'imaging' || test.name === 'Dobutamine Electrocardiogram')) return false;
    if (betaBlock && test.type === 'imaging') return false;

    if (formData.age > 80) return false;

  return true;
};

    return (
        <div>
            <header className="header">
                <h1>SCiPP Chest Pain Pathway</h1>
            </header>

            <div className="container">
                <h4>Acute Chest Pain</h4>
                <h5>Stress Test Criteria</h5>
                    
                <div className="checkboxes">
                    {crit.map((item, idx) => (
                    <Checkbox
                        key={idx}
                        label={item.label}
                        checked={item.checked}
                        onChange={() => handleCrit(idx)}
                    />
                    ))}
                </div>

                <h5>Stress Tests Suggested</h5>
                <div className="tests-container">
                    {tests.map((test) => (
                        <div
                            key={test.name}
                            className={`test-item ${
                                !isTestAvailable(test) ? 'unavailable' : 'available'
                            }`}
                        >
                            {test.name}
                        </div>
                    ))}
                </div>

                <div className ="back-button">
                    <Button
                    image="Home"
                    text="Back"
                    />
                </div>
            </div>
        </div>
    );
};
