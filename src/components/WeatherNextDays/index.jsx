function WeatherNextDays(props) {
  console.log(props);
  return (
    <div className="next">
      <span>Forecast for 5 days</span>
      <ul className="list">
        <li>
          <span>{props.date[0].split(",")[0]}</span>
          <img
            src={props.weatherIcon[0][1]}
            alt="weather"
            width="67px"
            height="67px"
          />
          <div className="nextInfo">
            <span>{props.weather[0].weather[0].main}</span>
            <div className="nextTemp">
              <span>{Math.round(props.weather[0].main.temp_max)}°c </span>
              <span>{Math.round(props.weather[0].main.temp_min)}°c</span>
            </div>
          </div>
        </li>
        <li>
          <span>{props.date[1].split(",")[0]}</span>
          <img
            src={props.weatherIcon[1][1]}
            alt="weather"
            width="67px"
            height="67px"
          />
          <div className="nextInfo">
            <span>{props.weather[1].weather[0].main}</span>
            <div className="nextTemp">
              <span>{Math.round(props.weather[1].main.temp_max)}°c </span>
              <span>{Math.round(props.weather[1].main.temp_min)}°c</span>
            </div>
          </div>
        </li>
        <li>
          <span>{props.date[2].split(",")[0]}</span>
          <img
            src={props.weatherIcon[2][1]}
            alt="weather"
            width="67px"
            height="67px"
          />
          <div className="nextInfo">
            <span>{props.weather[2].weather[0].main}</span>
            <div className="nextTemp">
              <span>{Math.round(props.weather[2].main.temp_max)}°c </span>
              <span>{Math.round(props.weather[2].main.temp_min)}°c</span>
            </div>
          </div>
        </li>
        <li>
          <span>{props.date[3].split(",")[0]}</span>
          <img
            src={props.weatherIcon[3][1]}
            alt="weather"
            width="67px"
            height="67px"
          />
          <div className="nextInfo">
            <span>{props.weather[3].weather[0].main}</span>
            <div className="nextTemp">
              <span>{Math.round(props.weather[3].main.temp_max)}°c </span>
              <span>{Math.round(props.weather[3].main.temp_min)}°c</span>
            </div>
          </div>
        </li>
        <li>
          <span>{props.date[4].split(",")[0]}</span>
          <img
            src={props.weatherIcon[4][1]}
            alt="weather"
            width="67px"
            height="67px"
          />
          <div className="nextInfo">
            <span>{props.weather[4].weather[0].main}</span>
            <div className="nextTemp">
              <span>{Math.round(props.weather[4].main.temp_max)}°c </span>
              <span>{Math.round(props.weather[4].main.temp_min)}°c</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export { WeatherNextDays };
