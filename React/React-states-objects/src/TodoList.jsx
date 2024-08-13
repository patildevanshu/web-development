import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
export default function TodoList() {
  let [todos, setTodos] = useState([{ task: "sample task", id: uuidv4() , isDone : false }]);
  let [newTodo, setNewTodo] = useState("");

  let addNewTask = () => {
    setTodos((prevTodos) => {
      return [...prevTodos, { task: newTodo, id: uuidv4() , isDone : false}];
    });
    setNewTodo("");
  };
  let updateTodoValue = (event) => {
    setNewTodo(event.target.value);
  };

  let deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((prevTodos) => prevTodos.id != id));
  };

  let markAllDone = () => {
    setTodos( (prevTodos) => prevTodos.map((todo) => {
        return {...todo,
        isDone:true,
        id: todo.id,}
      }));
  };

  let markAsDone = (id) => {
    
    setTodos( (prevTodos) => prevTodos.map((todo) => {
        if(todo.id == id) {
            return {...todo,
            isDone: true,
            id: todo.id,};
        } else {
            return todo ;
        }
      })
     );
    };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        placeholder="Add a Task"
        value={newTodo}
        onChange={updateTodoValue}
      />
      <br />
      <button onClick={addNewTask}>Add Task</button>
      <br />
      <br />
      <hr />
      <h3>Tasks Todo</h3>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span><span style={todo.isDone ? {textDecorationLine : "line-through"} : {}} >{todo.task} </span> &nbsp;&nbsp;&nbsp;
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                <button onClick={() => markAsDone(todo.id)}>Mark As Done</button>
                 </span>
          </li>
        ))}
      </ul>
      <button onClick={markAllDone}>Mark All As Done</button>
    </div>
  );
}
