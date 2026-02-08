import { useState } from "react";
import BookingModal from "../BookingModal/BookingModal";

function EventCard({ event }) {
  const [open, setOpen] = useState(false);

  if (!event) return null;

  return (
    <div className="event-card">
      <h3>{event.eventName}</h3>

      <p className="address">{event.address}</p>
      <p className="location">
        {event.city}, {event.state}
      </p>
      <p className="rating">⭐ {event.rating}</p>

      <button className="book-btn" onClick={() => setOpen(true)}>
        Book FREE Event
      </button>

      {open && <BookingModal event={event} close={() => setOpen(false)} />}
    </div>
  );
}

export default EventCard;
