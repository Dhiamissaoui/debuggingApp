import React, { useState } from 'react';
import './App.css';
import UserProfile from './components/UserProfile';
import TodoList from './components/TodoList';
import Counter from './components/Counter';

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    age: 25
  });

  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Debug with DevTools', completed: false },
    { id: 3, text: 'Build awesome apps', completed: true }
  ]);

  const [counter, setCounter] = useState(0);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(), // Fixed: Use timestamp for unique IDs
      text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const updateUser = (field, value) => {
    setCurrentUser({ ...currentUser, [field]: value });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Debugging Practice App</h1>
        <p>Use React Developer Tools to debug the issues below!</p>
      </header>

      <main className="App-main">
        <UserProfile
          user={currentUser}
          onUpdateUser={updateUser}
        />

        <Counter
          count={counter}
          onIncrement={() => setCounter(counter + 1)}
          onDecrement={() => setCounter(counter - 1)}
          onReset={() => setCounter(0)}
        />

        <TodoList
          todos={todos}
          onAddTodo={addTodo}
          onToggleTodo={toggleTodo}
        />
      </main>
    </div>
  );
}

export default App;
