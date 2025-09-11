import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { technicalEvents, nonTechnicalEvents } from "../data/events";
import CountdownTimer from "./CountdownTimer";
import logo from "../assets/logo.png";
import title from  "../assets/title.png";

// Dynamic imports for assets
const galleryImages: string[] = Object.values(
  import.meta.glob("../assets/gallery/*.{jpg,png,JPG}", { eager: true, import: "default" })
);


const sponsors: string[] = Object.values(
  import.meta.glob("../assets/sponsors/*.{jpg,png}", { eager: true, import: "default" })
);

const heroVideo: string = Object.values(
  import.meta.glob("../assets/*.{mp4,webm}", { eager: true, import: "default" })
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
  { question: "Is On-Spot Registration Available?", answer: "No, Unfortunately On-Spot Registrations aren't Available" },
];

const scheduleList = [
  { time: "09:00 AM", action: "Assembly" },
  { time: "09:15 AM", action: "Inaugural Ceremony" },
  { time: "10:00 AM", action: "Start of Technical Events" },
  { time: "11:15 AM", action: "End of First Round for Coding Event" },
  { time: "11:15 AM", action: "Snacks Break" },
  { time: "11:30 AM", action: "Start of Non-Technical Events and Next Round of Coding Event" },
  { time: "01:00 PM", action: "Lunch Break" },
  { time: "02:00 PM", action: "Assembly for Valedictory" },
  { time: "02:30 PM", action: "Valedictory Ceremony" },
  { time: "04:00 PM", action: "Event Conclusion" },
];

const Home: React.FC = () => {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Gallery state
  const [activeIndex, setActiveIndex] = useState(0);

  // Infinite auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % galleryImages.length);
    }, 3000); // every 3s
    return () => clearInterval(interval);
  }, []);

  const toggleFAQ = (index: number) => setActiveFAQ(activeFAQ === index ? null : index);
  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Circular access helper
  const getImage = (offset: number) => {
    const index = (activeIndex + offset + galleryImages.length) % galleryImages.length;
    return galleryImages[index];
  };

  return (
    <div className="App">
      <video className="background-video" autoPlay loop muted>
        <source src={heroVideo} type="video/mp4" />
      </video>
      {/* Header */}
      <header className="header">
        <img src={logo} style={{ width: 120 }} />
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
        <div className="hero-content">
          <img src={title} style={{width:"100%"}} />
          <p>Explore, Innovate, and Celebrate Knowledge</p>
          <CountdownTimer />
          <a href="#events">
            <button>Register Now</button>
          </a>
        </div>
      </section>

      <section className="About">
        <div className="about-overlay">
          <div className="about-about">
            <h2>About The Futura</h2>
            <p><i>
              The Department of Artificial Intelligence and Data Science at Sri Sairam Institute of Technology hosts the National Techfest FUTURA'25. A Festival filled with fascination and excitement comes to provide an oppurtunity to showcase your creative ideas and talents. Get ready to witness the most thrilling challenges.
              </i></p>
          </div>
          <div className="about-where">
            <h2>Destination</h2>
            <p><i>Sri Sai Ram Institute of Technology,</i></p>
            <p><i>West Tambaram, Chennai-44</i></p>
          </div>
          <div className="about-when">
            <h2>On Air</h2>
            <p><i>
              Monday 22<sup>nd</sup> September 2025
              </i></p>
          </div>
        </div>
      </section>

      {/* Events */}
        <section id="events" className="events-container">
          <h2>Technical Events</h2>
          <div className="cards">
            {technicalEvents.map((event) => (
              <Link key={event.id} to={`/event/${event.id}`}>
                <div
                  className="card"
                  style={{ backgroundImage: `url(${event.image})` }}
                >
                  <div className="card-overlay">

                  </div>
                </div>
              </Link>
            ))}
          </div>

          <h2>Non-Technical Events</h2>
          <div className="cards">
            {nonTechnicalEvents.map((event) => (
              <Link key={event.id} to={`/event/${event.id}`}>
                <div
                  className="card"
                  style={{ backgroundImage: `url(${event.image})` }}
                >
                  <div className="card-overlay">
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>


      {/* Schedule */}
      <section id="schedule" className="event-time">
        <h2>Event Schedule</h2>

        <div className="schedule-list">
          {scheduleList.map((item, idx) => (
            <div key={idx} className="time-item">
              <div className="dot"></div>
              <div className="content">
                <span className="time">{item.time}</span>
                <span className="action">{item.action}</span>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* Gallery */}
      <section id="gallery" className="gallery">
        <h2>Previous Year Highlights</h2>
        <div className="gallery-center">
          {/* Show 2 images left */}
          <div className="gallery-item far-left">
            <img src={getImage(-2)} alt="Far Left" />
          </div>
          <div className="gallery-item left">
            <img src={getImage(-1)} alt="Left" />
          </div>

          {/* Active */}
          <div className="gallery-item active">
            <img src={getImage(0)} alt="Active" />
          </div>

          {/* Show 2 images right */}
          <div className="gallery-item right">
            <img src={getImage(1)} alt="Right" />
          </div>
          <div className="gallery-item far-right">
            <img src={getImage(2)} alt="Far Right" />
          </div>
        </div>
      {/* Indicator dots */}
        <div className="gallery-dots">
          {galleryImages.map((_, idx) => (
            <span
              key={idx}
              className={`dot ${activeIndex === idx ? "active" : ""}`}
            ></span>
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

      {/* Contact */}
      <section id="contact" className="contact">
        <h2 className="contact-header">✆ Contact Us </h2>
        <div className="contact-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2111.1575545924516!2d80.0532325!3d12.9606471!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52f51f638ddfbb%3A0xf3aef7ec7c8979ba!2sSri%20Sairam%20Institute%20of%20Technology!5e1!3m2!1sen!2sin!4v1757405042246!5m2!1sen!2sin"
            width="100%"
            height="300"
            loading="lazy"
          ></iframe>
          <div className="contact-detail">
              <p>Staff Coordinator: Mr Jeya Ganeshan </p>
              <p>Contact Number: +91 9791220654</p>
              <p>Contact Number: +91 6369079020</p>
              <p>Email: futura@sairamit.edu.in</p>
            </div>
        </div>
      </section>

      {/* Footer */}
      <section id="footer" className="footer">
        <p>&copy; Copyright Futura`25. All Rights Reserved.</p>
        <p>Designed by AI & DS Department</p>
      </section>
    </div>
  );
};

export default Home;
