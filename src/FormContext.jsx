// for accessing the form across different pages

import { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const initialState = {
        ecg: "",
        age: "",
        duration: "",
        tropTest: "",
        tropZero: "",
        tropType: "",
        tropOne: "",
        tropThree: "",
        history: "",
        heartScoreCalculated: false,
        heartScore: null,
        riskFactors: [],
        stressTestCriteria: [
            { key: "cad", label: "Known obstructive coronary artery disease (>50% stenosis) or prior coronary revascularization", checked: false },
            { key: "irreg", label: "Frequent ectopy/irregular heart rate or atrial fibrillation", checked: false },
            { key: "iodinatedAllergy", label: "Iodinated contrast allergy", checked: false },
            { key: "noHold", label: "Can't hold breath for 10 seconds", checked: false },
            { key: "cannotWalk", label: "Cannot walk on a treadmill to peak stress", checked: false },
            { key: "leftBlock", label: "Left bundle branch block", checked: false },
            { key: "severeDisease", label: "Severe reactive airway disease with wheezing on examination", checked: false },
            { key: "block", label: "Advanced heart block", checked: false },
        ]
    };
    const [formData, setFormData] = useState(initialState);
    const resetFormData = () => setFormData(initialState);

    return (
        <FormContext.Provider value={{ formData, setFormData, resetFormData }}>
            {children}
        </FormContext.Provider>
    );
};

export const useForm = () => useContext(FormContext);
