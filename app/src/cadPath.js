import { setupEnvironment } from "./setup.js";
import unknownCAD from "./unknownCAD.js";

/**
 * Determines which CAD pathway to use.
 */

export default async function cadPath() {
    const { prompt } = await setupEnvironment();

    let isRecentTest = prompt("Has the patient had a normal CCTA within 2 years, or a normal stress test within 1 year? (y/n) -- ").toLowerCase()[0] === 'y';
    if (isRecentTest) {
        let isNotCAD = prompt("Is it known there is no coronary artery disease? (y/n) -- ").toLowerCase()[0] === 'y';
        if (isNotCAD) {
            console.log("Discharge patient with appropriate follow-up.");
            console.log("Exiting . . .");
            return;
        }
    }
    
    let isCAD = prompt("Is there known coronary artery disease? (y/n) -- ").toLowerCase()[0] === 'y';
    if (isCAD) {
        isStenosis = prompt("Is there over 50% luminal stenosis? (y/n) -- ").toLowerCase()[0] === 'y';
        if (isStenosis) {
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

        } else { // no stenosis
            unknownCAD();
        }
    } else { // unkonwn CAD
        unknownCAD();
    }
}