import { setupEnvironment } from "./setup.js";

/** 
 * Simulates ESC 0/1 hr hs-cTn pathway
 * 
 * @return {string} ACSRisk value as "high", "intermediate", or "low" as a string.
*/
export default async function escScore() {
    const { prompt } = await setupEnvironment();

    console.log("The ESC 0/1 Hour Pathway begins below.");
    console.log();

    // Select relevant test
    console.log("Please select the assay used for determining high-sensitivity cardiac troponin T or I value.")
    console.log("\t 1. Roche Elecys hs-cTnT");
    console.log("\t 2. Abbott Architect hs-cTnI");
    console.log("\t 3. Beckman Coulter Access hs-cTnI");
    console.log("\t 4. Siemens ADVIA Centaur hs-cTnI");
    console.log("\t 5. Siemens Atellica hs-cTnI");
    console.log("\t 6. Siemens Dimension Vista hs-cTnI");
    let assay = prompt("Enter the number of your choice (1, 2, 3, 4, 5, or 6): ");

    // LoQ, A, B, C, D
    let assayValues = [
        [6, 12, 3, 52, 5]
        [4, 5, 2, 52, 6]
        [3, 5, 4, 50, 15]
        [3, 6, 3, 120, 12]
        [3, 6, 3, 120, 12]
        [3, 5, 2, 107, 19]
    ];

    let assayRow = assayValues[assay - 1];

    // Determine hs-cTnI or hs-cTnT
    let zeroHour = prompt("Input initial troponin level (ng/L).");
    let oneHour = prompt("Input troponin level (ng/L) after one hour.");
    let onset = prompt("Input the time elapsed since chest pain onset, rounded to the nearest hour.");
    let dif = oneHour - zeroHour;
    let ACSRisk;

    // Determine ACS Risk
    if ((onset > 3 && zeroHour < assayRow[0]) || (zeroHour < assayRow[1] && dif < assayRow[2])) {
        ACSRisk = "low";
    } else if ((zeroHour >= assayRow[3] || oneHour >= assayRow[3]) || dif >= assayRow[4]) {
        ACSRisk = "high";
    } else { // Other results
        ACSRisk = "intermediate";
    }

    console.log(`ACS risk determined to be ${ACSRisk}.`);

    return ACSRisk;
}