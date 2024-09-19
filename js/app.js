"use strict";
const rangeDispInp = document.querySelectorAll(".range-inp");
const rangeDispLbl = document.querySelectorAll(".range-lbl");
const rangeDisply = () => {
    for (let i = 0; i < rangeDispInp.length; i++) {
        const inp = rangeDispInp[i];
        const lbl = rangeDispLbl[i];
        if (i == 0) {
            inp.addEventListener("click", () => { lbl.textContent = inp.value; });
        }
        else {
            inp.addEventListener("click", () => { lbl.textContent = inp.value + "%"; });
        }
    }
};
rangeDisply();
