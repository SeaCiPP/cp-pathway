function CardiacCause() {

    // Suggestions for variable names...
    let cause = prompt("Which option would you like to choose? (ST Elevation, Acute Myocardial Infarction, Other");
    if (cause == "ST Elevation") {
        console.log("Follow STEMI guidelines for institution; END algorithm here.");
    } else if (cause == "Acute Myocardial Infarction") {
        console.log("Follow heart attack guidelines for institution; END algorithm here.");
    } else {  // Other reasoning
        let cause = prompt("Is the patient exhibiting Non-ST Elevation Acute Coronary Syndrome?");
        if (cause == "Yes") {
            acsRISK();
            // Call more functions here later on? For if ACSRisk is high,
            // intermediate, or low...
        } else {
            console.log("Evaluate for acute aortic syndrome, PE, acute myopericarditis, or valvular heart disease; END algorithm here.")
        }
    }   
}