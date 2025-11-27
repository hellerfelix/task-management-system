import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard"; 
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Date formatting
  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Delete task
  const handleDelete = async (taskId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter((t) => t.id !== taskId));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // Filtering logic
  const filteredTasks = tasks.filter((task) => {
    const searchMatch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());

    const statusMatch =
      statusFilter === "ALL" || task.status === statusFilter;

    const priorityMatch =
      priorityFilter === "ALL" || task.priority === priorityFilter;

    return searchMatch && statusMatch && priorityMatch;
  });

  // Split tasks into active and completed
  const activeTasks = filteredTasks.filter(
    (task) => task.status !== "COMPLETED"
  );

  const completedTasks = filteredTasks.filter(
    (task) => task.status === "COMPLETED"
  );

  return (
    <div className="min-h-screen bg-linear-to-b from-cyan-700 to-blue-900 w-screen">
      <Navbar />

      <div className="p-6 max-w-5xl mx-auto pt-24">
        <h1 className="text-3xl font-bold mb-6 text-blue-100 font-serif">
          My Tasks
        </h1>

        {/*Search + Filters + Add Button */}
        <div className="flex flex-wrap gap-4 mb-6 items-center">

          {/* Search */}
          <input
            type="text"
            placeholder="Search tasks..."
            className="flex-1 min-w-[180px] p-3 border rounded-lg bg-white shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Status Filter */}
          <select
            className="p-3 border rounded-lg bg-white shadow-sm min-w-[150px]"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Status</option>
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>

          {/* Priority Filter */}
          <select
            className="p-3 border rounded-lg bg-white shadow-sm min-w-[150px]"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="ALL">All Priority</option>
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>

          {/* Add Button */}
          <button
            onClick={() => navigate("/add-task")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 whitespace-nowrap"
          >
            + Add Task
          </button>

        </div>

        {/* ACTIVE TASKS */}
        <h2 className="text-2xl font-semibold text-white mb-3">
          Active Tasks
        </h2>

        <div className="grid gap-4">
          {activeTasks.length === 0 ? (
            <p className="text-gray-200">No active tasks</p>
          ) : (
            activeTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                navigate={navigate}
                handleDelete={handleDelete}
                formatDateTime={formatDateTime}
              />
            ))
          )}
        </div>

        {/* COMPLETED TASKS */}
        <h2 className="text-2xl font-semibold text-white mt-10 mb-3">
          Completed Tasks
        </h2>

        <div className="grid gap-4">
          {completedTasks.length === 0 ? (
            <p className="text-gray-200">No completed tasks</p>
          ) : (
            completedTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                navigate={navigate}
                handleDelete={handleDelete}
                formatDateTime={formatDateTime}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;