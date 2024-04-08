import { ajax } from "../tools/ajax";

export const getCityWeather = async (cityTemp) => {
  const optionsRequest = {
    method: "GET",
    url: "https://api.openweathermap.org/data/2.5/weather",
    params: {
      q: cityTemp,
      appid: "634e7b06e47cdb7f16c3f8461b30f4a0",
      units: "metric",
    },
  };
  return await ajax(optionsRequest);
};
