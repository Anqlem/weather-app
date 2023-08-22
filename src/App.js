import { useState, useEffect } from "react";
import { WeatherCard } from "./components";
import "./App.css";
import "./css/WeatherCard.css";

import {
  clearDBG,
  clearD,
  clearNBG,
  clearN,
  cloudyD,
  cloudyDBG,
  cloudyN,
  cloudyNBG,
  few_cloudsD,
  few_cloudsDBG,
  few_cloudsN,
  few_cloudsNBG,
  rainD,
  rainDBG,
  rainN,
  rainNBG,
  snowD,
  snowDBG,
  snowN,
  snowNBG,
  stormD,
  stormDBG,
  stormN,
  stormNBG,
} from "./assets";

const api = {
  key: "859b0e64994f154721fc4e8a5e75545d",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [nextWeather, setNextWeather] = useState({});

  const [backgroundImage, setBackgroundImage] = useState("");

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&appid=${api.key}&units=metric`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setBackgroundImage(codeMapping[result.weather[0].icon]);
          setQuery("");
        });
      fetch(`${api.base}forecast?q=${query}&appid=${api.key}&units=metric`)
        .then((res) => res.json())
        .then((result) => {
          setNextWeather(result.list);
        });
    }
  };

  const codeMapping = {
    "01d": [clearDBG, clearD],
    "01n": [clearNBG, clearN],
    "02d": [few_cloudsDBG, few_cloudsD],
    "02n": [few_cloudsNBG, few_cloudsN],
    "04d": [cloudyDBG, cloudyD],
    "04n": [cloudyNBG, cloudyN],
    "10d": [rainDBG, rainD],
    "10n": [rainNBG, rainN],
    "11d": [stormDBG, stormD],
    "11n": [stormNBG, stormN],
    "13d": [snowDBG, snowD],
    "13n": [snowNBG, snowN],
  };

  const timeBuilder = () => {
    const date = new Date();
    const time = date.getHours() + ":" + date.getMinutes();

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
              backgroundImage={backgroundImage}
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
