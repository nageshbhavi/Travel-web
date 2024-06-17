import React from "react";
import "./About.css";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import teamData from "./team.json"; // Importing team data from a JSON file

const About = () => {
  return (
    <>
    <Navbar />
    <div className="about-container">
      <section className="intro-section">
        <h1>About Us</h1>
        <p>Welcome to Your Travel Diary! We are a community of travel enthusiasts dedicated to sharing and discovering amazing travel experiences.</p>
      </section>

      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>Our mission is to inspire and guide travelers from all around the world by providing a platform where they can share their journeys and gain insights from others. We aim to create a global community that celebrates the spirit of adventure and exploration.</p>
      </section>

      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-cards">
          {teamData.map((member) => (
            <div key={member.id} className="team-card">
              <img src={member.image} alt={member.name} />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              <p>{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="contact-section">
        <h2>Contact Us</h2>
        <p>If you have any questions, suggestions, or just want to say hello, feel free to reach out to us at:</p>
        <p>Email: contact@yourtraveldiary.com</p>
        <p>Phone: +123-456-7890</p>
        <p>Address: 123 Travel Street, Adventure City, World</p>
      </section>
    </div>
    <Footer/>
    </>
  );
};

export default About;
