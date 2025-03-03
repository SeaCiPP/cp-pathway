import { setupEnvironment } from "./setup.js";
/**
 * Allows users to check whether CCTA is suitable.
 * 
 * @returns {boolean} true if CCTA suitable, false if not CCTA suitable.
 */
export default async function cctaSuitability() {
    const { prompt } = await setupEnvironment();

    let isCCTASuitable = true;
    let isPriorInconclusive = prompt("Has there been a prior inconclusive coronary CTA? (y/n) -- ").toLowerCase()[0] === 'y';
    console.log();
    let isConditionMet = prompt("Do any of the following conditions apply: BMI >40, Acute Kidney Injury, eGFR <30, inability to lower heart rate to <65, difficulty holding breath for 10 seconds, irregular heart rate (frequent PACs, PVCs, Afib), or a known calcium score >1000? (y/n) -- ").toLowerCase()[0] === 'y';
    console.log();

    if (isPriorInconclusive || isConditionMet) {
        isCCTASuitable = false;
    }
    return isCCTASuitable;
}