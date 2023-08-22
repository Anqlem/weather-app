import { useState } from "react";
import { WeatherCard } from "./components";
import "./App.css";
import "./css/WeatherCard.css";
const api = {
  key: "859b0e64994f154721fc4e8a5e75545d",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [nextWeather, setNextWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&appid=${api.key}&units=metric`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
      fetch(`${api.base}forecast?q=${query}&appid=${api.key}&units=metric`)
        .then((res) => res.json())
        .then((result) => {
          setNextWeather(result.list);
        });
    }
  };

  const timeBuilder = () => {
    const date = new Date();
    const time = date.getHours() + ":" + date.getMinutes();
    console.log(date.getMinutes());

    return `${time}`;
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  };

  return (
    <div className="App">
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <WeatherCard
              location={weather.name}
              date={dateBuilder(new Date())}
              time={timeBuilder()}
              main={weather.main}
              weather={weather.weather[0].main}
              sys={weather.sys.country}
            />
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
