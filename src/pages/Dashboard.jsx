import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [data, setData] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    API.get("/dashboard").then((res) => setData(res.data));
    API.get("/tasks").then((res) => setTasks(res.data.slice(0, 5)));
  }, []);

  if (!data) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="p-6 max-w-7xl mx-auto">

        {/* HEADER */}
        <h1 className="text-3xl font-semibold text-slate-800 mb-6">
          Dashboard
        </h1>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

          <div className="bg-white p-5 rounded-xl shadow-sm border">
            <p className="text-sm text-slate-500">Total Tasks</p>
            <h2 className="text-3xl font-semibold text-slate-800">
              {data.totalTasks}
            </h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border">
            <p className="text-sm text-slate-500">Todo</p>
            <h2 className="text-3xl font-semibold text-slate-700">
              {data.todo}
            </h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border">
            <p className="text-sm text-slate-500">In Progress</p>
            <h2 className="text-3xl font-semibold text-slate-700">
              {data.inProgress}
            </h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border">
            <p className="text-sm text-slate-500">Done</p>
            <h2 className="text-3xl font-semibold text-slate-700">
              {data.done}
            </h2>
          </div>

        </div>

        {/* OVERDUE ALERT */}
        {data.overdue > 0 && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg mb-6">
            ⚠ {data.overdue} overdue tasks need attention
          </div>
        )}

        {/* RECENT TASKS */}
        <div className="bg-white p-5 rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Recent Tasks
          </h2>

          {tasks.length === 0 ? (
            <p className="text-slate-500">No tasks yet</p>
          ) : (
            <div className="space-y-3">
              {tasks.map((t) => (
                <div
                  key={t.id}
                  className="flex justify-between items-center border-b pb-2 last:border-none"
                >
                  <div>
                    <p className="font-medium text-slate-800">
                      {t.title}
                    </p>
                    <p className="text-sm text-slate-500">
                      {t.assignedTo?.name || "Unassigned"}
                    </p>
                  </div>

                  {/* STATUS */}
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      t.status === "DONE"
                        ? "bg-slate-200 text-slate-700"
                        : t.status === "IN_PROGRESS"
                        ? "bg-slate-300 text-slate-800"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;