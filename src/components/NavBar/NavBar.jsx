import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/">Find Events</Link> |{" "}
      <Link to="/">Venues</Link> |{" "}
      <Link to="/">Tickets</Link> |{" "}
      <Link to="/my-bookings">My Bookings</Link>
    </nav>
  );
}

export default Navbar;
