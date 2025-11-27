import React from "react";

function TaskCard({ task, navigate, handleDelete, formatDateTime }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md border">
      <h2 className="text-xl font-semibold">{task.title}</h2>
      <p className="text-gray-600 mt-1">{task.description}</p>

      <p className="text-xs text-gray-500 mt-2">
        Created: {formatDateTime(task.createdAt)}
      </p>

      {/* Status + Priority */}
      <div className="mt-3 flex justify-center gap-3 text-sm">
        <span className="px-3 py-1 bg-gray-200 rounded-lg">{task.status}</span>
        <span className="px-3 py-1 bg-gray-200 rounded-lg">{task.priority}</span>
      </div>

      {/* AI Suggestions */}
      {task.suggestions?.length > 0 && (
        <div className="mt-3 text-sm text-gray-700">
          <p className="font-semibold mb-1">AI Suggestions:</p>
          <ul className="list-disc ml-6">
            {task.suggestions.map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Buttons */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => navigate(`/task/${task.id}`)}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900"
        >
          View / Edit
        </button>

        <button
          onClick={() => handleDelete(task.id)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;