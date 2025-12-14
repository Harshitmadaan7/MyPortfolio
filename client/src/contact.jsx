// File: client/src/Contact.jsx
// Student: Harshit Madaan
// StudentID: 301493954
// Date: 2025-09-25
// Purpose: Contact form + full CRUD (MongoDB integration)

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "./config";

export default function Contact() {
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/contacts`)
      .then((res) => res.json())
      .then((data) => setContacts(data))
      .catch((err) => console.error("Error loading contacts:", err));
  }, []);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const method = form._id ? "PUT" : "POST";
      const url = form._id
        ? `${API_BASE_URL}/api/contacts/${form._id}`
        : `${API_BASE_URL}/api/contacts`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },

        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert(form._id ? "✅ Contact updated!" : "✅ Contact added!");
        setForm({ firstname: "", lastname: "", email: "" });
        const updated = await fetch(`${API_BASE_URL}/api/contacts`);
        setContacts(await updated.json());
      } else {
        alert("❌ Operation failed");
      }
    } catch (err) {
      console.error("Error saving contact:", err);
    }
  }

  const handleEdit = (contact) => {
    setForm({
      firstname: contact.firstname,
      lastname: contact.lastname,
      email: contact.email,
      _id: contact._id,
    });
  };

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this contact?")) return;

  try {
    const res = await fetch(`${API_BASE_URL}/api/contacts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (res.ok) {
      setContacts(contacts.filter((c) => c._id !== id));
      alert("🗑️ Contact deleted!");
    } else {
      alert("❌ Delete failed (not admin or no token)");
    }
  } catch (err) {
    console.error("Error deleting contact:", err);
  }
};


  return (
    <div className="page" style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <h1>Contact Me</h1>

      <form className="contact-form" onSubmit={handleSubmit}>
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

        <button type="submit" style={{ marginTop: "1rem" }}>
          {form._id ? "Update Contact" : "Add Contact"}
        </button>
      </form>

    {user?.role === "admin" && (
      <div
        className="db-contacts"
        style={{
          background: "#fff",
          color:"black",
          padding: "1.5rem",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          marginTop: "2rem",
        }}
      >
        <h3>Contacts in Database</h3>
        {contacts.length === 0 ? (
          <p>No contacts found.</p>
        ) : (
          <ul>
            {contacts.map((c) => (
              <li
                key={c._id}
                style={{
                  borderBottom: "1px solid #eee",
                  color:"black",                  
                  padding: "0.5rem 0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>
                  <strong>{c.firstname} {c.lastname}</strong> – {c.email}
                </span>
                <span>
                  <button
                    style={{
                      marginRight: "0.5rem",
                      background: "#ffae00",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      padding: "4px 10px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleEdit(c)}
                  >
                    Edit
                  </button>
                  <button
                    style={{
                      background: "#e63946",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      padding: "4px 10px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleDelete(c._id)}
                  >
                    Delete
                  </button>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    )}
    </div>
  );
}
