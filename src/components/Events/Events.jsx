import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getEvents } from "../../api";
import EventCard from "../EventCard/EventCard";

function Events() {
  const [searchParams] = useSearchParams();
  const state = searchParams.get("state");
  const city = searchParams.get("city");

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // guard against missing query params
    if (!state || !city) {
      setEvents([]);
      setLoading(false);
      return;
    }

    getEvents(state, city)
      .then((res) => {
        // axios -> res.data
        setEvents(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setEvents([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [state, city]);

  if (loading) return <p>Loading events...</p>;

  return (
    <div className="events-page">
      <h1>{events.length} events available in {city}</h1>

      <div className="events-grid">
        {events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          events.map((event) => (
            <EventCard
              key={event.eventName}   // ideally backend should send an id
              event={event}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Events;
