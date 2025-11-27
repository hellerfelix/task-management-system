import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadTask();
  }, []);

  const loadTask = async () => {
    try {
      const res = await api.get(`/tasks/${id}`);
      setTask(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSuggestionClick = (text) => {
    setTask({ ...task, description: text });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/tasks/${id}`, {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
      });

      setMessage("Task updated successfully!");

      setTimeout(() => navigate("/home"), 1200);
    } catch (err) {
      console.error(err);
      setMessage("Update failed");
    }
  };

  if (!task) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-linear-to-b from-cyan-700 to-blue-900 w-screen">
  <Navbar />
  <div className="pt-15">
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg p-8 rounded-xl">
      <h2 className="text-3xl font-bold mb-5 text-center text-cyan-900 font-serif">Edit Task</h2>

      {message && (
        <p className="text-center text-green-600 font-semibold mb-4">{message}</p>
      )}

      {/* Edit Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          className="w-full p-3 border rounded-lg"
          placeholder="Task Title"
          value={task.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          className="w-full p-3 border rounded-lg"
          placeholder="Description"
          rows="4"
          value={task.description}
          onChange={handleChange}
          required
        ></textarea>

        {/* Status */}
        <select
          name="status"
          className="w-full p-3 border rounded-lg"
          value={task.status}
          onChange={handleChange}
        >
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>

        {/* Priority */}
        <select
          name="priority"
          className="w-full p-3 border rounded-lg"
          value={task.priority}
          onChange={handleChange}
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
          Update Task
        </button>
        <button
          onClick={() => navigate("/home")}
          className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          Back to Home
        </button>
      </form>

      {/* AI Suggestions */}
      {task.suggestions && task.suggestions.length > 0 && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold text-lg">AI Suggestions</h3>
          <ul className="mt-2 space-y-2">
            {task.suggestions.map((s, index) => (
              <li
                key={index}
                className="p-2 bg-white border rounded cursor-pointer hover:bg-blue-50"
                onClick={() => handleSuggestionClick(s)}
              >
                {s}
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-500 mt-2">
            Click a suggestion to apply it instantly.
          </p>
         
    
        </div>
        
      )}
    </div>
    </div>
    </div>
  );
}

export default EditTask;