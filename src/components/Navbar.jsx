import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center shadow">

      {/* Left Side */}
      <div className="flex gap-3">
        <Link
          to="/dashboard"
          className="bg-gray-700 px-4 py-2 rounded hover:bg-blue-500 transition"
        >
          Dashboard
        </Link>

        <Link
          to="/projects"
          className="bg-gray-700 px-4 py-2 rounded hover:bg-blue-500 transition"
        >
          Projects
        </Link>

        <Link
          to="/tasks"
          className="bg-gray-700 px-4 py-2 rounded hover:bg-blue-500 transition"
        >
          Tasks
        </Link>
      </div>

      {/* Right Side */}
      <button
        onClick={logout}
        className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;