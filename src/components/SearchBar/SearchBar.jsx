import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStates, getCities } from "../../api";

function SearchBar() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const [showStates, setShowStates] = useState(false);
  const [showCities, setShowCities] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getStates().then(setStates);
  }, []);

  useEffect(() => {
    if (state) {
      getCities(state).then(setCities);
      setCity("");
    }
  }, [state]);

  const handleSearch = () => {
    if (state && city) {
      navigate(`/events?state=${state}&city=${city}`);
    }
  };

  return (
    <div className="search-bar">

      {/* STATE DROPDOWN */}
      <div id="state" onClick={() => setShowStates(!showStates)}>
        {state || "Select State"}
        {showStates && (
          <ul>
            {states.map((s) => (
              <li
                key={s}
                onClick={() => {
                  setState(s);
                  setShowStates(false);
                }}
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* CITY DROPDOWN */}
      <div id="city" onClick={() => state && setShowCities(!showCities)}>
        {city || "Select City"}
        {showCities && (
          <ul>
            {cities.map((c) => (
              <li
                key={c}
                onClick={() => {
                  setCity(c);
                  setShowCities(false);
                }}
              >
                {c}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button id="searchBtn" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
