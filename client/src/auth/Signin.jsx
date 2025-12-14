import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../Auth.css";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("http://localhost:5000/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      
      localStorage.setItem("token", data.token);

      localStorage.setItem("user", JSON.stringify(data.user));

      alert(`Login successful! Welcome ${data.user.name}`);

      navigate("/");
    } else {
      alert(data.message || "Invalid credentials");
    }
  } catch (err) {
    console.error(err);
    alert("Network error");
  }
};


  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <label>Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <button type="submit">Sign In</button>
        </form>

        <p>Don’t have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  );
}
