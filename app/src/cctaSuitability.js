import { setupEnvironment } from "./setup.js";
/**
 * Allows users to check whether CCTA is suitable.
 * 
 * @returns {boolean} true if CCTA suitable, false if not CCTA suitable.
 */
export default async function cctaSuitability() {
    const { prompt } = await setupEnvironment();

    let isCCTASuitable = true;
    console.log();
    let isConditionMet = prompt("Are any of the following conditions unmet: Age < 80, eGFR > 30, able to perform breath-hold for ~10 seconds, absence of frequenty ectopy/irregular heart rate (PACs/PVCs), no contraindications to lowering HR with beta blockers (HR < 60bpm), absence of contrast allergy? (y/n) -- ").toLowerCase()[0] === 'y';
    console.log();
    if (isConditionMet) {
        isCCTASuitable = false;
    }
    return isCCTASuitable;
}