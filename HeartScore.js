function HeartScore() {
    // Determine HistoryPoints
    let historyPoints;
    let history = prompt("Enter History");
    if (history == "Slightly Suspicious") {
        historyPoints = 0;
    } else if (history == "Moderately Suspicious") {
        historyPoints = 1;
    } else if (history == "Highly Suspicious") {
        historyPoints = 2;
    }

    // Determine EKGPoints
    let ekgPoints;
    let ekg = prompt("Enter EKG Outcome");
    if (ekg == "Normal") {
        ekgPoints = 0;
    } else if (ekg == "Non-specific repolarization disturbance") {
        ekgPoints = 1;
    } else if (ekg == "Significant ST depression") {
        ekgPoints = 2;
    }
    
    // Determine AgePoints
    let agePoints;
    let age = prompt("Enter Patient Age");
    if (age < 45) {
        agePoints = 0;
    } else if (age >= 45 && age <= 60) {
        agePoints = 1;
    } else if (age > 60) {
        agePoints = 2;
    }

    // Determine RiskFactorPoints
    let riskFactorPoints;
    let riskFactor = prompt("Enter Number of Risk Factors");
    if (riskFactor == 0) {
        riskFactorPoints = 0;
    } else if (riskFactor == 1 || riskFactor == 2) {
        riskFactorPoints = 1;
    } else if (riskFactor >= 3) {
        riskFactorPoints = 2;
    }

    // Determine TroponinPoints
    let troponinPoints;
    let troponin = prompt("Enter Troponin Levels (ng/ml)");
    if (troponin < 0.04) {
        troponinPoints = 0;
    } else if (troponin >= 0.04 && troponin <= 0.08) {
        troponinPoints = 1;
    } else if (troponin >= 0.08) {
        troponinPoints = 2;
    }

    // Determine HeartScore
    let totalScore = historyPoints + ekgPoints + agePoints + riskFactorPoints + troponinPoints;
    
    // Calculate ACSRisk
    let ACSRisk;
    if (totalScore >= 7) {
        ACSRisk = "High";
    } else if ((totalScore >= 4 && totalScore < 7) || troponinPoints >= 1) {
        ACSRisk = "Intermediate";
    } else {
        ACSRisk = "Low";
    }

    console.log("ACS Risk Determined.");
}