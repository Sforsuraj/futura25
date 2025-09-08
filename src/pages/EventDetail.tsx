import React from "react";
import { useParams, Link } from "react-router-dom";
import { allEvents } from "../data/eventsdescription";

const EventDetail: React.FC = () => {
  const { id } = useParams();
  const event = allEvents.find((e) => e.id === id);

  if (!event) return <h2>❌ Event not found</h2>;

  return (
    <div className="event-detail" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1>{event.title}</h1>
      {event.desc && <p>{event.desc}</p>}

      {event.sections && event.sections.map((section, index) => (
        <div key={index} style={{ marginBottom: "2rem" }}>
          <h2>{section.heading}</h2>
          {section.content && <p>{section.content}</p>}

          {section.subsections && section.subsections.map((sub, subIdx) => (
            <div key={subIdx} style={{ marginTop: "1rem", paddingLeft: "1rem" }}>
              <h3>{sub.subheading}</h3>
              {sub.content && sub.content.split('\n').map((line, i) => (
                <p key={i} style={{ margin: 0 }}>{line}</p>
              ))}
            </div>
          ))}
        </div>
      ))}

      <Link to={`/register/${event.id}`}>
        <button style={{ padding: "10px 20px", fontSize: "1rem" }}>Register Now</button>
      </Link>
    </div>
  );
};

export default EventDetail;
