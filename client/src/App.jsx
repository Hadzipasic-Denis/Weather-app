import { useEffect, useState } from "react";
import axios from "axios";
import sunny_d from "../src/assets/sunny_d.png";
import clear_n from "../src/assets/clear_n.png";
import snow_2w from "../src/assets/snow_2w.png";
import rain_d from "../src/assets/rain_d.png";
import rain_n from "../src/assets/rain_n.png";
import sleet_d from "../src/assets/sleet_d.png";
import sleet_n from "../src/assets/sleet_n.png";
import thunder_2w from "../src/assets/thunder_2w.png";
import cloud_d from "../src/assets/cloud_d.png";
import cloud_n from "../src/assets/cloud_n.png";
import mist_d from "../src/assets/mist_d.png";
import mist_n from "../src/assets/mist_n.png";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState("Munich");
  const [location, setLocation] = useState("Munich");
  const [searchInput, setSearchInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestedCities, setSuggestedCities] = useState([]);

  useEffect(() => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        const city = response.data.city;
        setLocation(city);
      })
      .catch((error) => {
        console.log("Location detection failed:", error);
        setLocation("Munich");
      });
  }, []);

  useEffect(() => {
    if (!location) {
      return;
    }
    setLoading(true);

    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=${
          import.meta.env.VITE_API_KEY
        }&q=${location}`
      )
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=${
          import.meta.env.VITE_API_KEY
        }&q=${location}&days=3`
      )
      .then((response) => {
        setForecast(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [location]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      axios
        .get(
          `https://api.weatherapi.com/v1/search.json?key=${
            import.meta.env.VITE_API_KEY
          }&q=${searchInput}`
        )
        .then((response) => {
          setSuggestedCities(response.data);
        })
        .catch((err) => console.error(err));
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchInput]);

  const localDate = new Date(weather?.location?.localtime);
  const formattedDateLocalDate = localDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    weekday: "short",
  });

  const formattedTime = localDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const getBackgroundImage = (code, isDay) => {
    const daytime = Number(isDay) === 1;

    const sunnyCodes = [1000, 1003];
    const snowCodes = [1066, 1210, 1213, 1216, 1219, 1222, 1225, 1114, 1117];
    const rainCodes = [
      1063, 1150, 1153, 1180, 1183, 1240, 1186, 1189, 1192, 1195, 1243, 1246,
    ];
    const sleetCodes = [
      1069, 1204, 1249, 1252, 1207, 1198, 1201, 1072, 1168, 1171, 1237, 1261,
      1264,
    ];
    const thunderCodes = [1087, 1273, 1279, 1276, 1282];
    const cloudCodes = [1006, 1009];
    const mistCodes = [1030, 1135, 1147];

    if (sunnyCodes.includes(code)) {
      return daytime ? sunny_d : clear_n;
    } else if (snowCodes.includes(code)) {
      return snow_2w;
    } else if (rainCodes.includes(code)) {
      return daytime ? rain_d : rain_n;
    } else if (sleetCodes.includes(code)) {
      return daytime ? sleet_d : sleet_n;
    } else if (thunderCodes.includes(code)) {
      return thunder_2w;
    } else if (cloudCodes.includes(code)) {
      return daytime ? cloud_d : cloud_n;
    } else if (mistCodes.includes(code)) {
      return daytime ? mist_d : mist_n;
    }

    return sunny_d;
  };

  const getOverlayColor = (code, isDay) => {
    const daytime = Number(isDay) === 1;

    const sunnyCodes = [1000, 1003];
    const snowCodes = [1066, 1210, 1213, 1216, 1219, 1222, 1225, 1114, 1117];
    const rainCodes = [
      1063, 1150, 1153, 1180, 1183, 1240, 1186, 1189, 1192, 1195, 1243, 1246,
    ];
    const sleetCodes = [
      1069, 1204, 1249, 1252, 1207, 1198, 1201, 1072, 1168, 1171, 1237, 1261,
      1264,
    ];
    const thunderCodes = [1087, 1273, 1279, 1276, 1282];
    const cloudCodes = [1006, 1009];
    const mistCodes = [1030, 1135, 1147];

    if (sunnyCodes.includes(code)) {
      return daytime ? "rgba(113,171,242,0.40)" : "rgba(78, 105, 138, 0.22)";
    } else if (snowCodes.includes(code)) {
      return "rgba(44, 60, 80, 0.2))";
    } else if (rainCodes.includes(code)) {
      return daytime ? "rgba(44, 60, 80, 0.2)" : "rgba(5, 36, 73, 0.2)";
    } else if (sleetCodes.includes(code)) {
      return daytime ? "rgba(35, 55, 78, 0.2)" : "rgba(69, 110, 156, 0.2)";
    } else if (thunderCodes.includes(code)) {
      return "rgba(43, 85, 133, 0.2)";
    } else if (cloudCodes.includes(code)) {
      return daytime ? "rgba(45, 69, 97, 0.2)" : "rgba(86, 113, 143, 0.2)";
    } else if (mistCodes.includes(code)) {
      return daytime ? "rgba(86, 113, 143, 0.2)" : "rgba(103, 119, 138, 0.15)";
    }

    return "rgba(113,171,242,0.40)";
  };

  const weatherCode = weather?.current?.condition?.code;
  const isDay = weather?.current?.is_day;

  return (
    <>
      {loading || !weather ? (
        <div className="mt-18 flex gap-4 p-4 flex-wrap justify-center">
          <img
            className="w-20 h-20 animate-spin"
            src="https://www.svgrepo.com/show/70469/loading.svg"
            alt="Loading icon"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-6">
          <div className="flex justify-center w-full max-w-xl">
            <input
              placeholder={isFocused ? "" : "Enter city name"}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-[99%] text-center text-lg text-slate-900 shadow-lg border-[1px] border-slate-300 border-gray-400 px-5 py-2 rounded-t-lg outline-none lg:max-w-[480px]"
              name="search"
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />

            {searchInput && suggestedCities.length > 0 && (
              <ul className="absolute text-slate-900 bg-white border border-gray-300 mt-12 w-[99%] rounded-md z-10 max-h-48 overflow-y-auto">
                {suggestedCities.map((city) => (
                  <li
                    key={city.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setLocation(city.name);
                      setSearchInput("");
                    }}
                  >
                    {city.name}, {city.country}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div
            className="flex flex-col justify-between pt-6 relative rounded-b-lg text-white w-[99%] min-h-[550px] lg:max-w-[480px]"
            style={{
              backgroundImage: `url(${getBackgroundImage(weatherCode, isDay)})`,
              backgroundSize: "cover",
              backgroundPosition: "calc(50% - 20px) center",
            }}
          >
            <div className="flex flex-col items-center">
              <h2 className="text-white text-3xl font-medium">{location}</h2>
              <div>
                {formattedDateLocalDate} | {formattedTime}
              </div>

              <div className="flex items-center my-4">
                <img
                  src={weather.current?.condition.icon}
                  alt="Weather image"
                />
                <span className="text-[42px]">{weather.current?.temp_c}° </span>
              </div>

              <div className="flex flex-col text-center text-[13px]">
                <span className="tracking-wide">
                  Feels Like: {weather.current?.feelslike_c}°C
                </span>
                <span className="tracking-wide">
                  {weather.current?.condition.text}
                </span>
              </div>

              <div
                className="flex gap-6 justify-center mt-10 rounded-xl py-3 px-6"
                style={{ backgroundColor: getOverlayColor(weatherCode, isDay) }}
              >
                {forecast?.forecast?.forecastday.map((forecast, index) => {
                  const dayName = new Date(forecast.date).toLocaleDateString(
                    "en-US",
                    { weekday: "short" }
                  );

                  return (
                    <div
                      className="text-[14px] flex flex-col items-center"
                      key={index}
                    >
                      <p>{dayName}</p>
                      <img
                        width={45}
                        src={forecast.day.condition.icon}
                        alt={forecast.day.condition.text}
                      />
                      <p className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={18}
                          height={18}
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="#fbfafa"
                            d="M406.043 316c24.11 96.443-50.59 180-150 180s-174.405-82.38-150-180c15-60 90-150 150-300c60 150 135 240 150 300"
                          ></path>
                        </svg>
                        {forecast.day.daily_chance_of_rain} %
                      </p>
                      <p>
                        {forecast.day.mintemp_c}° / {forecast.day.maxtemp_c}°
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <div
                className="p-4 rounded-b-lg"
                style={{ backgroundColor: getOverlayColor(weatherCode, isDay) }}
              >
                <div className="grid grid-cols-2 gap-3 text-sm text-white">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 font-medium tracking-wide">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          d="M6.25 5.5A3.25 3.25 0 1 1 9.5 8.75H3a.75.75 0 0 1 0-1.5h6.5A1.75 1.75 0 1 0 7.75 5.5v.357a.75.75 0 1 1-1.5 0zm8 2a4.25 4.25 0 1 1 4.25 4.25H2a.75.75 0 0 1 0-1.5h16.5a2.75 2.75 0 1 0-2.75-2.75V8a.75.75 0 0 1-1.5 0zm-11 6.5a.75.75 0 0 1 .75-.75h14.5a4.25 4.25 0 1 1-4.25 4.25V17a.75.75 0 0 1 1.5 0v.5a2.75 2.75 0 1 0 2.75-2.75H4a.75.75 0 0 1-.75-.75"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Wind:
                    </div>
                    <div className="flex items-center gap-1">
                      {weather.current?.wind_kph} kph
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 font-medium tracking-wide">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                      >
                        <g
                          fill="none"
                          stroke="currentColor"
                          strokeLinejoin="round"
                          strokeMiterlimit={10}
                          strokeWidth={1}
                        >
                          <path d="M8.5 23.5h-8l2-3h4z"></path>
                          <path
                            strokeLinecap="round"
                            d="M22.5 7.5L7.5 11V1.5l15 3.5zm-12-5.3v8.066m3-7.36v6.641m3-5.953v5.281m3-4.563v3.86M7.5 3l-3 2.5m3 4.5l-3-2.5m0 13v-17"
                          ></path>
                        </g>
                      </svg>
                      Direction:
                    </div>
                    <div> {weather.current?.wind_dir}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 font-medium tracking-wide">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M12 9a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-4.5c5 0 9.27 3.11 11 7.5c-1.73 4.39-6 7.5-11 7.5S2.73 16.39 1 12c1.73-4.39 6-7.5 11-7.5M3.18 12a9.821 9.821 0 0 0 17.64 0a9.821 9.821 0 0 0-17.64 0"
                        ></path>
                      </svg>
                      Visibility:
                    </div>
                    <div>{weather.current?.vis_km} km</div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 font-medium tracking-wide">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={28}
                        height={28}
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 12h1m16 0h1M5.6 5.6l.7.7m12.1-.7l-.7.7M8 12a4 4 0 1 1 8 0m-4-8V3m1 13l2 5h1l2-5M6 16v3a2 2 0 1 0 4 0v-3"
                        />
                      </svg>
                      UV Index:
                    </div>
                    <div>{weather.current?.uv}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
