// File: client/src/Projects.jsx
// Student: Harshit Madaan
// StudentID: 301493954
// Date: 2025-09-25
// Purpose: Projects showcase + backend integration + unified project grid

import React, { useState, useEffect } from "react";
import "./index.css";
import API_BASE_URL from "./config";


const staticProjects = [
  {
    title: "Sales Promotion Tracker",
    image: "/sales-promo.png",
    role: "Frontend + integration",
    description:
      "Built with Flask + React — tracks promotions and generates reports.",
  },
  {
    title: "Tools Pro Website",
    image: "/tools-pro.png",
    role: "Full stack — WordPress setup & custom theme",
    description:
      "E-commerce style product catalogue, enquiry form and admin pages.",
  },
  {
    title: "Table Generator",
    image: "/table-generator.png",
    role: "Full Stack",
    description: "Website to draw table, built with JS-DOM",
  },
];

export default function Projects() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    firstname: "",
    lastname: "",
    email: "",
    completion: "",
    description: "",
  });

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/projects`)
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = form._id ? "PUT" : "POST";
      const url = form._id
        ? `${API_BASE_URL}/api/projects/${form._id}`
        : `${API_BASE_URL}/api/projects`;

      const res = await fetch(url, {
        method,
        headers: {
           "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert(form._id ? "✅ Project updated!" : "✅ Project added!");
        setForm({
          title: "",
          firstname: "",
          lastname: "",
          email: "",
          completion: "",
          description: "",
        });
        const updated = await fetch(`${API_BASE_URL}/api/projects`);
        setProjects(await updated.json());
      } else {
        alert("❌ Operation failed");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this project?")) return;

  try {
    const res = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (res.ok) {
      setProjects(projects.filter((p) => p._id !== id));
      alert("🗑️ Project deleted!");
    } else {
      alert("❌ Delete failed (not admin or missing token)");
    }
  } catch (err) {
    console.error("Error deleting project:", err);
  }
};

  const handleEdit = (project) => {
    setForm({
      title: project.title,
      firstname: project.firstname,
      lastname: project.lastname,
      email: project.email,
      completion: project.completion?.substring(0, 10),
      description: project.description,
      _id: project._id,
    });
  };

  return (
    <section className="projects-page">
      <h1 className="projects-header">Projects</h1>

      <div className="projects-grid">
        {[...staticProjects, ...projects].map((p, idx) => (
          <article key={p._id ?? idx} className="project-card">
            <img
              src={p.image || "/placeholder.png"}
              alt={p.title}
              className="project-img"
            />

            <h3>{p.title}</h3>

            {p.role && <p><strong>Role:</strong> {p.role}</p>}

            <p>{p.description}</p>

            {p.completion && (
              <p>
                <strong>Completed:</strong>{" "}
                {p.completion.substring(0, 10)}
              </p>
            )}

            {p._id &&  user?.role === "admin" && (
              <div style={{ marginTop: "1rem" }}>
                <button
                  style={{
                    background: "#ffae00",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    padding: "6px 12px",
                    cursor: "pointer",
                    marginRight: "0.5rem",
                  }}
                  onClick={() => handleEdit(p)}
                >
                  Edit
                </button>

                <button
                  style={{
                    background: "#e63946",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    padding: "6px 12px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDelete(p._id)}
                >
                  Delete
                </button>
              </div>
            )}
          </article>
        ))}
      </div>

    {user?.role === "admin" && (
      <div className="manage-form">
        <h2>Add a New Project</h2>
        <form onSubmit={handleSubmit}>
          <label>Project Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <label>First Name</label>
          <input
            name="firstname"
            value={form.firstname}
            onChange={handleChange}
            required
          />

          <label>Last Name</label>
          <input
            name="lastname"
            value={form.lastname}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Completion Date</label>
          <input
            type="date"
            name="completion"
            value={form.completion}
            onChange={handleChange}
          />

          <label>Description</label>
          <textarea
            name="description"
            rows={3}
            value={form.description}
            onChange={handleChange}
          />

          <button type="submit">
            {form._id ? "Update Project" : "Add Project"}
          </button>
        </form>
      </div>
    )}
    </section>
  );
}
