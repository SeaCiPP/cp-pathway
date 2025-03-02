/**
 * This file contains the main flow and functionality of the script
 * and application.
 */
import heartScore from "./src/HeartScore.js";
import { setupEnvironment } from "./src/setup.js";

// cleanUp delays exiting for 1 second
const { cleanUp, prompt } = await setupEnvironment();

console.log("Press CTRL + C to exit console at any time.");
console.log("This is a prototype of the updated algorithm for the UWMC ED Pathway.")
console.log("Please order a troponin and ECG.")
console.log();

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
            console.log("Follow STEMI guidelines for institution. Exiting . . .");
            await cleanUp();
        }
        
        // isPostCardiac is true if answer is yes/there was sudden cardiac death.
        // Tests for sudden cardiac death.
        let isPostCardiac = prompt("Has the patient already experienced Sudden Cardiac Death? (y/n) -- ").toLowerCase()[0] === 'y';
        console.log();

        if (isPostCardiac) {
            console.log("Decision tool not meant to guide post cardiac arrest care.");
            console.log("Please refer to dedicated guidelines.");
            console.log("Exiting . . .");
            await cleanUp();
        }

        // if program reaches this point it means the above two conditions are not met
        // and we need more testing
        let isNSTEACS = prompt("Is there Non ST-elevation acute coronary syndrome? (y/n) -- ").toLowerCase()[0] === 'y';
        console.log();

        if (isNSTEACS) {
            
        } else {
            console.log("Evaluate for acute aortic syndrome, PE, acute myopericarditis, or valvular heart disease.");
            console.log("Exiting . . .");
            await cleanUp();
        }
    } else { // if non-cardiac
        console.log("Evaluate for non-cardiac causes. Exiting . . .");
        await cleanUp();
    }
} else { // if stable, needs to be filled in
    console.log("Starting the Stable Branch. Exiting . . .");
    await cleanUp();
}