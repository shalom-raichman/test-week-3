const BASE_URL: string = "https://nbaserver-q21u.onrender.com/"
const searchBtn: HTMLDivElement = document.querySelector(".subm")!
const table: HTMLElement = document.querySelector(".tbody")!
const playrsRows: HTMLElement = document.querySelector(".data")!
const rangeDispInp: NodeListOf<HTMLLabelElement> = document.querySelectorAll(".range-inp")
const rangeDispLbl: NodeListOf<HTMLInputElement> = document.querySelectorAll(".range-lbl")

// get the divs of the groop
const PG: HTMLDivElement = document.querySelector(".PG")! 
const SG: HTMLDivElement = document.querySelector(".SG")! 
const SF: HTMLDivElement = document.querySelector(".SF")! 
const PF: HTMLDivElement = document.querySelector(".PF")! 
const C: HTMLDivElement = document.querySelector(".C")! 

// the fantasy teem arry
let fantasyTesm: Player[] = []

// create reqeuest for the fetch request
const playersReq = (): PlayerReq => {
    const playerReq: PlayerReq = {
        position: (rangeDispInp[0] as unknown as HTMLInputElement).value,
        points: Number((rangeDispInp[1] as unknown as HTMLInputElement).value),
        twoPercent: Number((rangeDispInp[2] as unknown as HTMLInputElement).value),
        threePercent: Number((rangeDispInp[3] as unknown as HTMLInputElement).value)
    }    
    return playerReq
}

// return the players from the api server
const getPlayers = async (): Promise<Player[] | undefined> => {    
    try {
        const res = await fetch(`${BASE_URL}api/filter`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(playersReq())
        })
        if(!res.ok){
            throw new Error(res.statusText);
        }
        const players: Player[] = await res.json()
        return players
    } catch (error) {
        console.log(error);
    }
}

// displya player details in the right div (by position)
const populateTeam = (player: Player): void => {
    const playerName: HTMLParagraphElement = document.createElement("p")
    playerName.textContent = player.playerName
    const player3p: HTMLParagraphElement = document.createElement("p")
    player3p.textContent = player.threePercent.toString()
    const player2p: HTMLParagraphElement = document.createElement("p")
    player2p.textContent = player.twoPercent.toString()
    const playerPoints: HTMLParagraphElement = document.createElement("p")
    playerPoints.textContent = player.position

    switch (player.position) {
        case "PG":
            PG.appendChild(playerName)
            PG.appendChild(player3p)
            PG.appendChild(player2p)
            PG.appendChild(playerPoints)
            break;
        case "SG":
            SG.appendChild(playerName)
            SG.appendChild(player3p)
            SG.appendChild(player2p)
            SG.appendChild(playerPoints)
            break;
        case "SF":
            SF.appendChild(playerName)
            SF.appendChild(player3p)
            SF.appendChild(player2p)
            SF.appendChild(playerPoints)
            break;
        case "PF":
            PF.appendChild(playerName)
            PF.appendChild(player3p)
            PF.appendChild(player2p)
            PF.appendChild(playerPoints)
            break;
        case "C":
            C.appendChild(playerName)
            C.appendChild(player3p)
            C.appendChild(player2p)
            C.appendChild(playerPoints)
            break;
    
        default:
            break;
    }

}

// calls the populateTeam func to 
const addPlayer = (player: Player) => {
    const toAdd = fantasyTesm.find(p => p.position == player.position || p.playerName == player.playerName)
    if(toAdd) return
    fantasyTesm.push(player)
    for (const player of fantasyTesm) {
        populateTeam(player)
    }
}

// return action element
const createAddPlayerElement = (player: Player): HTMLElement => {
    const box: HTMLElement = document.createElement("td")
    const wraper: HTMLDivElement = document.createElement("div")
    wraper.classList.add("actions-div")
    const addplayer: HTMLDivElement = document.createElement("div")
    addplayer.classList.add("action")
    addplayer.textContent = "Add Player"
    addplayer.addEventListener("click", e => addPlayer(player))
    wraper.appendChild(addplayer)
    box.appendChild(wraper)
    return box
}

// return row element
const createRow = (player: Player): HTMLElement => {
    // creting row content
    // box
    const row: HTMLElement = document.createElement("tr")
    // player name
    const name: HTMLElement = document.createElement("td")
    name.textContent = player.playerName
    // player position
    const position: HTMLElement = document.createElement("td")
    position.textContent = player.position
    // player 
    const points: HTMLElement = document.createElement("td")
    points.textContent = player.points.toString()
    // player 2 percent
    const twoPercent: HTMLElement = document.createElement("td")
    twoPercent.textContent = player.twoPercent.toString()
    // player 3 percent
    const threePercent:HTMLElement = document.createElement("td")
    threePercent.textContent = player.threePercent.toString()
    // add player action
    const addPlayer :HTMLElement = createAddPlayerElement(player)
    
    // inserting the elements to the row
    row.appendChild(name)
    row.appendChild(position)
    row.appendChild(points)
    row.appendChild(twoPercent)
    row.appendChild(threePercent)
    row.appendChild(addPlayer)
    return row
}

const rangeDisply = (): void => {
    for (let i:number = 0; i < rangeDispInp.length; i++) {
        const inp = rangeDispInp[i + 1];
        const lbl = rangeDispLbl[i];
        if(i == 0){
            inp.addEventListener("click", () => {lbl.textContent = (inp as unknown as HTMLInputElement).value})
        }else{
            inp.addEventListener("click", () => {lbl.textContent = (inp as unknown as HTMLInputElement).value.toString() + "%"})
        }
    }
}

const populatePlayers = async (): Promise<void> => {
    const players: Player[] | undefined = await getPlayers()
    if(players?.length == 0){
        alert("There is no players with thees expectation")
        console.log(table);

    }
    
    table.innerHTML = ""
    for (const player of (players as Player[])) {
        table.appendChild(createRow(player))
    }
    console.log(table);

}


searchBtn.addEventListener("click", populatePlayers)

rangeDisply()

interface Player {
    _id: string,
    playerName: string,
    age: number,
    position: positions,
    twoPercent: number,
    threePercent: number,
    games: number,
    team: string,
    season: number[],
    points: number,
}
interface PlayerReq {
    position: string,
    twoPercent: number,
    threePercent: number,
    points: number,
}

type positions = "PG"|"SG"|"SF"|"PF"|"C"

type Team =  {
    [key in positions]: Player;
}