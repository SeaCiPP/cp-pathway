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
        riskFactors: []
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
