import { CONFIG } from '@/config';
import { weatherApi } from '@/lib/axios';
import { CityWeather, SearchedCity } from '@/types/weather';

function getIconUrlByName(iconName: string): string {
  return `https://openweathermap.org/img/wn/${iconName}@2x.png`;
}

// TODO: add types for api responses
function mapWeatherResponseToCityWeather(res: any): CityWeather {
  return {
    id: res.id,
    name: res.name,
    country: res.sys.country,
    lat: res.coord.lat,
    lon: res.coord.lon,
    temperature: res.main.temp,
    weatherName: res.weather[0].main,
    weatherDescription: res.weather[0].description,
    windSpeed: res.wind.speed,
    humidity: res.main.humidity,
    pressure: res.main.pressure,
    cloudPercent: res.clouds.all,
    iconUrl: getIconUrlByName(res.weather[0].icon)
  };
}

export async function getWeatherByCoords(coords: { lat: string; lon: string }): Promise<CityWeather> {
  const res = await weatherApi('/data/2.5/weather', {
    params: {
      lat: coords.lat,
      lon: coords.lon,
      appid: CONFIG.WEATHER_API_KEY
    }
  });

  return mapWeatherResponseToCityWeather(res.data);
}

export async function getWeatherForMultipleCities(ids: number[]): Promise<CityWeather[]> {
  const res = await weatherApi('/data/2.5/group', {
    params: {
      id: ids.join(','),
      appid: CONFIG.WEATHER_API_KEY
    }
  });

  return res.data.list.map((city: any) => mapWeatherResponseToCityWeather(city));
}

// export function searchCityByName(name: string): SearchedCity[] {}
