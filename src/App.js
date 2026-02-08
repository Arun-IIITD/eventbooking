import { Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import EventCard from "./components/EventCard/EventCard";
import MyBookings from "./MyBookings/MyBookings";
import Navbar from "./components/NavBar/NavBar";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<EventCard />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </>
  );
}

export default App;
