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
    console.log("Please select the ACS risk stratification algorithm:")
    console.log("\t 1. HEART Score");
    console.log("\t 2. ESC 0/1 hr hs-cTn pathway");
    console.log("\t 3. 2016 ESC/GRACE pathway");
    console.log("Would you like to use the HEART Score, ESC 0/1-Hour, or ESC/GRACE Pathway?");
    let pathway = prompt("Enter the number of your choice (1, 2, or 3): ");
    console.log();

    let riskPathway;
    if (pathway == "HEART Score" || pathway == 1) {
        riskPathway = heartScore;
    } else if (pathway == "ESC 0/1-Hour" || pathway == 2) {
        riskPathway = escScore;
    } else if (pathway == "ESC/Grace" || pathway == 3) {
        riskPathway = graceScore;
    }

    return riskPathway;
}