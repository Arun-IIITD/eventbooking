import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStates, getCities } from "../../api";

function SearchBar() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getStates().then(setStates);
  }, []);

  useEffect(() => {
    if (state) {
      getCities(state).then(setCities);
      setCity(""); // 🔥 RESET city when state changes
    }
  }, [state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state && city) {
      navigate(`/events?state=${state}&city=${city}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <div id="state" className="dropdown">
        <select
          value={state}                      // ✅ CONTROLLED
          onChange={(e) => setState(e.target.value)}
        >
          <option value="">Select State</option>
          {states.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div id="city" className="dropdown">
        <select
          value={city}                       // ✅ CONTROLLED
          onChange={(e) => setCity(e.target.value)}
          disabled={!state}                  // ✅ UX + safety
        >
          <option value="">Select City</option>
          {cities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <button type="submit" id="searchBtn" className="search-btn">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
