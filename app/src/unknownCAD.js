import { setupEnvironment } from "./setup.js";


/**
 * Follows the pathway for unknown CAD, or CAD with <50% luminal stenosis.
 */

export default async function unknownCAD() {
    const { prompt } = await setupEnvironment();

    let ifCCTA = await cctaSuitability();
    if (ifCCTA) {
        let cctaResult = prompt("Input the stenosis percentage as determined by the CCTA.");
        if (cctaResult < 75) { // normal/minimal/mild/moderate...
            console.log("Discharge patient with appropriate follow-up.");
            console.log("Exiting . . .");
            return;
        } else { // severe/obstructive
            console.log("Page cardiology for admission.");
            console.log("Exiting . . .");
            return;
        }
    } else { // not CCTA suitable 
        // Perform alternative testing, call stressTest()?
        let isAbnormal = prompt("Does the stress test have abnormal results? (y/n) -- ").toLowerCase()[0] === 'y';
        if (isAbnormal) {
            console.log("Page cardiology for admission.");
            console.log("Exiting . . .");
            return;
        } else { // normal/unchanged
            console.log("Discharge patient with appropriate follow-up.");
            console.log("Exiting . . .");
            return;
        }
    }
}