// First acute chest pain pathway page

import { useState, useEffect, useRef } from "react";
import "../App.css"; // CSS for styling

import Radio from "../components/Radio.jsx";
import DropDown from "../components/DropDown.jsx";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";

import { troponinTests } from "../troponinTests.js";
import { useForm } from "../FormContext.jsx";
import { createLazyFileRoute } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router'

export const Route = createLazyFileRoute("/acute-one")({
    component: AcuteOne
})

const fadeInStyle = {
    opacity: 1,
    transform: 'translateY(0)',
    transition: 'opacity 0.25s cubic-bezier(.4,0,.2,1), transform 0.25s cubic-bezier(.4,0,.2,1)'
};
const fadeOutStyle = {
    opacity: 0,
    transform: 'translateY(12px)',
    pointerEvents: 'none',
    height: 0
};

function AcuteOne() {
   
    // for all user inputs
    const { formData, setFormData } = useForm();
    
    // saving ranks for troponin
    const [categories, setCategories] = useState({
        tropZero: null,
        tropOne: null,
        tropThree: null
    });

    const navigate = useNavigate();
    const heartScoreRef = useRef(null);

    // for transition animation
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Effect to handle scrolling when heart score is calculated
    useEffect(() => {
        if (formData.heartScoreCalculated) {
            // Small delay to ensure the DOM has updated
            setTimeout(() => {
                heartScoreRef.current?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 100);
        }
    }, [formData.heartScoreCalculated]);

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
        if (formData.tropType === "it") {
            category = checkITTrop(field, value);
        } else if (formData.tropType === "hs") {
            category = checkTrop(field, value);
        }

        if (category !== null) {
            setCategories((prev) => ({ ...prev, [field]: category }));
        }
    };


    let risk = 0;

    // returns categories for hs-troponin levels
    const checkTrop = (field, trop) => {
        const values = troponinTests[formData.tropTest];

        // determine which column in the values to use
        // TIME ZERO TROP
        if (field === "tropZero") {
            if (trop < values[0]) {
                if (formData.duration > 3) {
                    // low risk -- exit ROUTE
                    risk = 1;
                }
                return 1; // very low
            } else if (trop >= values[0] && trop < values[3]) {
                return 2; // intermediate
            } else if (trop >= values[3]) {
                // high risk -- exit ROUTE
                risk = 3;
            }
        // ONE HOUR TROP delta
        } else if (field === "tropOne" ) {
            trop = trop - formData.tropZero; // determine one hr delta
            if (trop < values[2]) {
                if (categories.tropZero === 1) {
                    // low risk -- exit ROUTE
                    risk = 1;
                }
                return 2;
            } else if (trop >= values[4]) {
                // high risk -- exit ROUTE
                risk = 3;
            }
        // THREE HOUR TROP delta
        } else if (field === "tropThree") {
            trop = trop - formData.tropZero;
            if (trop < values[2]) {
                // reveal HEART calculate button
                // determine category number here to give 2 heart score
                return 3;
            } else if (trop >= values[4] || trop >= values[3]) {
                // high risk -- exit ROUTE
                risk = 3;
            }
        }
    };

    // returns categories for IT-troponin levels
    const checkITTrop = (field, trop) => {
        const values = troponinTests["IT"];

        if (trop < values[0]) {
            if (field === "tropZero" && formData.duration > 3) {
                // low risk -- exit ROUTE
                risk = 1;
            }
            return 1; // very low
        } else if (trop >= values[0] && trop <= values[3]) {
            return 2; // intermediate
        } else if (trop > values[3]) {
            // high risk -- exit ROUTE
            risk = 3;
        }
    }

    // handles ecg selection
    const handleEcgChange = (e) => {
        const value = e.target.value;
        
        if (value === "Option 4: STEMI") {
            setIsTransitioning(true);
            setTimeout(() => {
                setFormData((prev) => ({
                    ...prev,
                    ecg: value,
                    age: "",
                    duration: "",
                    tropTest: "BeckmanCoulter",
                    tropZero: "",
                    tropType: "",
                    tropOne: "",
                    tropThree: ""
                }));
                setCategories({
                    tropZero: null,
                    tropOne: null,
                    tropThree: null
                });
                setTimeout(() => {
                    setIsTransitioning(false);
                }, 300);
            }, 300);
        } else {
            setFormData((prev) => ({...prev, ecg: value,}));
        }
    }

    // handles other non-numeric inputs
    const handleChange = (field) => (e) => {
        const value = e.target.value;
        setFormData((prev) => ({ ...prev, [field]: value,}));
      };




    // remove the header later... it will be a component
    return (
        <div style={{ minHeight: '100vh', background: '#fafbfc', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '32px 0' }}>
            <div style={{ background: '#fff', maxWidth: 420, width: '100%', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.07)', padding: 32, margin: '0 8px' }}>
                <header className="header" style={{ marginBottom: 24 }}>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 0, color: '#111' }}>SCiPP Chest Pain Pathway</h1>
                </header>
                {/* ECG Section */}
                <h2 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: 8, color: '#111' }}>ECG</h2>
                <div style={{ marginBottom: 20 }}>
                    <DropDown 
                        value={formData.ecg} onChange={handleEcgChange}
                        itemone="Option 1: Normal ECG"
                        itemtwo="Option 2: Non-specific repolarization abnormalities"
                        itemthree="Option 3: ST segment depressions (not due to LBBB/LVH)"
                        itemfour="Option 4: STEMI"
                        label={<span style={{ color: '#222' }}>Select ECG Result</span>}
                        style={{ width: '100%', color: '#111' }}
                    />
                </div>
                {formData.ecg === "Option 4: STEMI" ? (
                    <div style={{ width: '100%', marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
                        <Button
                            image="warning"
                            text="Use Institution Specific STEMI Protocol"
                            style={{ 
                                backgroundColor: "#ff0000", 
                                color: "#fff",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer",
                                width: '100%',
                                minHeight: '48px',
                                fontSize: '1.1rem',
                                fontWeight: 500,
                                opacity: isTransitioning ? 0 : 1,
                                transition: "opacity 0.1s ease-in-out",
                                animation: "pulse 0.7s infinite",
                                boxShadow: "0 2px 12px rgba(255, 0, 0, 0.15)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "10px"
                            }}
                        />
                    </div>
                ) : (
                    <>
                        <hr style={{ border: 0, borderTop: '1.5px solid #e0e0e0', margin: '32px 0' }} />
                        {/* Patient Info Section */}
                        <h2 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: 8, color: '#111' }}>Patient Info</h2>
                        <div style={{ marginBottom: 24 }}>
                            <Input
                                value={formData.age}
                                onChange={handleNumChange("age")}
                                label={<span style={{ color: '#222' }}>Patient Age (years)</span>}
                            />
                        </div>
                        <div style={{ marginBottom: 24 }}>
                            <Input
                                value={formData.duration}
                                onChange={handleNumChange("duration")}
                                label={<span style={{ color: '#222' }}>Chest Pain Duration (hours)</span>}
                            />
                        </div>
                        <hr style={{ border: 0, borderTop: '1.5px solid #e0e0e0', margin: '32px 0' }} />
                        {/* Troponin Testing Section */}
                        <h2 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: 8, color: '#111' }}>Troponin Testing</h2>
                        {formData.ecg !== "Option 4: STEMI" && (
                            <>
                                <div style={{ marginBottom: 24, width: '100%', ...fadeInStyle }}>
                                    <label style={{ fontWeight: 500, fontSize: '1rem', marginBottom: 8, display: 'block', color: '#222' }}>Troponin Test Type</label>
                                    <div className="radio-group" style={{ marginBottom: 0, width: '100%' }}>
                                        <Radio 
                                            value="hs"
                                            name="trop"
                                            label={<span style={{ color: '#222' }}>HS-Troponin (units)</span>}
                                            selected={formData.tropType === "hs"}
                                            onChange={handleChange("tropType")}
                                            disabled={!formData.duration}
                                        />
                                        <Radio 
                                            value="it"
                                            name="trop"
                                            label={<span style={{ color: '#222' }}>Troponin I/T (units)</span>}
                                            selected={formData.tropType === "it"}
                                            onChange={handleChange("tropType")}
                                            disabled={!formData.duration}
                                        />
                                    </div>
                                    <div style={(!formData.tropType && !formData.heartScoreCalculated) ? fadeInStyle : fadeOutStyle}>
                                        <div style={{ color: '#888', fontSize: '0.97rem', marginTop: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <span style={{ fontSize: '1.2em', opacity: 0.7 }}>▼</span>
                                            Select a Troponin test type to continue…
                                        </div>
                                    </div>
                                    <div style={(formData.tropType === 'hs' && !formData.tropTest && !formData.heartScoreCalculated) ? fadeInStyle : fadeOutStyle}>
                                        <div style={{ color: '#888', fontSize: '0.97rem', marginTop: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <span style={{ fontSize: '1.2em', opacity: 0.7 }}>▼</span>
                                            Select a Troponin assay to continue…
                                        </div>
                                    </div>
                                </div>
                                {formData.tropType === "hs" && (
                                    <AnimatedField>
                                        <div style={{ marginBottom: 24, width: '100%' }}>
                                            <DropDown 
                                                value={formData.tropTest} onChange={handleChange("tropTest")}
                                                itemone="BeckmanCoulter"
                                                itemtwo="Roche"
                                                itemthree="Abbott"
                                                itemfour="Siemens"
                                                label={<span style={{ color: '#222' }}>Select Troponin Assay</span>}
                                                style={{ color: '#222', width: '100%' }}
                                            />
                                        </div>
                                    </AnimatedField>
                                )}
                                {/* Initial Troponin Level (no animation) */}
                                <div style={{ marginBottom: 24, width: '100%' }}>
                                    <Input
                                        value={formData.tropZero}
                                        onChange={handleTropChange("tropZero")}
                                        disabled={!formData.tropType}
                                        label={<span style={{ color: '#222' }}>Initial Troponin Level (ng/mL)</span>}
                                    />
                                    <div style={formData.tropType && (formData.tropType !== 'hs' || formData.tropTest) && !(categories.tropZero === 1 || categories.tropZero === 2) && !formData.heartScoreCalculated ? fadeInStyle : fadeOutStyle}>
                                        <div style={{ color: '#888', fontSize: '0.97rem', marginTop: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <span style={{ fontSize: '1.2em', opacity: 0.7 }}>▼</span>
                                            Enter a value above to continue Troponin testing…
                                        </div>
                                    </div>
                                </div>
                                {(categories.tropZero === 1 || categories.tropZero === 2 || formData.heartScoreCalculated) && (
                                    <>
                                        {formData.tropType === "hs" ? (
                                            <AnimatedField>
                                                <div style={{ marginBottom: 24, width: '100%' }}>
                                                    <Input
                                                        value={formData.tropOne}
                                                        onChange={handleTropChange("tropOne")}
                                                        label={<span style={{ color: '#222' }}>Troponin at 1 Hour (ng/mL)</span>}
                                                    />
                                                    {/* Indicator for Troponin at 3 Hours (HS) */}
                                                    {!(formData.tropType === "hs" && categories.tropOne === 2) && !formData.heartScoreCalculated && (
                                                        <div style={fadeInStyle}>
                                                            <div style={{ color: '#888', fontSize: '0.97rem', marginTop: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                                                                <span style={{ fontSize: '1.2em', opacity: 0.7 }}>▼</span>
                                                                Enter a value above to continue Troponin testing…
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </AnimatedField>
                                        ) : formData.tropType === "it" ? (
                                            <AnimatedField>
                                                <div style={{ marginBottom: 24, width: '100%' }}>
                                                    <Input
                                                        value={formData.tropThree}
                                                        onChange={handleTropChange("tropThree")}
                                                        label={<span style={{ color: '#222' }}>Troponin at 3 Hours (ng/mL)</span>}
                                                    />
                                                    {/* Indicator for Heart Score (IT) */}
                                                    {!(formData.tropType === "it" && categories.tropThree === 2) && !formData.heartScoreCalculated && (
                                                        <div style={fadeInStyle}>
                                                            <div style={{ color: '#888', fontSize: '0.97rem', marginTop: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                                                                <span style={{ fontSize: '1.2em', opacity: 0.7 }}>▼</span>
                                                                Enter a value above to continue Troponin testing…
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </AnimatedField>
                                        ) : null }
                                        {formData.tropType === "hs" && (categories.tropOne === 2 || formData.heartScoreCalculated) ? (
                                            <AnimatedField>
                                                <div style={{ marginBottom: 24, width: '100%' }}>
                                                    <Input
                                                        value={formData.tropThree}
                                                        onChange={handleTropChange("tropThree")}
                                                        label={<span style={{ color: '#222' }}>Troponin at 3 Hours (ng/mL)</span>}
                                                    />
                                                    {/* Indicator for Heart Score (HS) */}
                                                    {!(formData.tropType === "hs" && categories.tropThree === 3) && !formData.heartScoreCalculated && (
                                                        <div style={fadeInStyle}>
                                                            <div style={{ color: '#888', fontSize: '0.97rem', marginTop: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                                                                <span style={{ fontSize: '1.2em', opacity: 0.7 }}>▼</span>
                                                                Continue to HEART Score…
                                                            </div>
                                                        </div>
                                                    )}
                                                    {(categories.tropThree === 3 || formData.heartScoreCalculated) && (
                                                        <>
                                                            <div style={{ margin: '32px 0', textAlign: 'center' }} ref={heartScoreRef}>
                                                                {!formData.heartScoreCalculated ? (
                                                                    <button
                                                                        style={{
                                                                            background: '#1976d2',
                                                                            color: '#fff',
                                                                            border: 'none',
                                                                            borderRadius: 12,
                                                                            fontSize: '1.2rem',
                                                                            fontWeight: 600,
                                                                            padding: '18px 0',
                                                                            width: '100%',
                                                                            maxWidth: 320,
                                                                            margin: '0 auto',
                                                                            boxShadow: '0 2px 12px rgba(25, 118, 210, 0.12)',
                                                                            cursor: 'pointer',
                                                                            animation: 'pulseHeart 1.2s infinite',
                                                                            transition: 'background 0.2s',
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'center',
                                                                            gap: 12
                                                                        }}
                                                                        onClick={() => navigate({ to: '/heart-score' })}
                                                                    >
                                                                        <span style={{ fontSize: '1.5em', animation: 'bounceHeart 1.2s infinite' }}>❤️</span>
                                                                        Calculate Heart Score
                                                                    </button>
                                                                ) : (
                                                                    <div style={{
                                                                        background: '#e3f2fd',
                                                                        color: '#1976d2',
                                                                        borderRadius: 12,
                                                                        fontSize: '2.2rem',
                                                                        fontWeight: 700,
                                                                        padding: '18px 0',
                                                                        width: '100%',
                                                                        maxWidth: 320,
                                                                        margin: '0 auto',
                                                                        boxShadow: '0 2px 12px rgba(25, 118, 210, 0.12)',
                                                                        display: 'flex',
                                                                        flexDirection: 'column',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        gap: 4
                                                                    }}>
                                                                        <span style={{ fontSize: '2.8rem', fontWeight: 800, lineHeight: 1 }}>{formData.heartScore}</span>
                                                                        <span style={{ fontSize: '1.1rem', fontWeight: 500, color: '#1976d2', marginTop: 2 }}>Heart Score</span>
                                                                    </div>
                                                                )}
                                                                <style>{`
                                                                    @keyframes pulseHeart {
                                                                        0% { box-shadow: 0 0 0 0 rgba(25, 118, 210, 0.25); }
                                                                        70% { box-shadow: 0 0 0 12px rgba(25, 118, 210, 0); }
                                                                        100% { box-shadow: 0 0 0 0 rgba(25, 118, 210, 0); }
                                                                    }
                                                                    @keyframes bounceHeart {
                                                                        0%, 100% { transform: translateY(0); }
                                                                        50% { transform: translateY(-6px); }
                                                                    }
                                                                `}</style>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </AnimatedField>
                                        ) : formData.tropType === "it" && (categories.tropThree === 2 || formData.heartScoreCalculated) ? (
                                            <>
                                                <div style={{ margin: '32px 0', textAlign: 'center' }} ref={heartScoreRef}>
                                                    {!formData.heartScoreCalculated ? (
                                                        <button
                                                            style={{
                                                                background: '#1976d2',
                                                                color: '#fff',
                                                                border: 'none',
                                                                borderRadius: 12,
                                                                fontSize: '1.2rem',
                                                                fontWeight: 600,
                                                                padding: '18px 0',
                                                                width: '100%',
                                                                maxWidth: 320,
                                                                margin: '0 auto',
                                                                boxShadow: '0 2px 12px rgba(25, 118, 210, 0.12)',
                                                                cursor: 'pointer',
                                                                animation: 'pulseHeart 1.2s infinite',
                                                                transition: 'background 0.2s',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                gap: 12
                                                            }}
                                                            onClick={() => navigate({ to: '/heart-score' })}
                                                        >
                                                            <span style={{ fontSize: '1.5em', animation: 'bounceHeart 1.2s infinite' }}>❤️</span>
                                                            Calculate Heart Score
                                                        </button>
                                                    ) : (
                                                        <div style={{
                                                            background: '#e3f2fd',
                                                            color: '#1976d2',
                                                            borderRadius: 12,
                                                            fontSize: '2.2rem',
                                                            fontWeight: 700,
                                                            padding: '18px 0',
                                                            width: '100%',
                                                            maxWidth: 320,
                                                            margin: '0 auto',
                                                            boxShadow: '0 2px 12px rgba(25, 118, 210, 0.12)',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            gap: 4
                                                        }}>
                                                            <span style={{ fontSize: '2.8rem', fontWeight: 800, lineHeight: 1 }}>{formData.heartScore}</span>
                                                            <span style={{ fontSize: '1.1rem', fontWeight: 500, color: '#1976d2', marginTop: 2 }}>Heart Score</span>
                                                            <span style={{ fontSize: '2.2rem', marginTop: 8 }}>❤️</span>
                                                        </div>
                                                    )}
                                                    <style>{`
                                                        @keyframes pulseHeart {
                                                            0% { box-shadow: 0 0 0 0 rgba(25, 118, 210, 0.25); }
                                                            70% { box-shadow: 0 0 0 12px rgba(25, 118, 210, 0); }
                                                            100% { box-shadow: 0 0 0 0 rgba(25, 118, 210, 0); }
                                                        }
                                                        @keyframes bounceHeart {
                                                            0%, 100% { transform: translateY(0); }
                                                            50% { transform: translateY(-6px); }
                                                        }
                                                    `}</style>
                                                </div>
                                            </>
                                        ) : null }
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

function AnimatedField({ children }) {
    const [show, setShow] = useState(false);
    const { formData } = useForm();

    useEffect(() => {
        if (formData.heartScoreCalculated) {
            setShow(true);
        } else {
            setTimeout(() => setShow(true), 10);
        }
    }, [formData.heartScoreCalculated]);

    return (
        <div style={show ? fadeInStyle : fadeOutStyle}>
            {children}
        </div>
    );
}

const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% {
            box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7);
        }
        70% {
            box-shadow: 0 0 0 10px rgba(255, 0, 0, 0);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(255, 0, 0, 0);
        }
    }
`;
document.head.appendChild(style);