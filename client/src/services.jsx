// File: client/src/Services.jsx
// Student: Harshit Madaan
// StudentID: 301493954
// Date: 2025-09-25
// Purpose: Services + full CRUD + unified card grid

import React, { useState, useEffect } from "react";
import "./index.css";
import API_BASE_URL from "./config";

const staticServices = [
  { title: "Web Development", desc: "React + Vite frontends, REST APIs." },
  { title: "Full-Stack Projects", desc: "Backend using Flask / Node + frontend." },
  { title: "General Programming & Tutoring", desc: "C#, Java, Python basics." }
];

export default function Services() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    title: "",
    desc: "",
  });

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/services`)
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = form._id ? "PUT" : "POST";
      const url = form._id
        ? `${API_BASE_URL}/api/services/${form._id}`
        : `${API_BASE_URL}/api/services`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },

        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert(form._id ? "Service Updated!" : "Service Added!");
        setForm({ title: "", desc: "" });
        const updated = await fetch("http://localhost:5000/api/services");
        setServices(await updated.json());
      } else {
        alert("Failed to save service.");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleEdit = (srv) => {
    setForm({
      title: srv.title,
      desc: srv.desc,
      _id: srv._id,
    });
  };

  const handleDelete = async (id) => {
  if (!window.confirm("Delete this service?")) return;

  try {
    const res = await fetch(`http://localhost:5000/api/services/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (res.ok) {
      setServices(services.filter((s) => s._id !== id));
      alert("Service Deleted!");
    } else {
      alert("❌ Delete failed (not admin or missing token)");
    }
  } catch (err) {
    console.error("Error deleting service:", err);
  }
};


  return (
    <div className="page">
      <h1>Services</h1>

      <div className="services-grid">
        {[...staticServices, ...services].map((srv, idx) => (
          <div className="service-card" key={srv._id ?? idx}>
            <h3>{srv.title}</h3>
            <p>{srv.desc}</p>

            {srv._id &&  user?.role === "admin" && (
              <div style={{ marginTop: "10px" }}>
                <button
                  style={{
                    background: "#ffae00",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    padding: "5px 10px",
                    marginRight: "5px",
                    cursor: "pointer"
                  }}
                  onClick={() => handleEdit(srv)}
                >
                  Edit
                </button>

                <button
                  style={{
                    background: "#e63946",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    padding: "5px 10px",
                    cursor: "pointer"
                  }}
                  onClick={() => handleDelete(srv._id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

    {user?.role === "admin" && (
      <div className="manage-form" style={{ marginTop: "2rem" }}>
        <h2>{form._id ? "Edit Service" : "Add New Service"}</h2>

        <form onSubmit={handleSubmit}>
          <label>Service Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <label>Description</label>
          <textarea
            name="desc"
            value={form.desc}
            onChange={handleChange}
            rows={3}
            required
          />

          <button type="submit" style={{ marginTop: "1rem" }}>
            {form._id ? "Update Service" : "Add Service"}
          </button>
        </form>
      </div>
    )}
    </div>
  );
}
