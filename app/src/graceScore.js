import { setupEnvironment } from "./setup.js";

/** 
 * Simulates Grace Score pathway
 * 
 * @return {string} ACSRisk value as "high", "intermediate", or "low" as a string.
*/
export default async function graceScore() {
    const { prompt } = await setupEnvironment();

    console.log("The GRACE Score Pathway begins below.");
    console.log();
    console.log("Please first calculate the GRACE Score for the patient.");
    
    // Determine Grace score, based off mdcalc... just input for now
    let grace = prompt("Input GRACE Score");

    let zeroHour = prompt("Input initial troponin (hs-cTn) level (ng/L).");
    let oneHour = prompt("Input troponin (hs-cTn) level (ng/L) after one hour.");
    let threeHour = prompt("Input troponin (hs-cTn) level (ng/L) after three hours.");
    let onset = prompt("Input the time elapsed since symptom onset, rounded to the nearest hour.");
    let dif = oneHour - zeroHour;
    let ACSRisk;

    // need to adjust uln depending on troponin test used, just input or range for now
    // let uln = prompt("Please input the upper limit of normal for the troponin test used.")

    // Determine ACS Risk
    if ((grace < 140) && ((onset < 6 && zeroHour < uln && threeHour <uln) || (onset > 6 && zeroHour < uln))) {
        ACSRisk = "low";
    } else if ((zeroHour >= 12 && zeroHour <= 52) || (dif >= 3 || dif <= 5)) {
        ACSRisk = "intermediate";
    } else if (zeroHour > 52 || dif > 5) { // Other results
        ACSRisk = "high";
    }

    console.log(`ACS risk determined to be ${ACSRisk}.`);

    return ACSRisk;
}