import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getEvents } from "../../api";
import EventCard from "../EventCard/EventCard";

function Events() {
  const [searchParams] = useSearchParams();
  const state = searchParams.get("state");
  const city = searchParams.get("city");

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    if (!state || !city) return;

    setLoading(true);
    try {
      const data = await getEvents(state, city);
      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching events:", err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading events...</p>;

  return (
    <div className="events-page">
      <h1>
        {events.length} events available in {city}
      </h1>

      <button id="searchBtn" onClick={fetchEvents}>
        Search
      </button>

      <div className="events-grid">
        {events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          events.map((event) => (
            <EventCard key={event.eventName} event={event} />
          ))
        )}
      </div>
    </div>
  );
}

export default Events;
