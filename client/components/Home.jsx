// File: client/components/Home.jsx
// Student: Harshit Madaan
// StudentID: 301493954
// Date: 2025-09-25
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(){
  return (
    <div className="page home">
    <section>
      <h1>Welcome — I'm Harshit</h1>
      <p>Student & aspiring full-stack developer. Mission: Build practical, maintainable web apps that help small businesses.</p>
      <p><Link to="/about"><button>Learn more about me</button></Link></p>
    </section>
    </div>
  );
}
