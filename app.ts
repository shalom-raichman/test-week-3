const rangeDispInp: NodeListOf<HTMLLabelElement> = document.querySelectorAll(".range-inp")
const rangeDispLbl: NodeListOf<HTMLInputElement> = document.querySelectorAll(".range-lbl")

// return action element
const createAddPlayerElement = (): HTMLElement => {
    const box: HTMLElement = document.createElement("td")
    const wraper = document.createElement("div")
    wraper.classList.add("actions-div")
    box.appendChild(wraper)
    return box
}

// return row element
const createRow = (player: Player): HTMLElement => {
    // creting row content
    const row: HTMLElement = document.createElement("tr")
    const name: HTMLElement = document.createElement("td")
    name.textContent = player.playerName
    const position: HTMLElement = document.createElement("td")
    position.textContent = player.position
    const points: HTMLElement = document.createElement("td")
    points.textContent = player.points.toString()
    const twoPercent: HTMLElement = document.createElement("td")
    twoPercent.textContent = player.twoPercent.toString()
    const threePercent:HTMLElement = document.createElement("td")
    threePercent.textContent = player.threePercent.toString()
    const action:HTMLElement = createAddPlayerElement()

    // inserting the elements to the row
    row.appendChild(name)
    row.appendChild(position)
    row.appendChild(points)
    row.appendChild(twoPercent)
    row.appendChild(threePercent)
    row.appendChild(action)

    return row
}




const rangeDisply = (): void => {
    for (let i:number = 0; i < rangeDispInp.length; i++) {
        const inp = rangeDispInp[i];
        const lbl = rangeDispLbl[i];
        if(i == 0){
            inp.addEventListener("click", () => {lbl.textContent = (inp as unknown as HTMLInputElement).value})
        }else{
            inp.addEventListener("click", () => {lbl.textContent = (inp as unknown as HTMLInputElement).value + "%"})
        }
    }
}

rangeDisply()

interface Player {
    _id: string,
    playerName: string,
    age: number,
    position: string,
    twoPercent: number,
    threePercent: number,
    games: number,
    team: string,
    season: number[],
    points: number,
}