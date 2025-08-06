import React, { useState, useEffect } from "react";
import axios from "axios";

const API = "https://merna-backend1.onrender.com/tasks"; // Your backend endpoint

function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(API)
      .then(res => setTasks(res.data))
      .catch(err => console.error("❌ Error fetching tasks:", err));
  }, []);

  const addTask = () => {
    if (!input.trim()) return;

    axios.post(API, { text: input })
      .then(res => {
        setTasks([...tasks, res.data]);
        setInput("");
      })
      .catch(err => console.error("❌ Error adding task:", err));
  };

  const deleteTask = (id) => {
    axios.delete(`${API}/${id}`)
      .then(() => setTasks(tasks.filter(task => task._id !== id)))
      .catch(err => console.error("❌ Error deleting task:", err));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📝 To-Do List</h2>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter task..."
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            {task.text}
            <button onClick={() => deleteTask(task._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
