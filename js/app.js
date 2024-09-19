"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const BASE_URL = "https://nbaserver-q21u.onrender.com/";
const searchBtn = document.querySelector(".subm");
const table = document.querySelector(".tbody");
const playrsRows = document.querySelector(".data");
const rangeDispInp = document.querySelectorAll(".range-inp");
const rangeDispLbl = document.querySelectorAll(".range-lbl");
// get the divs of the groop
const PG = document.querySelector(".PG");
const SG = document.querySelector(".SG");
const SF = document.querySelector(".SF");
const PF = document.querySelector(".PF");
const C = document.querySelector(".C");
// the fantasy teem arry
let fantasyTesm = [];
// create reqeuest for the fetch request
const playersReq = () => {
    const playerReq = {
        position: rangeDispInp[0].value,
        points: Number(rangeDispInp[1].value),
        twoPercent: Number(rangeDispInp[2].value),
        threePercent: Number(rangeDispInp[3].value)
    };
    return playerReq;
};
// return the players from the api server
const getPlayers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(`${BASE_URL}api/filter`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(playersReq())
        });
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        const players = yield res.json();
        return players;
    }
    catch (error) {
        console.log(error);
    }
});
// displya player details in the right div (by position)
const populateTeam = (player) => {
    const playerName = document.createElement("p");
    playerName.textContent = player.playerName;
    const player3p = document.createElement("p");
    player3p.textContent = player.threePercent.toString();
    const player2p = document.createElement("p");
    player2p.textContent = player.twoPercent.toString();
    const playerPoints = document.createElement("p");
    playerPoints.textContent = player.position;
    switch (player.position) {
        case "PG":
            PG.appendChild(playerName);
            PG.appendChild(player3p);
            PG.appendChild(player2p);
            PG.appendChild(playerPoints);
            break;
        case "SG":
            SG.appendChild(playerName);
            SG.appendChild(player3p);
            SG.appendChild(player2p);
            SG.appendChild(playerPoints);
            break;
        case "SF":
            SF.appendChild(playerName);
            SF.appendChild(player3p);
            SF.appendChild(player2p);
            SF.appendChild(playerPoints);
            break;
        case "PF":
            PF.appendChild(playerName);
            PF.appendChild(player3p);
            PF.appendChild(player2p);
            PF.appendChild(playerPoints);
            break;
        case "C":
            C.appendChild(playerName);
            C.appendChild(player3p);
            C.appendChild(player2p);
            C.appendChild(playerPoints);
            break;
        default:
            break;
    }
};
// calls the populateTeam func to 
const addPlayer = (player) => {
    const toAdd = fantasyTesm.find(p => p.position == player.position || p.playerName == player.playerName);
    if (toAdd)
        return;
    fantasyTesm.push(player);
    for (const player of fantasyTesm) {
        populateTeam(player);
    }
};
// return action element
const createAddPlayerElement = (player) => {
    const box = document.createElement("td");
    const wraper = document.createElement("div");
    wraper.classList.add("actions-div");
    const addplayer = document.createElement("div");
    addplayer.classList.add("action");
    addplayer.textContent = "Add Player";
    addplayer.addEventListener("click", e => addPlayer(player));
    wraper.appendChild(addplayer);
    box.appendChild(wraper);
    return box;
};
// return row element
const createRow = (player) => {
    // creting row content
    // box
    const row = document.createElement("tr");
    // player name
    const name = document.createElement("td");
    name.textContent = player.playerName;
    // player position
    const position = document.createElement("td");
    position.textContent = player.position;
    // player 
    const points = document.createElement("td");
    points.textContent = player.points.toString();
    // player 2 percent
    const twoPercent = document.createElement("td");
    twoPercent.textContent = player.twoPercent.toString();
    // player 3 percent
    const threePercent = document.createElement("td");
    threePercent.textContent = player.threePercent.toString();
    // add player action
    const addPlayer = createAddPlayerElement(player);
    // inserting the elements to the row
    row.appendChild(name);
    row.appendChild(position);
    row.appendChild(points);
    row.appendChild(twoPercent);
    row.appendChild(threePercent);
    row.appendChild(addPlayer);
    return row;
};
// show the num of the range input 
const rangeDisply = () => {
    for (let i = 0; i < rangeDispInp.length; i++) {
        const inp = rangeDispInp[i + 1];
        const lbl = rangeDispLbl[i];
        if (i == 0) {
            inp.addEventListener("click", () => { lbl.textContent = inp.value; });
        }
        else {
            inp.addEventListener("click", () => { lbl.textContent = inp.value.toString() + "%"; });
        }
    }
};
// insert tp the table the players
const populatePlayers = () => __awaiter(void 0, void 0, void 0, function* () {
    const players = yield getPlayers();
    if ((players === null || players === void 0 ? void 0 : players.length) == 0) {
        alert("There is no players with thees expectation");
        console.log(table);
    }
    table.innerHTML = "";
    for (const player of players) {
        table.appendChild(createRow(player));
    }
    console.log(table);
});
// search button
searchBtn.addEventListener("click", populatePlayers);
rangeDisply();
