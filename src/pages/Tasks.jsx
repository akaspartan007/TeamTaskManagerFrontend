import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  const [title, setTitle] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedProject, setSelectedProject] = useState("");

  const fetchAll = async () => {
    const t = await API.get("/tasks");
    const u = await API.get("/users");
    const p = await API.get("/projects");

    setTasks(t.data);
    setUsers(u.data);
    setProjects(p.data);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const createTask = async () => {
    if (!title) return;

    await API.post("/tasks", {
      title,
      status: "TODO",
      assignedTo: selectedUser ? { id: selectedUser } : null,
      project: selectedProject ? { id: selectedProject } : null,
    });

    setTitle("");
    setSelectedUser("");
    setSelectedProject("");
    fetchAll();
  };

  const updateStatus = async (id, status) => {
    await API.put(`/tasks/${id}`, { status });
    fetchAll();
  };

  const statusStyle = (status) => {
    return "bg-slate-200 text-slate-700";
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="p-6 max-w-6xl mx-auto">

        <h1 className="text-2xl font-semibold text-slate-800 mb-6">
          Tasks
        </h1>

        {/* CREATE */}
        <div className="bg-white border shadow-sm rounded-xl p-5 mb-6">
          <h2 className="font-medium text-slate-700 mb-3">
            Create Task
          </h2>

          <input
            className="border p-2 rounded w-full mb-3"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="flex flex-col md:flex-row gap-3 mb-3">
            <select
              className="border p-2 rounded w-full"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">Assign User</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>

            <select
              className="border p-2 rounded w-full"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
            >
              <option value="">Select Project</option>
              {projects.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={createTask}
            className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700"
          >
            Add Task
          </button>
        </div>

        {/* LIST */}
        <div className="grid md:grid-cols-2 gap-4">
          {tasks.map(t => (
            <div
              key={t.id}
              className="bg-white border shadow-sm rounded-xl p-4"
            >
              <h3 className="font-medium text-slate-800 mb-2">
                {t.title}
              </h3>

              <span className={`text-xs px-2 py-1 rounded ${statusStyle(t.status)}`}>
                {t.status}
              </span>

              <div className="text-sm text-slate-500 mt-3 space-y-1">
                <p>👤 {t.assignedTo?.name || "Unassigned"}</p>
                <p>📁 {t.project?.name || "No Project"}</p>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => updateStatus(t.id, "IN_PROGRESS")}
                  className="border px-3 py-1 rounded text-sm hover:bg-slate-200"
                >
                  Start
                </button>

                <button
                  onClick={() => updateStatus(t.id, "DONE")}
                  className="border px-3 py-1 rounded text-sm hover:bg-slate-200"
                >
                  Done
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Tasks;