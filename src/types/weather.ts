export type CityWeather = {
  id: number;
  name: string;
  country: string;
  lat: string;
  lon: string;
  temperature: number;
  tempFeelsLike: number;
  weatherName: string;
  weatherDescription: string;
  windSpeed: number;
  humidity: number;
  pressure: number;
  cloudPercent: number;
  iconUrl: string;
};

export type SearchedCity = {
  name: string;
  country: string;
  lat: string;
  lon: string;
};
