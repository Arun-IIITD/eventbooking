function BookingModal({ event, close }) {

    const book = (time) => {
      const existing = JSON.parse(localStorage.getItem("bookings")) || [];
  
      const booking = {
        eventName: event.eventName,
        city: event.city,
        state: event.state,
        timeSlot: time,
        date: new Date().toDateString(),
      };
  
      localStorage.setItem("bookings", JSON.stringify([...existing, booking]));
      close();
    };
  
    return (
      <div style={{ border: "1px solid black", padding: "10px" }}>
        <p>Today</p>
        <p>Morning</p>
        <button onClick={() => book("Morning")}>9AM - 12PM</button>
  
        <p>Afternoon</p>
        <button onClick={() => book("Afternoon")}>12PM - 4PM</button>
  
        <p>Evening</p>
        <button onClick={() => book("Evening")}>4PM - 9PM</button>
  
        <button onClick={close}>Close</button>
      </div>
    );
  }
  
  export default BookingModal;
  