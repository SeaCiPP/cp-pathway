import { setupEnvironment } from "./setup.js";
import cctaSuitability from "./cctaSuitability.js";

/** 
 * Follows the pathway in the case where the patient has coronary artery disease
 * 
 * 
*/
export default async function knownCad() {
    const { prompt } = await setupEnvironment();

    console.log("Now following the pathway for known coronary artery disease.");
    console.log();

    let obstructive = prompt("Does the patient have obstructive CAD? (y/n) -- ").toLowerCase()[0] === 'y';
    if (obstructive) {
        console.log("Option to defer testing and intensify GDMT.");
    
        let highRisk = prompt("Does the patient have obstructive CAD? (y/n) -- ").toLowerCase()[0] === 'y';
        let angina = prompt("Does the patient have obstructive CAD? (y/n) -- ").toLowerCase()[0] === 'y';
        if ((highRisk) || (frequentAngina)) {
            console.log("Invasive coronary angiography.");
            console.log("Exiting . . . ");
        } else {
            // do stress testing ?
        }
    } else { // non obstructive CAD
        let suitability = cctaSuitability;
        if (suitability) {
            // continue adding here
 
        } // else refer to cardiology or stress testing...
    }

}