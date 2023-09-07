import { useState } from "react";
import { WeatherCard } from "./components";
import "./App.css";
import "./css/WeatherCard.css";
import "./css/WeatherNextDays.css";

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
import loading from "../src/assets/images/icons/loading.svg";
import { WeatherDetails } from "./components/WeatherDetails";
import { WeatherNextDays } from "./components/WeatherNextDays";

const api = {
  key: "859b0e64994f154721fc4e8a5e75545d",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [nextWeather, setNextWeather] = useState({});
  const [date, setDate] = useState({});

  const [isData, setIsData] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [backgroundImage, setBackgroundImage] = useState("");
  const [nextBackgroundImage, setNextBackgroundImage] = useState({});

  async function search(evt) {
    const url1 = `${api.base}weather?q=${query}&appid=${api.key}&units=metric`;
    const url2 = `${api.base}forecast?q=${query}&appid=${api.key}&units=metric`;
    if (evt.key === "Enter") {
      setIsLoading(true);
      const res = await Promise.all([fetch(url1), fetch(url2)]);
      const today = await res[0].json();
      const next = await res[1].json();
      var nextIcons = [];
      var weatherArray = [];
      var dates = [];
      next.list.map((x, y) => {
        if (y === 7 || y === 15 || y === 23 || y === 31 || y === 39) {
          weatherArray.push(x);
          nextIcons.push(codeMapping[x.weather[0].icon]);
          var fullDates = dateBuilder(new Date(x.dt_txt));
          dates.push(fullDates);
        }
      });

      setTimeout(() => {
        setWeather(today);
        setBackgroundImage(codeMapping[today.weather[0].icon]);
        setDate(dates);
        setNextBackgroundImage(nextIcons);
        setNextWeather(weatherArray);
        setQuery("");
        setIsData(true);
        setIsLoading(false);
      }, 500);
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
    const timezone = weather.timezone;
    const date = new Date().getTime() + timezone * 1000;
    const localtime = new Date(date);
    //const time = date.getHours() + ":" + date.getMinutes();
    console.log(`${localtime.toLocaleTimeString()}`);
    console.log(timezone);

    return `${localtime}`;
  };

  function dateBuilder(d) {
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
  }

  return (
    <div className="App">
      {isData === true ? (
        <></>
      ) : (
        <div className="welcome">
          <div className="title">
            <span>Choose a location to view the weather forecast</span>
          </div>
          <div className="input-container">
            <input
              type="text"
              className="welcome-search"
              placeholder="Search..."
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              disabled={isLoading}
              onKeyPress={search}
            />
            {isLoading === true ? (
              <div className="icon-container">
                <img src={loading} alt="loading" className="loader"></img>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}

      {isData === true ? (
        <div className="content-container">
          <div className="content">
            <div className="card">
              <div className="actions">
                <div className="home">
                  <img src={logo} alt="logo" />
                </div>
                <div className="input-container">
                  <input
                    type="text"
                    className="actions-search"
                    placeholder="Search..."
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                    disabled={isLoading}
                    onKeyPress={search}
                  />
                  {isLoading === true ? (
                    <div className="icon-container">
                      <img src={loading} alt="loading" className="loader"></img>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
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
            <WeatherNextDays
              weatherIcon={nextBackgroundImage}
              weather={nextWeather}
              date={date}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
