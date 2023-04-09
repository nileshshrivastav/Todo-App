import React, { useEffect, useState } from 'react';

const TodoApp = () => {
  const [todoList, setTodoList] = useState([])
  const [task, setTask] = useState('')

  useEffect(() => {
    getTodo()
  }, [])
  
  const getTodo = async () => {
    try {
      const res = await fetch('http://localhost:8080/todo');
      const data = await res.json()
      setTodoList(data)
    } catch (error) {
      console.log(error)
    }
  }

  const createTodo = async () => {
    try {
      const payload  = {
        task: task,
        status: 'NEW',
        date: new Date()
      }
      
      await fetch('http://localhost:8080/createTodo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      getTodo()
      setTask('')

    } catch (error) {
      console.log(error)
    }
  }
  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:8080/todo/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      getTodo()
    } catch (error) {
      console.log(error)
    }
  }
return (
  <div className="wrapper">
        <header>To-do App</header>
        <div className="inputField">
            <input type="text" className="" onChange={(e) => setTask(e.target.value)} placeholder="Add your new task" />
            <button disabled={!task} onClick={() => createTodo()}>+</button>
        </div>
        {todoList && todoList?.map((elem) => (
        <div className="todoList" key={elem._id}>
           {elem?.task}
           <button onClick={() => deleteTodo(elem._id)}><span>&#9745;</span></button>
        </div>
        ))}
    </div>
)
}

export default TodoApp;


