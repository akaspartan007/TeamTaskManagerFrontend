import { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    adminKey: "",
  });
 const validate = () => {
  if (!data.email.match(/^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)) {
    return "Invalid email format";
  }

  if (!data.password || data.password.trim() === "") {
    return "Password required";
  }

  // ❌ block 000000, 111111 etc
  if (/^(.)\1+$/.test(data.password)) {
    return "Password too weak";
  }

  if (data.password.length < 6) {
    return "Password must be at least 6 characters";
  }

  if (!/[A-Z]/.test(data.password)) {
    return "Must contain uppercase letter";
  }

  if (!/[a-z]/.test(data.password)) {
    return "Must contain lowercase letter";
  }

  if (!/[0-9]/.test(data.password)) {
    return "Must contain number";
  }

  if (!/[@#$%^&+=!]/.test(data.password)) {
    return "Must contain special character";
  }

  return null;
};
  const handleSignup = async () => {

    const error = validate(); // 👈 CALL IT

    if (error) {
      alert(error);
      return;
    } 
    try {
      await API.post("/auth/signup", data);
      alert("Signup successful");
      navigate("/");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">

      <div className="bg-white p-8 rounded shadow w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Name"
          onChange={(e) => setData({...data, name: e.target.value})}
        />

        <input
          className="border p-2 w-full mb-3"
          placeholder="Email"
          onChange={(e) => setData({...data, email: e.target.value})}
        />

        <input
          className="border p-2 w-full mb-3"
          type="password"
          placeholder="Password"
          onChange={(e) => setData({...data, password: e.target.value})}
        />

        {/* 🔐 Admin Key */}
        <input
          className="border p-2 w-full mb-3"
          placeholder="Admin Key (optional)"
          onChange={(e) => setData({...data, adminKey: e.target.value})}
        />

        <button
          onClick={handleSignup}
          className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600"
        >
          Signup
        </button>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;