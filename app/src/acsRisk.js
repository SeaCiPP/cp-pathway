import { setupEnvironment } from "./setup.js";
import heartScore from "./HeartScore.js";
import escScore from "./escScore.js";
import graceScore from "./graceScore.js";

/**
 * Allows users to choose what risk stratification algorithm to use
 * 
 * @returns a reference to a function that simulates the stratification algorithm.
 */
export default async function acsRisk() {
    const { prompt } = await setupEnvironment();
    alert(`Please select the ACS risk stratification algorithm: 1. HEART Score, 2. ESC 0/1 hr hs-cTn pathway, 3. 2016 ESC/GRACE pathway`);
    let pathway = prompt("Enter the number of your choice (1, 2, or 3): ");
    console.log();

    let riskPathway;
    if (pathway == "HEART Score" || pathway == 1) {
        riskPathway = heartScore;
    } else if (pathway == "ESC 0/1-Hour" || pathway == 2) {
        // riskPathway = escScore;
        riskPathway = heartScore;
    } else if (pathway == "ESC/Grace" || pathway == 3) {
        // riskPathway = graceScore;
        riskPathway = heartScore;
    }

    return riskPathway;
}