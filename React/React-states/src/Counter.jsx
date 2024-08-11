import { useState } from "react"

export default function Counter(){
    // let [stateVariable , setStateVariable] = useState(0);
    let [count , setCount] = useState(0);

    function incrementCounter (){
        setCount(count + 1);
    }

    return(
        <div>
            <h3>count = {count} </h3>
            <button onClick={incrementCounter} >Increase count</button>
        </div>
    )
}