import { useState } from "react"
export default function TodoList(){
    let [todos , setTodos] = useState(["sample task"]);
    let [newTodo , setNewTodo] = useState("");
    
    let addNewTask = () => {
        setTodos([...todos, newTodo]);
        setNewTodo("");
    }
    return(
        <div>
            <h1>Todo List</h1>
            <input type="text" placeholder="Add a Task" value={newTodo} /><br />
            <button onClick={addNewTask} >Add Task</button>
            <br /><br />
            <hr />
            <h3>Tasks Todo</h3>
            <ul>
                {
                todos.map((todo,index) => (
                    <li key={index}>{todo}</li>))
                }
            </ul>
        </div>
    )
}