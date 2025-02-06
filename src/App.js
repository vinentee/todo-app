// App.js
import React, { useState } from 'react';
import './App.css';

function TodoApp() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    const [filter, setFilter] = useState('all');

    const addTodo = (e) => {
        e.preventDefault();
        if (input.trim()) {
            setTodos([...todos, {
                id: Date.now(),
                text: input.trim(),
                completed: false
            }]);
            setInput('');
        }
    };

    const toggleComplete = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    return (
        <div className="todo-app">
            <h1>Lista de Tarefas</h1>

            <form onSubmit={addTodo} className="todo-form">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Adicione uma nova tarefa"
                />
                <button type="submit">Adicionar</button>
            </form>

            <div className="filter-buttons">
                <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>
                    Todas
                </button>
                <button onClick={() => setFilter('active')} className={filter === 'active' ? 'active' : ''}>
                    Ativas
                </button>
                <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>
                    Completas
                </button>
            </div>

            <ul className="todo-list">
                {filteredTodos.map(todo => (
                    <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleComplete(todo.id)}
                        />
                        <span>{todo.text}</span>
                        <button onClick={() => deleteTodo(todo.id)} className="delete-btn">
                            ×
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoApp;