const rangeDispInp: NodeListOf<HTMLLabelElement> = document.querySelectorAll(".range-inp")
const rangeDispLbl: NodeListOf<HTMLInputElement> = document.querySelectorAll(".range-lbl")




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