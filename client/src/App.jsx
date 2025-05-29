import { useEffect, useState } from "react";
import axios from "axios";
import img from "../src/assets/img2.png";

function App() {
  const [weather, setWeather] = useState("A");
  const [location, setLocation] = useState("Munich");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=2b467482aab24006bc6205633251605&q=${location}`
      )
      .then((response) => {
        setWeather(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [location]);

  const cities = [
    "Munich",
    "Berlin",
    "Hamburg",
    "Cologne",
    "Frankfurt",
    "Stuttgart",
    "Leipzig",
  ];

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchInput.toLowerCase())
  );

 return (
    <>
      {!weather ? (
        <p>Loading</p>
      ) : (
        <div className="flex flex-col items-center justify-center mt-6">
          <img src={img} alt="Weather illustration" className="w-40 h-auto" />
          <div className="relative w-max">
            <input
              placeholder="Search..."
              className="shadow-lg focus:border-2 border-gray-400 px-5 pr-12 py-3 rounded-xl w-56 transition-all focus:w-64 outline-none"
              name="search"
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            {searchInput && filteredCities.length > 0 && (
              <ul className="absolute bg-white border border-gray-300 mt-1 w-full rounded-md z-10 max-h-48 overflow-y-auto">
                {filteredCities.map((city) => (
                  <li
                    key={city}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setLocation(city);
                      setSearchInput(""); // Optional: clear input on select
                    }}
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>

<div className="relative max-w-md p-1 bg-gradient-to-r from-blue-500 to-blue-300 shadow-xl rounded-lg my-20 text-white">
  <div className="border-2 p-2 border-white rounded-lg">
  <div className="absolute -top-10 right-4 z-10 bg-white rounded-full p-2 shadow-md border border-gray-300">
    <img
      className="w-20 h-20 object-cover"
      src={weather.current.condition.icon}
      alt="Weather icon"
    />
  </div>
  <div>
    <h2 className="text-white text-3xl font-semibold">{location}</h2>
    <p className="mt-2 text-white">
      Lorem ipsum dolor sit amet consectetur adipisicing elit...
    </p>
  </div>
  <div className="flex justify-end mt-4">
    <a href="#" className="text-xl font-medium text-indigo-200">
      John Doe
    </a>
  </div>
</div>
  </div>

        </div>
      )}
    </>
  );
}

export default App;
