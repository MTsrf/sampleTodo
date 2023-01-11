
import './App.css';
import { useEffect, useState } from 'react';


function Task({ task, index, removeTask, completeTask, editTask }) {
  console.log("task", task);
  return (
    <>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between', padding: '10px' }}>
        <button onClick={() => { completeTask(index) }}>completed</button>
        <div
          style={{ textDecoration: task.completed ? 'line-through' : '' }}
        >
          {task.name}
        </div>
        <button onClick={() => { editTask(task.name) }}>edit</button>
        <button onClick={() => { removeTask(index) }}>delete</button>
      </div >
    </>

  )
}

function App() {
  const [toDos, setToDos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [error, setError] = useState("")
  const [editTodo, setEditTodo] = useState("")

  const upateTodo = (name, id, completed) => {
    const newTodos = toDos.map((item) =>
      item.id === id ? { name, id, completed } : item
    )
    setToDos(newTodos)
    setEditTodo('')
  }

  useEffect(() => {
    if (editTodo) {
      setNewTodo(editTodo.name)
    } else {
      setNewTodo("")
    }
  }, [setNewTodo, editTodo])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    if (!editTodo) {
      if (!newTodo) return setError("Please enter task")
      const addTask = [{
        id: Date.now(), name: newTodo, completed: false
      }, ...toDos]
      setToDos(addTask)
      setNewTodo("")
    } else {
      upateTodo(newTodo, editTodo.id, editTodo.completed)
    }

  }

  const removeTask = index => {
    const removeTask = [...toDos]
    removeTask.splice(index, 1)
    setToDos(removeTask)
  }
  console.log(toDos);
  const completeTask = index => {
    const completeTask = [...toDos]
    completeTask[index].completed = true
    setToDos(completeTask)
  }
  const editTask = item => {
    const items = toDos.find(i => i.name == item)
    setEditTodo(items)
  }
  return (
    <>
      <div className='containerTodo'>
        <div>
          <h4> ToDo list</h4>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              name='todo'
              onChange={e => { setNewTodo(e.target.value) }}
              value={newTodo}
            />
            {error && <p style={{ color: "red", fontSize: '10px' }}>{error}</p>}
          </div>
        </form>
        <>
          <div>
            {
              toDos.map((item, index) => (
                <Task
                  index={index}
                  task={item}
                  removeTask={removeTask}
                  completeTask={completeTask}
                  editTask={editTask}
                />
              ))
            }
          </div>
        </>
      </div>
    </>
  );
}

export default App;
