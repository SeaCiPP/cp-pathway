// Just a simple example of the start of the program

console.log("Welcome to the Chest Pain Pathway");

let condition = prompt("Is the patient displaying stable, outpatient, or acute symptoms?");
if (condition == "Acute") {
    let painCause = prompt("Is the cause of the pain due to a cardiac condition?");
    if (painCause == "No") {
        console.log("Evaluate for non-cardiac causes; END algorithm here.");
    } else { // painCause == yes, is cardiac..
        CardiacCause();
    }
} else if (condition == "Stable " || condition == "Outpatient") {
    console.log("N/A for now");
}
