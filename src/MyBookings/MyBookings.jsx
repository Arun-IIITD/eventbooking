import { useEffect, useState } from "react";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(stored);
  }, []);

  return (
    <div>
      <h1>My Bookings</h1>

      {bookings.map((b, i) => (
        <h3 key={i}>{b.eventName}</h3>
      ))}
    </div>
  );
}

export default MyBookings;
