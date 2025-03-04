// this will compile all of the different cad branches together
import { setupEnvironment } from "./setup.js";
import cctaSuitability from "./cctaSuitability.js";
import ACSRisk from "./escScore.js";

// this is called during the acs risk = intermediate

// known cad with ccta within 2 years and recent negative stress test

// unknown cad or <50% cad

// known cad > 50% or positive stress test 

export default async function determineCAD() {
    const { prompt } = await setupEnvironment();

    console.log("The CAD obstruction pathway is below.");
    console.log();

    // this determines some of the questions of the cad
    recent_ccta = prompt("Has there been a ccta within the last two years?").toLowerCase()[0] === 'y';
    recent_stress = prompt("Has there been a recent stress test?").toLowerCase()[0] === 'y';
    if (recent_stress = true) {
        pos_or_neg = prompt("What was the outcome of the stress test?").toLowerCase()[0] === 'y';
    }

    known_cad = prompt("Does the patient have any level of CAD?").toLowerCase()[0] === 'y';
    if (known_cad = true) {
        level_cad = prompt("Is there CAD of OVER 50%?").toLowerCase()[0] === 'y';
    }

    // now for some if statements to see level of cad - there should be 3 prongs

    if (known_cad) {
        if (level_cad || pos_or_neg ) {
            console.log("Algorithm ending.... Admit to cardiology");
            console.log();
            CAD_urgency = High 
        }if (recent_ccta && pos_or_neg === false) {
            // add items here (unsure on how to proceed)
            console.log("looks to be ok... release???");
            console.log();
        } else {
            // add items here (unsure on how to proceed)\
            // this is for known cad, but less than 50% and also no recent ccta and no positive stress test
        }
    }

    // the following is for no known cad
    else {
        /// fill in here
    }

    return CAD_urgency
} 