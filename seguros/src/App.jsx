import { useEffect, useState } from "react";
import React from "react";
import "./App.css";
import { getCountries } from "./services/countries";
import { getCities } from "./services/cities";
import { getCityWeather } from "./services/weather";
import { BeatLoader } from "react-spinners";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [weather, setWeather] = useState(null);
  


  useEffect(() => {
    (async () => {      
      setCountries(await getCountries());      
    })();
  }, []);

 //en la siguiente linea se implementa un short ciurcuit render ()
  const countryHandler = async (e) => {
    e.currentTarget.value && setCities(await getCities(e.currentTarget.value));
    loadingCities(true)
    setWeather(null);
  };

  const cityHandler = async (e) => {
    e.currentTarget.value &&
    setWeather(await getCityWeather(e.currentTarget.value));
  };

  return (
    <>
      <div id="title">
        {" "}
        <h1>CLIMAPP</h1>
      </div>
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
        <div style={{ marginBottom: "20px" }}>  
          <label id="cityCountry" style={{ marginRight: "10px" }}>
            PAÍS
          </label>
          <select onChange={countryHandler}>
            <option value="">selecciona</option>
            {countries.map((country) => (
              <option key={country.cca2} value={country.cca2}>
                {" "}
                {country.name.common}
              </option>
            ))}
          </select>
        </div>
        {cities.length === 0 && <BeatLoader height={5} width={150} color="white" speedMultiplier={0.3} />}
        
        {cities.length > 0 && (
          <div style={{ marginBottom: "20px" }}>
            <label id="cityCountry"> Localidad </label>{" "}
            <select onChange={cityHandler}>
              <option value="">selecciona </option>
              {cities.map((city) => (
                <option key={city.id}> {city.name}</option>
              ))}
            </select>
          </div>
        )}

        {weather && (
          <div>
            <img
              id="back-icon"
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather icon"
            />

            <p id="sky">
              {weather.weather[0].description == "clear sky"
                ? "Despejado"
                : weather.weather[0].description == "clouds"
                ? "Nublado"
                : weather.weather[0].description == "few clouds"
                ? "Algunas nubes"
                : weather.weather[0].description == "scattered clouds"
                ? "Nubes dispersas"
                : weather.weather[0].description == "broken clouds"
                ? "Nubes rotas"
                : weather.weather[0].description == "overcast clouds"
                ? "Cielo cubierto"
                : weather.weather[0].description == "mist"
                ? "Neblina"
                : weather.weather[0].description == "haze"
                ? "Bruma"
                : weather.weather[0].description == "rain"
                ? "Lluvias"
                : weather.weather[0].description == "light rain"
                ? "Lluvia ligera"
                : weather.weather[0].description == "light intensity drizzle"
                ? "Llovizna de intensidad ligera"
                : weather.weather[0].description}
            </p>

            {/* comprueba si las teperaturas son mayores a 30º y las pinta de rojo si es true */}
            <h2 id="temp">
              Temperatura actual:
              <span className={weather.main.temp > 30 ? "hot-temperature" : ""}>
                {" "}
                {weather.main.temp} ºC
              </span>{" "}
            </h2>

            <p id="parraph">
              Sensación térmica: {weather.main.feels_like.toFixed()}ºC
            </p>

            <p id="parraph">Mínima: {weather.main.temp_min}ºC</p>

            <p id="parraph">Máxima: {weather.main.temp_max}ºC</p>

            <p id="parraph">Humedad: {weather.main.humidity}%</p>
            <p>Created by Luis-Kislo|2024</p>

            {/* comprueba si las maximas y minimas son las mismas, si es true engloba la info en un solo lugar Max-Min: */}

            {/* { weather.main.temp_max === weather.main.temp_min?(
          <p id="parraph">
            Max-Min:
            <span className={weather.main.temp_max > 30 ? 'hot-temperature' : ''}>
               {weather.main.temp_max.toFixed()}ºC
            </span> */}
            {/* si las maximas y minimas son distintas, se renderizan ambas por separado
          </p>):(
            <p id="parraph">Min:<span className={weather.main.temp_min > 30 ? 'hot-temperature' : 'kk'}> {weather.main.temp_min}ºC</span></p>|
             )}
          <p id="parraph">Humedad: {weather.main.humidity}%</p>  */}

            {/* // <p id="parraph">Mox:<span className={weather.main.temp_max > 30 ? 'hot-temperature' : 'kk'}> {weather.main.temp_max}ºC</span></p>         */}
          </div>
        )}
      </div>
    </>
  );
};

export default App;
