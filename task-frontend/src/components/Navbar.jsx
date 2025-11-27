import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-cyan-700 shadow-md px-6 py-4 flex justify-between items-center">
      <h1
        className="text-xl font-bold cursor-pointer text-cyan-400 font-serif"
        onClick={() => navigate("/home")}
      >
        Task Manager
      </h1>
      

      <div className="flex items-center gap-4">
      <button onClick={() => navigate("/dashboard")} 
      className="bg-cyan-600 text-white px-3 py-2 rounded-lg hover:bg-cyan-800">
      Dashboard
      </button>
       

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;