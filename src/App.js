import { useState } from "react";
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

import logo from "../src/assets/images/Logo.svg";
import { WeatherDetails } from "./components/WeatherDetails";

const api = {
  key: "859b0e64994f154721fc4e8a5e75545d",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [nextWeather, setNextWeather] = useState({});

  const [backgroundImage, setBackgroundImage] = useState("");

  async function search(evt) {
    const url1 = `${api.base}weather?q=${query}&appid=${api.key}&units=metric`;
    const url2 = `${api.base}forecast?q=${query}&appid=${api.key}&units=metric`;
    if (evt.key === "Enter") {
      const res = await Promise.all([fetch(url1), fetch(url2)]);
      const today = await res[0].json();
      const next = await res[1].json();
      setWeather(today);
      setBackgroundImage(codeMapping[today.weather[0].icon]);
      setQuery("");
      setNextWeather(next.list);
    }
  }

  const codeMapping = {
    "01d": [clearDBG, clearD],
    "01n": [clearNBG, clearN],
    "02d": [few_cloudsDBG, few_cloudsD],
    "02n": [few_cloudsNBG, few_cloudsN],
    "03d": [cloudyDBG, cloudyD],
    "03n": [cloudyNBG, cloudyN],
    "04d": [cloudyDBG, cloudyD],
    "04n": [cloudyNBG, cloudyN],
    "09d": [rainDBG, rainD],
    "09n": [rainNBG, rainN],
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
      <div className="search-box">
        <input
          type="text"
          className="actions-search"
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
        />
      </div>
      {weather.main && nextWeather.main != "undefined" ? (
        <div className="content">
          <div className="card">
            <div className="actions">
              <div className="home">
                <img src={logo} />
              </div>
              <input
                type="text"
                className="actions-search"
                placeholder="Search..."
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                onKeyPress={search}
              />
            </div>
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
          <WeatherDetails
            temp={nextWeather[0].main.feels_like}
            rain={nextWeather[0].pop}
            wind={weather.wind.speed}
            humid={weather.main.humidity}
          />
          <div className="next">
            <span>Today's weather details</span>
            <ul>
              <li>Thermal sensation</li>
              <li>Rain probability</li>
              <li>Wind speed</li>
              <li>Air humidity</li>
              <li>UV index</li>
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
