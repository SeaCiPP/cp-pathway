import { setupEnvironment } from "./setup.js";

/** 
 * Simulates Grace Score pathway
 * 
 * @return {string} ACSRisk value as "high", "intermediate", or "low" as a string.
*/
export default async function graceScore() {
    const { prompt } = await setupEnvironment();

    console.log("The Grace Score Pathway begins below.");
    console.log();


    let grace = prompt("Enter Grace score for the patient.");

    // Determine ACS Risk
    if (grace < 140) {
        ACSRisk = "low";
    } else if () {
        ACSRisk = "high";
    } else if () { // Other results
        ACSRisk = "intermediate";
    }

    console.log(`ACS risk determined to be ${ACSRisk}.`);

    return ACSRisk;
}