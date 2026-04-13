import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    let savedTodo = localStorage.getItem("todos");

    if(savedTodo){
      return JSON.parse(savedTodo);
    }else{
      return []
    }
  });

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(tasks))
  }, [tasks])

  function handleChange(e){
    setNewTask(e.target.value);
  }

  function handleSubmit(e){
    e.preventDefault();

    if(newTask != ""){
      setTasks([...tasks, { id: Date.now(), text: newTask, done: false }]);
      setNewTask('');
    }
  }

  function removeTask(task){
    const newTasks = tasks.filter(el => el !== task);
    setTasks(newTasks);
  }

  function finishTask(task){
    setTasks(
      tasks.map(el => {
        if (el.id === task.id){
          return { ...el, done: !el.done }
        }
        return el
      })
    )
  }

  let filteredTasks = [];

  if(filter == 'all'){
    filteredTasks = tasks;
  }else if (filter == 'active'){
    filteredTasks = tasks.filter(task => task.done == false);
  }else if(filter == "completed"){
    filteredTasks = tasks.filter(task => task.done == true);
  }



  return (
    <>
      <div className="todolist">
        <h1> To-do list</h1>

        <div className="todolist__new-task">
          <form onSubmit={handleSubmit}>
            <input type="text" name="newTask" value={newTask} onChange={(e) => handleChange(e)}/>
            <button type="submit">Créer</button>
          </form>
        </div>

        <div className="todolist__filters">
          <button className="todolist__filter-all" onClick={() => setFilter('all')}>All</button>
          <button className="todolist__filter-active" onClick={() => setFilter('active')}>Active</button>
          <button className="todolist__filter-completed" onClick={() => setFilter('completed')}>Completed</button>
        </div>


        <div className="todolist__tasks">
          {filteredTasks.length === 0 ? (
              <p>Aucune tâche</p>
            ) : (
              filteredTasks.map((task, index) => <div className={`todolist__task ${task.done ? "done" : ""}`} key={index} onClick={() => finishTask(task)}><span>{task.text}</span> <div className="clear" onClick={(e) => {e.stopPropagation(); removeTask(task);}}>Supprimer</div></div>)
            )}
        </div>
      </div>
    </>
  )
}

export default App
