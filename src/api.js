const BASE_URL = "https://eventdata.onrender.com";
//https://eventdata.onrender.com/states
//https://eventdata.onrender.com/cities/:state (e.g., https://eventdata.onrender.com/cities/Texas)
//https://eventdata.onrender.com/events?state=<state-name>&city=<city-name> (e.g., https://eventdata.onrender.com/events?state=Texas&city=Austin)


export const getStates = async () => {
  const res = await fetch(`${BASE_URL}/states`);
  return res.json();
};

export const getCities = async (state) => {
  const res = await fetch(`${BASE_URL}/cities/${state}`);
  return res.json();
};

export const getEvents = async (state, city) => {
  const response = await fetch(
    `https://eventdata.onrender.com/events?state=${state}&city=${city}`
  );

  return response.json(); // MUST return array directly
};

