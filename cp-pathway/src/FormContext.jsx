// for accessing the form across different pages

import { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        ecg: "Option 1: Normal ECG", //
        age: "", // 
        duration: "", // 
        tropTest: "BeckmanCoulter",
        tropZero: "",
        tropType: "", //
        tropOne: "",
        tropThree: "",
        history: ""
    });

    return (
        <FormContext.Provider value={{ formData, setFormData }}>
            {children}
        </FormContext.Provider>
    );
};

export const useForm = () => useContext(FormContext);
