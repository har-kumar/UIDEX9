import React, { useState, useEffect } from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [input, setInput] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput("");
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleEditTodo = (id, text) => {
    setIsEditing(id);
    setEditText(text);
  };

  const handleSaveEdit = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, text: editText } : todo
      )
    );
    setIsEditing(null);
    setEditText("");
  };

  return (
    <div className="todo-app" style={styles.app}>
      <h2 style={styles.header}>Todo List</h2>
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Add a new todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleAddTodo} style={styles.addButton}>Add Todo</button>
      </div>
      <ul style={styles.todoList}>
        {todos.map(todo => (
          <li key={todo.id} style={styles.todoItem(todo.completed)}>
            {isEditing === todo.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={styles.editInput}
                />
                <button onClick={() => handleSaveEdit(todo.id)} style={styles.saveButton}>Save</button>
              </>
            ) : (
              <>
                <span
                  onClick={() => handleToggleComplete(todo.id)}
                  style={styles.todoText(todo.completed)}
                >
                  {todo.text}
                </span>
                <button onClick={() => handleEditTodo(todo.id, todo.text)} style={styles.editButton}>Edit</button>
                <button onClick={() => handleDeleteTodo(todo.id)} style={styles.deleteButton}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  app: {
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  },
  header: {
    fontSize: '2rem',
    color: '#333',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '16px',
  },
  input: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    width: '200px',
  },
  addButton: {
    padding: '8px 16px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  todoList: {
    listStyleType: 'none',
    padding: 0,
    width: '280px',
  },
  todoItem: (completed) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px',
    borderRadius: '4px',
    marginBottom: '8px',
    backgroundColor: completed ? '#d1ffd1' : '#f9f9f9',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  }),
  todoText: (completed) => ({
    textDecoration: completed ? 'line-through' : 'none',
    cursor: 'pointer',
    flex: 1,
  }),
  editButton: {
    marginLeft: '8px',
    backgroundColor: '#ffc107',
    border: 'none',
    color: '#fff',
    padding: '4px 8px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  deleteButton: {
    marginLeft: '8px',
    backgroundColor: '#dc3545',
    border: 'none',
    color: '#fff',
    padding: '4px 8px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  editInput: {
    padding: '4px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    flex: 1,
    marginRight: '8px',
  },
  saveButton: {
    backgroundColor: '#007bff',
    border: 'none',
    color: '#fff',
    padding: '4px 8px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default TodoApp;
