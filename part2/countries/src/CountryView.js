import { useEffect, useState } from "react";
import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

const CountryView = ({ country }) => {
  const { name, capital, languages, flag, area } = country;

  const [weather, setWeather] = useState({
    temp: 0,
    icon: "",
    desc: "",
    wind: 0,
  });

  useEffect(() => {
    const URL_API = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`;
    axios.get(URL_API).then((response) => {
      setWeather({
        temp: response.data.main.temp,
        icon: response.data.weather[0].icon,
        desc: response.data.weather[0].main,
        wind: response.data.wind.speed,
      });
    });
  }, []);

  const { temp, icon, desc, wind } = weather;

  return (
    <>
      <h2>{name.common}</h2>
      <p>capital: {capital}</p>
      <p>area: {area}</p>
      <h3>Languages</h3>
      <ul>
        {Object.entries(languages).map((lang) => (
          <li key={lang[0]}>{lang[1]}</li>
        ))}
      </ul>
      <h3>Flag</h3>
      <p>{flag}</p>
      <h3>Weather</h3>
      <p>Temperature: {temp}</p>
      {icon.length === 0 ? null : (
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="icon for weather"
        />
      )}
      <p>{desc}</p>
      <p>wind: {wind} m/s</p>
    </>
  );
};

export default CountryView;
