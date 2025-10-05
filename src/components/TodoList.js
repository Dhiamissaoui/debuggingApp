import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TodoList = ({ todos, onAddTodo, onToggleTodo }) => {
    const [newTodoText, setNewTodoText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newTodoText.trim()) {
            onAddTodo(newTodoText.trim());
            setNewTodoText('');
        }
    };

    const handleInputChange = (e) => {
        setNewTodoText(e.target.value);
    };

    const completedCount = todos.filter(todo => todo.completed).length;
    const totalCount = todos.length;

    return (
        <div className="todo-list">
            <h2>Todo List</h2>

            <form onSubmit={handleSubmit} className="add-todo-form">
                <input
                    type="text"
                    value={newTodoText}
                    onChange={handleInputChange}
                    placeholder="Add a new todo..."
                />
                <button type="submit">Add Todo</button>
            </form>

            <div className="todo-stats">
                <p>Total: {totalCount} | Completed: {completedCount} | Remaining: {totalCount - completedCount}</p>
            </div>

            <div className="todo-items">
                {todos.length === 0 ? (
                    <p>No todos yet. Add one above!</p>
                ) : (
                    todos.map(todo => (
                        <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => onToggleTodo(todo.id)}
                            />
                            <span className="todo-text">{todo.text}</span>
                            <span className="todo-id">ID: {todo.id}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

// Fixed: Added prop validation
TodoList.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            text: PropTypes.string.isRequired,
            completed: PropTypes.bool.isRequired
        })
    ).isRequired,
    onAddTodo: PropTypes.func.isRequired,
    onToggleTodo: PropTypes.func.isRequired
};

export default TodoList;
