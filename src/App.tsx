import React, { useState, useEffect, ChangeEvent } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Todo {
  id: number;
  title: string;
  description: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]') as Todo[];
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const getNextTodoId = () => {
    const storedId = parseInt(localStorage.getItem('todoId') || '0', 10);
    const newId = storedId + 1;
    localStorage.setItem('todoId', newId.toString());
    return newId;
  };

  const handleAddTodo = () => {
    if (task.trim() !== '') {
      const newTodo: Todo = { id: getNextTodoId(), title: task, description };
      setTodos([...todos, newTodo]);
      setTask('');
      setDescription('');
    }
  };

  const handleRemoveTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>TODO App</h1>
        <div className="todo-input">
          <input
            type="text"
            placeholder="Add a title"
            value={task}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTask(e.target.value)}
          />
          <textarea
            placeholder="Add a description"
            value={description}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
          />
          <button onClick={handleAddTodo}>Add</button>
        </div>
      </header>
      <div className="container">
        <div className="row ">
          <div className="col-4">
            <ul className="todo-list">
              {todos.map((todo) => (
                <li key={todo.id}>
                  <strong>{todo.title}</strong>
                  <p>{todo.description}</p>
                  <button onClick={() => handleRemoveTodo(todo.id)}> &#x274C;</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
