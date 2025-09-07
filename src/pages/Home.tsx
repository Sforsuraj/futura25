import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { technicalEvents, nonTechnicalEvents } from "../data/events";
import CountdownTimer from "./CountdownTimer";
import logo from '../assets/logo.png';

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
  { question: "Will lunch be provided ?", answer: "Yes. Lunch will be provided to all the participants." },
  { question: "Reporting time ?", answer: "Participants should report at 9.00 AM" },
  { question: "How many events can a participant participate in ?", answer: "A participant who have registered for coding event can participate in one non-technical event. If participants in coding event do not advance to the second round, they will have the opportunity to participate in a non-technical event of their choice." },
  { question: "Is there any registration fee ?", answer: "No. There is no registration fee." },
  { question: "Will there be any certificates ?", answer: "Yes. Certificates will be provided to all the participants." },
  { question: "Is Guardian allowed ?", answer: "No, only the participants are allowed." },
  { question: "Will OD recommendation letters be provided ?", answer: "No recommendation letter will be provided instead you will receive an invite from our side after registration." },
  { question: "Dress Code ?", answer: "Formal Dress Code is mandatory and participants without their ID cards are not allowed." },
  { question: "Need to bring Laptops ?", answer: "Yes, Participants who're participating in Technical events must bring their Laptops." },
];

const scheduleList=[
  {time:"09:00 AM",action:"Assembly"},
  {time:"09:15 AM",action:"Inaugural Ceremony"},
  {time:"10:00 AM",action:"Start of Technical Events"},
  {time:"11:15 AM",action:"End of First Round for Coding Event"},
  {time:"11:15 AM",action:"Snacks Break"},
  {time:"11:30 AM",action:"Start of Non-Technical Events and Next Round of Coding Event"},
  {time:"01:00 PM",action:"End of All Events"},
  {time:"01:15 PM",action:"Lunch Break"},
  {time:"02:30 PM",action:"Assembly for Valedictory"},
  {time:"02:45 PM",action:"Valedictory Ceremony"},
  {time:"04:00 PM",action:"Event Conclusion"},
]

const Home: React.FC = () => {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleFAQ = (index: number) => setActiveFAQ(activeFAQ === index ? null : index);
  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        {/*<div className="logo"></div>*/}
        <img src={logo} style={{width:120}}></img>
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
        {scheduleList.map((item, idx) => (
          <div key={idx} className="time-item">
            <span className="time">{item.time}</span>
            <span className="action">{item.action}</span>
          </div>
        ))}
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
