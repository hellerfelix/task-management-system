import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ========== BASIC ANALYTICS ==========
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "COMPLETED").length;
  const pending = total - completed;

  const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

  // ======== CHART DATA ========
  const statusData = [
    { name: "TODO", value: tasks.filter((t) => t.status === "TODO").length },
    { name: "IN_PROGRESS", value: tasks.filter((t) => t.status === "IN_PROGRESS").length },
    { name: "COMPLETED", value: tasks.filter((t) => t.status === "COMPLETED").length },
  ];

  const priorityData = [
    { name: "LOW", value: tasks.filter((t) => t.priority === "LOW").length },
    { name: "MEDIUM", value: tasks.filter((t) => t.priority === "MEDIUM").length },
    { name: "HIGH", value: tasks.filter((t) => t.priority === "HIGH").length },
  ];

  const COLORS = ["#60A5FA", "#FB923C", "#34D399"];

  return (
    <div className="min-h-screen bg-linear-to-b from-cyan-700 to-blue-900 text-white w-screen">
      <Navbar />

      <div className="p-6 max-w-6xl mx-auto pt-28">
        
      <div className="flex justify-between items-center mb-8">
  
  <h1 className="text-3xl font-bold">
    Task Analytics Dashboard
  </h1>

  <button
    onClick={() => window.location.href = "/home"}
    className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 backdrop-blur-md"
  >
    ← Back to Home
  </button>

</div>

        {/* ------- TOP CARDS ------- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/10 p-6 rounded-xl shadow-lg backdrop-blur-md">
            <h2 className="text-lg">Total Tasks</h2>
            <p className="text-3xl font-bold">{total}</p>
          </div>

          <div className="bg-white/10 p-6 rounded-xl shadow-lg backdrop-blur-md">
            <h2 className="text-lg">Completed</h2>
            <p className="text-3xl font-bold">{completed}</p>
          </div>

          <div className="bg-white/10 p-6 rounded-xl shadow-lg backdrop-blur-md">
            <h2 className="text-lg">Completion Rate</h2>
            <p className="text-3xl font-bold">{completionRate}%</p>
          </div>
        </div>

        {/* ------- CHART SECTION ------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          
          {/* Status Pie Chart */}
          <div className="bg-white rounded-xl p-6 shadow-lg text-black">
            <h2 className="text-xl font-bold mb-4">Tasks by Status</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
              <Tooltip
      formatter={(value, name) => [`${value} Tasks`, name.replace("_", " ")]}
    />
    
    <Legend />
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {statusData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Priority Bar Chart */}
          <div className="bg-white rounded-xl p-6 shadow-lg text-black">
            <h2 className="text-xl font-bold mb-4">Tasks by Priority</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={priorityData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#60A5FA" />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* ------- RECENT TASKS ------- */}
        <div className="bg-white/10 p-6 rounded-xl shadow-lg backdrop-blur-md">
          <h2 className="text-xl font-bold mb-4 font-serif">Recent Tasks</h2>

          {tasks.slice(-5).map((t) => (
            <div
              key={t.id}
              className="bg-white/20 p-3 rounded-lg mb-3 flex justify-between"
            >
              <span>{t.title}</span>
              <span className="text-sm opacity-80">{t.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;