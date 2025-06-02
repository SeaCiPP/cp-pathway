// Alternative testing page
import { useState, useEffect, useRef } from "react";
import "../App.css";

import Checkbox from "../components/Checkbox.jsx";
import SectionHeader from "../components/SectionHeader.jsx"

import { useForm } from "../FormContext.jsx";
import { createLazyFileRoute, Link } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/alt-test')({
  component: AltTesting,
})

function AltTesting() {
    const { formData, resetFormData } = useForm();
    const [crit, setCrit] = useState([
        { key: "cad", label: "Known obstructive coronary artery disease (>50% stenosis) or prior coronary revascularization", checked: false },
        { key: "irreg", label: "Frequent ectopy/irregular heart rate or atrial fibrillation", checked: false },
        { key: "iodinatedAllergy", label: "Iodinated contrast allergy", checked: false },
        { key: "noHold", label: "Can't hold breath for 10 seconds", checked: false },
        { key: "cannotWalk", label: "Cannot walk on a treadmill to peak stress", checked: false },
        { key: "leftBlock", label: "Left bundle branch block", checked: false },
        { key: "severeDisease", label: "Severe reactive airway disease with wheezing on examination", checked: false },
        { key: "block", label: "Advanced heart block", checked: false },
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
        const cad = crit.find(c => c.key === "cad")?.checked;;
        const irreg = crit.find(c => c.key === "irreg")?.checked;
        const iodinatedAllergy = crit.find(c => c.key === "iodinatedAllergy")?.checked;
        const noHold = crit.find(c => c.key === "noHold")?.checked;
        const cannotWalk = crit.find(c => c.key === "cannotWalk")?.checked;
        const leftBlock = crit.find(c => c.key === "leftBlock")?.checked;
        const severeDisease = crit.find(c => c.key === "severeDisease")?.checked;
        const block = crit.find(c => c.key === "block")?.checked;

        if (formData.age > 80 && test.type === 'imaging') return false;
        if (cad && test.type === 'imaging') return false;
        if (irreg && (test.type === 'imaging' || !(test.name.includes('SPECT') || 
        test.name.includes('PET') || test.type ==='consultation'))) return false;
        if (iodinatedAllergy && test.type === 'imaging') return false;
        if (noHold && (test.type === 'imaging')) return false;
        if (cannotWalk && test.type === 'treadmill') return false;
        if (leftBlock && test.name === 'Treadmill Nuclear Perfusion (SPECT)') return false;
        if (severeDisease && test.type === 'vasodilator') return false;
        if (block && test.type === 'vasodilator') return false;
        return true;
    };

    const criteriaRef = useRef(null);
    useEffect(() => {
        if (criteriaRef.current) {
            criteriaRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    return (
        <div style={{ minHeight: '100vh', background: '#fafbfc', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '32px 0' }}>
            <div style={{ background: '#fff', maxWidth: 420, width: '100%', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.07)', padding: 32, margin: '0 8px' }}>
                <header className="header" style={{ marginBottom: 32 }}>
                    <Link to="/" onClick={resetFormData} style={{ display: 'block', background: '#ede6ee', borderRadius: 2, padding: '8px 16px', textDecoration: 'none', color: '#111' }}>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 0, color: '#111' }}>SCiPP Chest Pain Pathway</h1>
                    </Link>
                </header>
                <div ref={criteriaRef}>
                  <SectionHeader>Stress Test Criteria</SectionHeader>
                  <div style={{ marginBottom: 24, overflow: 'visible !important', minHeight: '1px', display: 'block !important' }}>
                    <div style={{ display: 'flex !important', flexDirection: 'column', gap: 0, minHeight: '1px !important' }}>
                        {crit.map((item, idx) => (
                            <Checkbox
                                key={idx}
                                label={item.label}
                                checked={item.checked}
                                onChange={() => handleCrit(idx)}
                            />
                        ))}
                    </div>
                  </div>
                </div>
                <hr style={{ border: 0, borderTop: '1.5px solid #e3e3e3', margin: '32px 0 24px 0' }} />
                <SectionHeader style={{ marginBottom: 24 }}>Stress Tests Suggested</SectionHeader>
                <div style={{ marginBottom: 28 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {tests.map((test) => (
                            <div
                                key={test.name}
                                style={{
                                    padding: '14px 18px',
                                    borderRadius: 12,
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    background: isTestAvailable(test) ? '#f8f4ff' : '#f3f3f3',
                                    color: isTestAvailable(test) ? '#7B2CBF' : '#bbb',
                                    border: isTestAvailable(test) ? '2px solid #7B2CBF' : '2px solid #eee',
                                    boxShadow: isTestAvailable(test) ? '0 2px 8px #7B2CBF11' : 'none',
                                    opacity: isTestAvailable(test) ? 1 : 0.7,
                                    transition: 'all 0.2s',
                                }}
                            >
                                {test.name}
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
                    <button
                        className="btn-standard"
                        style={{
                            background: '#1976d2',
                            color: '#fff',
                            boxShadow: '0 2px 12px rgba(25, 118, 210, 0.15)',
                            fontWeight: 700,
                            fontSize: '1.1rem',
                            border: 'none',
                            borderRadius: 12,
                            minHeight: 56,
                            cursor: 'pointer',
                            margin: 0,
                            animation: 'heartPulse 1.5s infinite',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 10,
                        }}
                        onClick={() => window.location.assign('/')}
                    >
                        <span style={{ fontSize: '1.3em', marginRight: 6 }}>✓</span>
                        Complete Pathway
                    </button>
                </div>
            </div>
        </div>
    );
}
