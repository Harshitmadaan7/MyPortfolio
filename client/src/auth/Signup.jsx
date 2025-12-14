import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../Auth.css";
import API_BASE_URL from "../config";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          created: new Date(),
          updated: new Date(),
        }),
      });
      if (res.ok) {
        alert("Signup successful — you can sign in now!");
        navigate("/signin");
      } else {
        const data = await res.json();
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      alert("Server error");
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />

          <label>Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <button type="submit">Sign Up</button>
        </form>

        <p>Already have an account? <Link to="/signin">Sign In</Link></p>
      </div>
    </div>
  );
}
