import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadTask = async () => {
    try {
      const res = await api.get(`/tasks/${id}`);
      setTask(res.data);
    } catch (err) {
      console.error("Error fetching task:", err);
      if (err.response?.status === 401) navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTask();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!task) return <p className="text-center mt-10">Task not found.</p>;

  return (
    <div className="min-h-screen bg-linear-to-b from-cyan-700 to-blue-900 w-screen">
      <Navbar />

      {/* FIX: Add padding top here so content stays below navbar */}
      <div className="pt-24">

        {/* Task Details Header */}
        <div className="max-w-2xl mx-auto bg-white shadow-lg p-8 rounded-xl text-3xl font-bold font-serif text-cyan-900 mb-6">
          Task Details
        </div>

        {/* Task Main Content */}
        <div className="max-w-2xl mx-auto bg-white shadow-lg p-8 rounded-xl">
          <h1 className="text-2xl font-bold mb-4">{task.title}</h1>

          <p className="text-gray-700 mb-4">{task.description}</p>

          <div className="flex gap-3 mb-4">
            <span className="px-3 py-1 bg-gray-200 rounded-lg font-semibold">
              Status: {task.status}
            </span>
            <span className="px-3 py-1 bg-gray-200 rounded-lg font-semibold">
              Priority: {task.priority}
            </span>
          </div>

          <p className="text-sm text-gray-500">
            Created: {new Date(task.createdAt).toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Updated: {new Date(task.updatedAt).toLocaleString()}
          </p>

          {/* AI Suggestions */}
          {task.suggestions && task.suggestions.length > 0 && (
            <div className="mt-6 bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold text-lg">AI Suggestions</h3>

              <ul className="mt-2 space-y-2">
                {task.suggestions.map((s, index) => (
                  <li
                    key={index}
                    className="p-2 bg-white border rounded cursor-pointer hover:bg-blue-50"
                    onClick={() => navigator.clipboard.writeText(s)}
                  >
                    {s}
                  </li>
                ))}
              </ul>

              <p className="text-xs text-gray-500 mt-2">
                Click a suggestion to copy it.
              </p>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <button
              onClick={() => navigate(`/edit-task/${task.id}`)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Edit Task
            </button>

            <button
              onClick={() => navigate("/home")}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
            >
              Back to Home
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default TaskDetails;