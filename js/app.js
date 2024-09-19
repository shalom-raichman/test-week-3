"use strict";
const rangeDispInp = document.querySelectorAll(".range-inp");
const rangeDispLbl = document.querySelectorAll(".range-lbl");
// return action element
const createAddPlayerElement = () => {
    const box = document.createElement("td");
    const wraper = document.createElement("div");
    wraper.classList.add("actions-div");
    box.appendChild(wraper);
    return box;
};
// return row element
const createRow = (player) => {
    // creting row content
    const row = document.createElement("tr");
    const name = document.createElement("td");
    name.textContent = player.playerName;
    const position = document.createElement("td");
    position.textContent = player.position;
    const points = document.createElement("td");
    points.textContent = player.points.toString();
    const twoPercent = document.createElement("td");
    twoPercent.textContent = player.twoPercent.toString();
    const threePercent = document.createElement("td");
    threePercent.textContent = player.threePercent.toString();
    const action = createAddPlayerElement();
    // inserting the elements to the row
    row.appendChild(name);
    row.appendChild(position);
    row.appendChild(points);
    row.appendChild(twoPercent);
    row.appendChild(threePercent);
    row.appendChild(action);
    return row;
};
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
