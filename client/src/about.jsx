// File: client/src/About.jsx
// Student: Harshit Madaan
// StudentID: 301493954
// Date: 2025-09-25
// Purpose: About me page for portfolio

import React from 'react';

export default function About(){
  return (
    <div className="page">
    <div className="about-page">
      <h1>About Me</h1>
      <div className="about-container">
        <img src="/headshot.jpg" alt="Harshit headshot" className="headshot"/>
        <div className="about-text">
          <h2>Harshit Madaan</h2>
          <p>
            I'm a Software Engineering Technician student at Centennial College.
            I build web apps with React and have experience with Java, C# and cloud concepts.
            My mission is to craft clean, modern, and user-focused web applications that blend creativity with solid engineering. I aim to continuously grow as a full-stack developer, turning ideas into reliable digital experiences that help people and businesses succeed..
          </p>

          <p>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Download my Resume (PDF)</a>
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}
