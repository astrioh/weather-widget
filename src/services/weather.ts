import { CityWeather, SearchedCity } from '@/types/weather';

export function getWeatherByCoords(coords: { lat: string; lon: string }): CityWeather {}

export function getWeatherForMultipleCities(ids: number[]): CityWeather[] {
  return 'http://api.openweathermap.org/data/2.5/group?id=524901,703448,2643743&units;=metric&appid={}';
}

export function searchCityByName(name: string): SearchedCity[] {}
