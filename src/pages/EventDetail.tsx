import React from "react";
import { useParams, Link } from "react-router-dom";
import { allEvents } from "../data/eventsdescription";
import { useEffect } from "react";

const EventDetail: React.FC = () => {
  const { id } = useParams();
  const event = allEvents.find((e) => e.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!event) return <h2>❌ Event not found</h2>;

  return (
    <div
      className="event"
      style={{
        margin: "0 auto",
        zIndex: -1,
        minHeight: "100vh",
        backgroundImage: `url(${event.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        color: "white", // ensures text is visible
        textShadow: "0 2px 6px rgba(0,0,0,0.8)", // readability
      }}
    >
      <div
        className="event-detail"
        style={{
          maxWidth: "800px",
          background: "rgba(0, 0, 0, 0.6)", // semi-transparent overlay for readability
          padding: "2rem",
          borderRadius: "12px",
        }}
      >
        <h1>{event.title}</h1>
        {event.desc && <p>{event.desc}</p>}

        {event.sections &&
          event.sections.map((section, index) => (
            <div key={index} style={{ marginBottom: "2rem" }}>
              <h2>{section.heading}</h2>
              {section.content && <p>{section.content}</p>}

              {section.subsections &&
                section.subsections.map((sub, subIdx) => (
                  <div
                    key={subIdx}
                    style={{ marginTop: "1rem", paddingLeft: "1rem" }}
                  >
                    <h3>{sub.subheading}</h3>
                    {sub.content &&
                      sub.content.split("\n").map((line, i) => (
                        <p key={i} style={{ margin: 0 }}>
                          {line}
                        </p>
                      ))}
                  </div>
                ))}
            </div>
          ))}

        <div
          className="hello"
          style={{
            display: "flex",
            gap: "10rem",
            justifyContent: "space-between", 
            flex: "1",
          }}
        >
          <Link to={`/#events${event.id}`}>
            <button
              style={{
                padding: "10px 20px",
                fontSize: "1rem",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Back
            </button>
          </Link>
          <Link to={`/register/${event.id}`}>
            <button
              style={{
                padding: "10px 20px",
                fontSize: "1rem",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Register Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
