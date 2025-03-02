function acsRisk() {
    let pathway = prompt("Would you like to use the HEART Score, ESC 0/1-Hour, or ESC/GRACE Pathway?");
    if (pathway == "HEART Score") {
        HeartScore();
    } else if (pathway == "ESC 0/1-Hour") {
        escAlg();
    } else if (pathway == "ESC/Grace") {
        escGrace();
    }
}