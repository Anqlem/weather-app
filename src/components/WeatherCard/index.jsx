import devider from "../../assets/images/Divider.png";
import clear from "../../assets/images/clear.png";

function WeatherCard(props) {
  console.log(props);
  return (
    <div className="container">
      <div className="info">
        <div className="locationDate">
          <span className="location">
            {props.location}, {props.sys}
          </span>
          <span className="date">{props.date}</span>
        </div>
        <span className="time">11:32</span>
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
      <div className="icon">
        <img src={clear} />
      </div>
    </div>
  );
}

export { WeatherCard };
