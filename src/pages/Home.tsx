import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { technicalEvents, nonTechnicalEvents } from "../data/events";
import CountdownTimer from "./CountdownTimer";

// Dynamic imports for assets
const galleryImages: string[] = Object.values(
  import.meta.glob('../assets/gallery/*.{jpg,png}', { eager: true, import: 'default' })
);

const sponsors: string[] = Object.values(
  import.meta.glob('../assets/sponsors/*.{jpg,png}', { eager: true, import: 'default' })
);

const heroVideo: string = Object.values(
  import.meta.glob('../assets/*.{mp4,webm}', { eager: true, import: 'default' })
)[0] as string;

const faqList = [
  { question: "How do I register?", answer: "Click the Register Now button on the hero section." },
  { question: "What are the event dates?", answer: "The symposium is on 10th - 12th December 2025." },
  { question: "Is there a registration fee?", answer: "No, it’s completely free for students." },
];

const Home: React.FC = () => {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleFAQ = (index: number) => setActiveFAQ(activeFAQ === index ? null : index);
  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="logo">Symposium 2025</div>

        <nav className={`navbar ${isMobileMenuOpen ? "active" : ""}`}>
          <a href="#hero" onClick={toggleMenu}>Home</a>
          <a href="#events" onClick={toggleMenu}>Events</a>
          <a href="#schedule" onClick={toggleMenu}>Schedule</a>
          <a href="#gallery" onClick={toggleMenu}>Gallery</a>
          <a href="#sponsors" onClick={toggleMenu}>Sponsors</a>
          <a href="#faq" onClick={toggleMenu}>FAQ</a>
          <a href="#footer" onClick={toggleMenu}>Contact</a>
        </nav>

        <div className="hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="hero-container">
        <video className="hero-video" autoPlay loop muted>
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="hero-content">
          <h1>FUTURA'2025</h1>
          <p>Explore, Innovate, and Celebrate Knowledge</p>
          <CountdownTimer />
          <a href="#events">
            <button>Register Now</button>
          </a>
        </div>
      </section>

      {/* Events */}
      <section id="events" className="events-container">
        <h2>Technical Events</h2>
        <Link to={`/registersheet`}></Link>
        <div className="cards">
          {technicalEvents.map((event) => (
            <Link key={event.id} to={`/event/${event.id}`}>
              <div className="card">
                <h3>{event.title}</h3>
                <p>{event.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        <h2>Non-Technical Events</h2>
        <div className="cards">
          {nonTechnicalEvents.map((event) => (
            <Link key={event.id} to={`/event/${event.id}`}>
              <div className="card">
                <h3>{event.title}</h3>
                <p>{event.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Schedule */}
      <section id="schedule" className="event-time">
        <h2>Event Schedule</h2>
        <p>
          Symposium Dates: 10th - 12th December 2025
          <br />
          Timings: 9:00 AM - 6:00 PM
        </p>
      </section>

      {/* Gallery */}
      <section id="gallery" className="gallery">
        <h2>Previous Year Highlights</h2>
        <div className="gallery-grid">
          {galleryImages.map((img, idx) => (
            <img key={idx} src={img} alt={`Gallery ${idx + 1}`} />
          ))}
        </div>
      </section>

      {/* Sponsors */}
      <section id="sponsors" className="sponsors">
        <h2>Our Sponsors</h2>
        <div className="sponsor-logos">
          {sponsors.map((logo, idx) => (
            <img key={idx} src={logo} alt={`Sponsor ${idx + 1}`} />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqList.map((faq, idx) => (
            <div key={idx} className="faq-item">
              <div className="faq-question" onClick={() => toggleFAQ(idx)}>
                {faq.question}
              </div>
              {activeFAQ === idx && <div className="faq-answer">{faq.answer}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <section id="footer" className="footer">
        <p>&copy; 2025 College Symposium. All Rights Reserved.</p>
      </section>
    </div>
  );
};

export default Home;
