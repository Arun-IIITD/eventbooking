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
    getEvents(state, city).then((data) => {
      setEvents(data);
      setLoading(false);
    });
  }, [state, city]);

  if (loading) return <p>Loading events...</p>;

  return (


<div className="events-page">
  <h1>{events.length} events available in {city}</h1>

  <div className="events-grid">
    {events.map((event, index) => (
      <EventCard key={index} event={event} />
    ))}
  </div>
</div>





  );
}

export default Events;
