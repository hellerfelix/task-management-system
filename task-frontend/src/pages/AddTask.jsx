import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

function AddTask() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "TODO",
    priority: "LOW",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("accessToken");

      const res = await api.post("/tasks", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("Task created successfully!");

      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error) {
      console.error(error);
      setMessage("Failed to create task");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-cyan-700 to-blue-900 w-screen">
      <Navbar />

      <div className="flex justify-center items-center py-12 px-4">
        <div className="bg-white p-8 shadow-xl rounded-2xl w-full max-w-lg border border-gray-200">

          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Create a New Task
          </h2>

          {message && (
            <p className="mb-4 text-center text-green-600 font-semibold">
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Title */}
            <input
              name="title"
              placeholder="Task Title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              required
            />

            {/* Description */}
            <textarea
              name="description"
              placeholder="Write task description here..."
              value={form.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              rows="4"
              required
            />

            {/* Status Dropdown */}
            <div>
              <label className="text-sm font-semibold text-gray-600">
                Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>

            {/* Priority Dropdown */}
            <div>
              <label className="text-sm font-semibold text-gray-600">
                Priority
              </label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => navigate("/home")}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
              >
                Back to Home
              </button>

              <button
                type="submit"
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-semibold shadow-sm"
              >
                Add Task
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTask;