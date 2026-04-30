import { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 const handleLogin = async () => {

  // ✅ ADD VALIDATION HERE
  if (!email || !password) {
    alert("Email and password required");
    return;
  }

  if (!email.match(/^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)) {
    alert("Invalid email format");
    return;
  }

  try {
    const res = await API.post("/auth/login", { email, password });

    localStorage.setItem("token", res.data.token);
localStorage.setItem("role", res.data.role);

    // (if you already store role, keep that part too)

    navigate("/dashboard");
  } catch (err) {
    alert(err.response?.data || "Login failed");
  }
};

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">

      <div className="bg-white p-8 rounded shadow w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-4"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>

        <p className="text-sm mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;