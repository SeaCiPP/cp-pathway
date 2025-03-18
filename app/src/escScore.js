import { setupEnvironment } from "./setup.js";
import heartScore from "./HeartScore.js";

/** 
 * Simulates ESC 0/1 hr hs-cTn pathway
 * 
 * @return {string} ACSRisk value as "high", "intermediate", or "low" as a string.
*/
export default async function escScore() {
    const { prompt } = await setupEnvironment();

    console.log("The ESC 0/1 Hour Pathway begins below.");
    console.log();

    console.log("Please refer to the assay used for classifying high-sensitivity cardiac troponin values.");
    console.log("NOTE: Renal dysfunction patients with chronic kidney disease may have elevated cTn at baseline.");
    console.log("Either refer to prior test values, or focus on changes in troponin over time.");
    console.log();

    // Time Zero hs-cTn
    let timeZero = prompt("Input initial troponin level.");
    if (timeZero == "High") {
        ACSRisk = "high";
        console.log(`ACS risk determined to be ${ACSRisk}.`);
        return ACSRisk;
    } else if (timeZero == "Very Low") {
        let symptomDur = prompt("Has the patient been experiencing symptoms for over three hours? (y/n) -- ").toLowerCase()[0] === 'y';
        if (symptomDur) {
            ACSRisk = "low";
            console.log(`ACS risk determined to be ${ACSRisk}.`);
            return ACSRisk;
        }
    }
    // all other, or if patient has not been experiencing symptoms for over three hours
    // Time One hs-cTn
    let timeOne = prompt("Input troponin level after one hour.");
    let changeOne = prompt("Input the significance of thechange in troponin level over the past hour.");
    if (timeOne == "Low" && changeOne == "Insignificant") {
        ACSRisk = "low";
    } else if (changeOne == "Significant") {
        ACSRisk = "high";
    } else { // all other
        // Time Three hs-cTn
        let timeThree = prompt("Input troponin level after three hours.");
        let changeThree = prompt("Input the significance of the change in troponin level over the past three hours.");
        if (timeThree == "High" || changeThree == "Significant") {
            ACSRisk = "high";
        } else if (change == "Insignificant") {
            // perform heart score
            ACSRisk = await heartScore();
        }
    }

    console.log(`ACS risk determined to be ${ACSRisk}.`);

    return ACSRisk;
}