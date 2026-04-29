import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";

function Projects() {

  // 🔐 Get role
  const role = localStorage.getItem("role");

  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const fetchProjects = () => {
    API.get("/projects").then(res => setProjects(res.data));
  };

  const fetchUsers = () => {
    API.get("/users").then(res => setUsers(res.data));
  };

  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, []);

  const toggleUser = (id) => {
    setSelectedUsers(prev =>
      prev.includes(id)
        ? prev.filter(u => u !== id)
        : [...prev, id]
    );
  };

  const [loading, setLoading] = useState(false);

const createProject = async () => {
  if (!name) return;

  try {
    setLoading(true);

    await API.post("/projects", {
      name,
      members: selectedUsers.map(id => ({ id }))
    });

    setName("");
    setSelectedUsers([]);
    fetchProjects();
  } catch (err) {
    alert(err.response?.data || "Error creating project");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="p-6 max-w-6xl mx-auto">

        <h1 className="text-2xl font-semibold text-slate-800 mb-6">
          Projects
        </h1>

        {/* 👇 SHOW MESSAGE FOR MEMBERS */}
        {role !== "ADMIN" && (
          <p className="text-sm text-slate-500 mb-4">
            You have view-only access to projects
          </p>
        )}

        {/* 👇 CREATE PROJECT ONLY FOR ADMIN */}
        {role === "ADMIN" && (
          <div className="bg-white border shadow-sm rounded-xl p-5 mb-6">
            <h2 className="font-medium text-slate-700 mb-3">
              Create Project
            </h2>

            <input
              className="border rounded p-2 w-full mb-4"
              placeholder="Project name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <p className="text-sm text-slate-500 mb-2">
              Team Members
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
              {users.map(u => (
                <label
                  key={u.id}
                  className={`border rounded p-2 cursor-pointer text-sm ${
                    selectedUsers.includes(u.id)
                      ? "bg-slate-200"
                      : "bg-slate-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={() => toggleUser(u.id)}
                  />
                  {u.name}
                </label>
              ))}
            </div>

            <button
  onClick={createProject}
  disabled={loading}
  className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700 disabled:opacity-50"
>
  {loading ? "Creating..." : "Create"}
</button>
          </div>
        )}

        {/* PROJECT LIST */}
        <div className="grid md:grid-cols-2 gap-4">
          {projects.map(p => (
            <div
              key={p.id}
              className="bg-white border shadow-sm rounded-xl p-4"
            >
              <h3 className="font-medium text-slate-800">
                {p.name}
              </h3>

              <div className="flex flex-wrap gap-2 mt-3">
                {p.members?.length ? (
                  p.members.map(m => (
                    <div className="flex items-center gap-1">
  <span
    className="bg-slate-200 text-slate-700 text-xs px-2 py-1 rounded"
  >
    {m.name}
  </span>

  {role === "ADMIN" && (
    <button
      onClick={async () => {
        await API.put(`/projects/${p.id}/remove-member/${m.id}`);
        fetchProjects();
      }}
      className="text-red-500 text-xs"
    >
      ✕
    </button>
  )}
</div>
                  ))
                ) : (
                  <span className="text-slate-400 text-sm">
                    No members
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Projects;