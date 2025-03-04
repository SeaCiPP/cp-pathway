/**
 * This file contains the main flow and functionality of the script
 * and application.
 */
import heartScore from "./src/HeartScore.js";
import { setupEnvironment } from "./src/setup.js";
import acsRisk from "./src/acsRisk.js";

// cleanUp delays exiting for 1 second
const { cleanUp, prompt } = await setupEnvironment();

alert(`Press CTRL + C to exit console at any time. This is a prototype of the updated algorithm for the UWMC ED Pathway. Please order a troponin and ECG.`);

// isAcute is true if answer/acute chest pain is yes.
// Tests for acute chest pain or stable chest pain.
let isAcute = prompt("Is this a suspected case of Acute Chest Pain? (y/n) -- ").toLowerCase()[0] === 'y';
console.log();

if (isAcute) {

    // isCardiac is true if answer is yes/cause is cardiac.
    // Tests for cardiac cause.
    let isCardiac = prompt("Is the suspected cause of pain cardiac? (y/n) -- ").toLowerCase()[0] === 'y';
    console.log();

    if (isCardiac) {

        // isSTEMI is true if answer is yes/there is STEMI.
        // Tests for STEMI.
        let isSTEMI = prompt("Is there ST Elevation in the EKG? (y/n) -- ").toLowerCase()[0] === 'y';
        console.log();

        if (isSTEMI) {
            alert("Follow STEMI guidelines for institution. Exiting . . .");
            await cleanUp();
        }
        
        // isPostCardiac is true if answer is yes/there was sudden cardiac death.
        // Tests for sudden cardiac death.
        let isPostCardiac = prompt("Has the patient already experienced Sudden Cardiac Death? (y/n) -- ").toLowerCase()[0] === 'y';
        console.log();

        if (isPostCardiac) {
            alert(`Decision tool not meant to guide post cardiac arrest care. Please refer to dedicated guidelines. Exiting . . .`);
            await cleanUp();
        }

        // if program reaches this point it means the above two conditions are not met
        // and we need more testing
        let isNSTEACS = prompt("Is there Non ST-elevation acute coronary syndrome? (y/n) -- ").toLowerCase()[0] === 'y';
        console.log();

        if (isNSTEACS) {
            let riskPathway = await acsRisk();
            let riskStratification = await riskPathway();
            switch (riskStratification) {
                case "high":
                    alert("Page cardiology for admission. Exiting . . .");
                    await cleanUp();
                    break;
                case "intermediate":
                    // needs to be replaced
                    alert("intermediate");
                    await cleanUp();
                    break;
                case "low":
                    alert("No testing required. Exiting . . .");
                    await cleanUp();
                    break;
            }
        } else {
            alert("Evaluate for acute aortic syndrome, PE, acute myopericarditis, or valvular heart disease. Exiting . . .");
            await cleanUp();
        }
    } else { // if non-cardiac
        alert("Evaluate for non-cardiac causes. Exiting . . .");
        await cleanUp();
    }
} else { // if stable, needs to be filled in
    alert("Starting the Stable Branch. Exiting . . .");
    await cleanUp();
}