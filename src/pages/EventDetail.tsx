import React from "react";
import { useParams, Link } from "react-router-dom";
import { allEvents } from "../data/events";

const EventDetail: React.FC = () => {
  const { id } = useParams();
  const event = allEvents.find((e) => e.id === id);

  if (!event) return <h2>Event not found</h2>;

  return (
    <div className="event-detail">
      <h2>{event.title}</h2>
      <p>{event.desc}</p>
      <Link to={`/register/${event.id}`}>
        <button>Register Now</button>
      </Link>
    </div>
  );
};

export default EventDetail;
