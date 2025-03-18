import { setupEnvironment } from "./setup.js";

/** 
 * Simulates HEART Score pathway
 * 
 * @return {string} ACSRisk value as "high", "intermediate", or "low" as a string.
*/
export default async function HeartScore() {
    const { prompt } = await setupEnvironment();

    console.log("The HEART Score Pathway begins below.");
    console.log();

    // Determine HistoryPoints
    let historyPoints;
    console.log("Please select the history level:");
    console.log("\t 1. Slightly Suspicious");
    console.log("\t 2. Moderately Suspicious");
    console.log("\t 3. Highly Suspicious");
    let history = prompt("Enter the number of your choice (1, 2, or 3): ");
    console.log()
    if (history == "Slightly Suspicious" || history == 1) {
        historyPoints = 0;
    } else if (history == "Moderately Suspicious" || history == 2) {
        historyPoints = 1;
    } else if (history == "Highly Suspicious" || history == 3) {
        historyPoints = 2;
    }

    // Determine EKGPoints
    let ekgPoints;
    console.log("Please select EKG Outcome:");
    console.log("\t 1. Normal");
    console.log("\t 2. Non-specific repolarization disturbance");
    console.log("\t 3. Significant ST depression");
    let ekg = prompt("Enter the number of your choice (1, 2, or 3): ");
    console.log();
    if (ekg == "Normal" || ekg == 1) {
        ekgPoints = 0;
    } else if (ekg == "Non-specific repolarization disturbance" || ekg == 2) {
        ekgPoints = 1;
    } else if (ekg == "Significant ST depression" || ekg == 3) {
        ekgPoints = 2;
    }
    
    // Determine AgePoints
    let agePoints;
    let age = prompt("Enter Patient Age: ");
    console.log();
    if (age < 45) {
        agePoints = 0;
    } else if (age >= 45 && age <= 60) {
        agePoints = 1;
    } else if (age > 60) {
        agePoints = 2;
    }

    // Determine RiskFactorPoints
    let riskFactorPoints;
    let riskFactor = prompt("Enter Number of Risk Factors: ");
    console.log();
    if (riskFactor == 0) {
        riskFactorPoints = 0;
    } else if (riskFactor == 1 || riskFactor == 2) {
        riskFactorPoints = 1;
    } else if (riskFactor >= 3) {
        riskFactorPoints = 2;
    }

    // Determine TroponinPoints
    let troponinPoints;
    let troponin = prompt("Enter Troponin Levels (ng/ml): ");
    let troponinPer = prompt(" Are serial troponins below the 99th percentile? (y/n) -- ").toLowerCase()[0] === 'y';
    console.log();
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
        ACSRisk = "high";
    } else if (totalScore >= 4 && totalScore < 7) {
        ACSRisk = "intermediate";
    } else if (totalScore < 3 && troponinPer){
        ACSRisk = "low";
    }

    console.log(`ACS risk determined to be ${ACSRisk}.`);

    return ACSRisk;
}
