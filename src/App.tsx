import React, { useState, useEffect, ChangeEvent } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

interface AppProps {}

interface Todo {
  id:number;
  task: string;
}

function App(props: AppProps) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState<string>('');

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]') as Todo[];
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (task.trim() !== '') {
      setTodos([...todos, { id: todos.length + 1, task }]);
      setTask('');
    }
  };
  
  const handleRemoveTodo = (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>TODO App</h1>
        <div className="todo-input">
          <input
            type="text"
            placeholder="Add a new task"
            value={task}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTask(e.target.value)}
          />
          <button onClick={handleAddTodo}>Add</button>
        </div>
        
      </header>
      <div className="container">
        <div className="row ">
        <div className='col-4'><ul className="todo-list">
           {todos.map((todo, index) => (
            <li key={index}>
              {todo.task}
              <button onClick={() => handleRemoveTodo(index)}> &#x274C;</button>
            </li>
          ))}

        </ul></div>
        </div>
      </div>
     
      
    </div>
  );
}

export default App;
