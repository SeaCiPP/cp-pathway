import { setupEnvironment } from "./setup.js";
import heartScore from "./HeartScore.js";
import escScore from "./escScore.js";

/**
 * Determines which risk stratification algorithm to use.
 * 
 * @returns a reference to a function that simulates the stratification algorithm.
 */

export default async function acsRisk() {
    const { prompt } = await setupEnvironment();

    let riskPathway;
    let isTroponin = console.prompt("Was a high-sensitivity troponin (hs-cTn) test available? (y/n) -- ").toLowerCase()[0] === 'y';
    
    if (isTroponin) {
        riskPathway = escScore;
    } else {
        riskPathway = heartScore;
    }

    return riskPathway;
}