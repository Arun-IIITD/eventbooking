function MyBookings() {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  
    return (


      <div className="bookings-page">
  <h1>My Bookings</h1>

  <div className="bookings-grid">
    {bookings.map((b, i) => (
      <div className="booking-card" key={i}>
        <h3>{b.eventName}</h3>
        <p>{b.date}</p>
        <p>{b.timeSlot}</p>
        <p>{b.city}, {b.state}</p>
      </div>
    ))}
  </div>
</div>








    );
  }
  
  export default MyBookings;
  