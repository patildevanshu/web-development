import { useState } from "react"

export default function LudoBoard(){
    // let [blueMove , setBlueMove] = useState(0);
    // let [redMove , setRedMove] = useState(0);
    // let [greenMove , setGreenMove] = useState(0);
    // let [yellowMove , setYellowMove] = useState(0);

    let [moves , setMoves] = useState({blue: 0, red: 0, green: 0, yellow: 0});

    let updateBlue = () => {
        setMoves({...moves, blue: moves.blue + 1});
    }
    let updateRed = () => {
        setMoves({...moves, red: moves.red + 1});
    }
    let updateGreen = () => {
        setMoves({...moves, green: moves.green + 1});
    }
    let updateYellow = () => {
        setMoves({...moves, yellow: moves.yellow + 1});
    }

    return(
        <div>
            <h2>Ludo Board</h2>
            <div className="board">
                <p>Blue move = {moves.blue} </p>
                <button onClick={updateBlue} style={{backgroundColor : "blue"}} >+1</button>
                <p>Red move = {moves.red} </p>
                <button onClick={updateRed} style={{backgroundColor : "red"}}>+1</button>
                <p>Yellow Move = {moves.yellow} </p>
                <button onClick={updateYellow} style={{backgroundColor : "yellow" , color : "black"}}>+1</button>
                <p>Green Move = {moves.green}</p>
                <button onClick={updateGreen} style={{backgroundColor : "green"}}>+1</button>
            </div>
        </div>
    )
}