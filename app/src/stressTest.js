import { setupEnvironment } from "./setup.js";
import cctaSuitability from "./cctaSuitability.js";

export async function stressTestAvailability(includePharmaStress) {
    const { prompt } = await setupEnvironment();
    let stressTestChosen;
    
    console.log("Please select the test availability:");
    console.log("\t 1. Both CMR and PET with MBF available and affordable.");
    console.log("\t 2. Only CMR with MBF available.");
    console.log("\t 3. Only PET with MBF available.");
    if (includePharmaStress) {
        console.log("\t 4. Pharmacological Stress Test");
    }
    let testAvailability = prompt(`Enter the number of your choice (1, 2, 3, ${includePharmaStress && "4"}): `);
    switch (Number(testAvailability)) {
        case 1:
            let isTestMore = prompt("Do you also want to assess for LVH, infiltrative disease, sarcoidosis, myocarditis, chronic pericarditis, or percardial constriction? (y/n) -- ").toLowerCase()[0] === 'y';
            if (isTestMore) {
                let stressCMRSuitable = stressCMRSuitability();
                if (stressCMRSuitable) {
                    stressTestChosen = "Stress CMR";
                }
            } else {
                let cardiacPETSuitable = cardiacPETSuitability();
                if (cardiacPETSuitable) {
                    stressTestChosen = "Cardiac PET";
                }
            }
            break;
        case 2:
            let stressCMRSuitable = stressCMRSuitability();
            if (stressCMRSuitable) {
                stressTestChosen = "Stress CMR";
            }
            break;
        case 3:
            let cardiacPETSuitable = cardiacPETSuitability();
            if (cardiacPETSuitable) {
                stressTestChosen = "Cardiac PET";
            }
            break;
        case 4:
            let pharmaStressSuitable = pharmaStressSuitability();
            if (pharmaStressSuitable) {
                stressTestChosen = "Pharmacological Stress Test";
            }
    }

    return stressTestChosen;
}

export async function stressTest() {
    const { prompt } = await setupEnvironment();
    let stressTestChosen;

    console.log("Determining type of Stress Test to use.")
    let isMicroIschemia = prompt("Is microvascular ischemia suspected? (y/n) -- ").toLowerCase()[0] === 'y';
    if (isMicroIschemia) {
        stressTestChosen = await stressTestAvailability(false);
    } else {
        let isPriorInconclusive = prompt("Are there prior inconclusive PharmaStressSpect or StressMRI tests? (y/n) -- ").toLowerCase()[0] === 'y';
        if (isPriorInconclusive) {
            let isStressEchoInconclusive = prompt("Is there prior inconclusive Stress ECG? (y/n) -- ").toLowerCase()[0] === 'y';
            if (isStressEchoInconclusive) {
                let ccta = await cctaSuitability();
                if (ccta) {
                    stressTestChosen = "CCTA";
                } else {
                    
                }
            } 
        } else {

        }
    }
}