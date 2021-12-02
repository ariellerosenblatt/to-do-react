import logo from './logo.svg';
import './App.css';
import * as controller from "./controller"
import * as React from 'react';
var APIKey = "ea812b-af8305-822932-c0383a-7dea17";

function App() {
const [todos, setToDos] = React.useState([])
const [newTask, setNewTask] = React.useState("")
const [sortMethod, setSort] = React.useState(false)

function getItems()
{
  fetch("https://cse204.work/todos",{
    method:"GET",
    headers:{
      "x-api-key":APIKey
    }
  })
  .then(res=>res.json())
  .then(data=>{
    console.log(data);
    setToDos(data)}
    )
  .catch(err=>console.log(err));
}

React.useEffect(()=>{
  getItems()
},[])



function handleCheck(id)
{
  controller.markComplete(id);
  getItems();
}

function handleDelete(id)
{
  controller.deleteItem(id);
  getItems();
}

function handleAdd()
{
  controller.newTask(newTask);
  setNewTask("");
  getItems();
}

function handleEnter(e)
{
  if (e.code === "Enter")
  {
handleAdd()
  }
}

  return (
    <div className="App">
      <header className="App-header">
      <div className="add">
      {/* <h>To Do List</h> */}
        {/* <p>numberOfToDos:{todos.length}</p> */}
        <input className="input" onChange={e=>setNewTask(e.target.value)} value={newTask} onKeyDown={handleEnter}/>
        <button className="addButton" onClick={handleAdd}>Add Task</button>
        <button className="sortButton" onClick={()=>setSort(!sortMethod)}>Sort {sortMethod?"Recent":"Oldest"} </button> </div>
        {todos && todos.sort((a,b)=>{
          if(sortMethod) {
            return a.created_at < b.created_at ? 1:-1
          }
          else
          {
            return a.created_at < b.created_at ? -1:1
          }
        }).map(x=>(
          <div className="ALL"> 
          <div className="todo-item">
              <input type="checkbox" checked={x.completed} onChange={()=>handleCheck(x.id)}/>
            <p className="toDoTitle">{x.text}</p>
          <button className="deleteButton" onClick={()=>handleDelete(x.id)}>Delete</button>
          <div className="date">
            <p className="space"> </p>
          <p> <b> Date Created: </b> {x.created_at}</p>
          </div>
          </div>
          </div>
        ))}
      </header>
    </div>
  );
}

export default App;
