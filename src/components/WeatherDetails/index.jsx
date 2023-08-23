import temp from "../../assets/images/icons/Type=thermometer-simple-light.svg";
import rain from "../../assets/images/icons/Type=cloud-rain-light.svg";
import wind from "../../assets/images/icons/Type=wind-light.svg";
import humid from "../../assets/images/icons/Type=drop-light.svg";

function WeatherDetails(props) {
  return (
    <div className="details">
      <span>Today's weather details</span>
      <ul className="detail-list">
        <li>
          <div className="title">
            <img src={temp} />
            Thermal sensation
          </div>
          <span>{Math.round(props.temp)}°c</span>
        </li>
        <li>
          <div className="title">
            <img src={rain} />
            Rain probability
          </div>
          <span>{props.rain}%</span>
        </li>
        <li>
          <div className="title">
            <img src={wind} />
            Wind speed
          </div>
          <span>{Math.round(props.wind)} m/s</span>
        </li>
        <li>
          <div className="title">
            <img src={humid} />
            Air humidity
          </div>
          <span>{Math.round(props.humid)}%</span>
        </li>
      </ul>
    </div>
  );
}

export { WeatherDetails };
