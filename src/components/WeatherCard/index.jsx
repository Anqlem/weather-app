import devider from "../../assets/images/Divider.png";

function WeatherCard(props) {
  return (
    <div
      className="container"
      style={{
        backgroundImage: `url(${props.backgroundImage[0]})`,
      }}
    >
      <div className="info">
        <div className="locationDate">
          <span className="location">
            {props.location}, {props.sys}
          </span>
          <span className="date">{props.date}</span>
        </div>
      </div>
      <div className="weather">
        <div className="temp">{Math.round(props.main.temp)}°c</div>
        <div className="feelsTemp">
          {Math.round(props.main.temp_max)}°c /{" "}
          {Math.round(props.main.temp_min)}°c{" "}
          <img src={devider} className="devider" />
          <span className="forecast">{props.weather}</span>
        </div>
      </div>
      <div className="weather-icon-container">
        <img className="icon" src={props.backgroundImage[1]} />
      </div>
    </div>
  );
}

export { WeatherCard };
