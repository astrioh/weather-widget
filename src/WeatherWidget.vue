<template>
  <div v-for="city in cities">
    {{ city.name + ' / ' + city.temperature }}
    <img :src="city.iconUrl" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getCurrentLocation } from '@/services/location';
import { CityWeather } from '@/types/weather';
import { addCity, setHasRequestedCurrentLocation, getHasRequestedCurrentLocation, getCities } from '@/services/storage';
import { getWeatherByCoords, getWeatherForMultipleCities } from '@/services/weather';

const cities = ref<CityWeather[]>([]);

const getWeatherForSavedCities = async (): Promise<CityWeather[]> => {
  const citiesState = getCities();

  if (!citiesState.length) {
    return [];
  }

  const cityIds = citiesState.map((city) => city.id);
  return getWeatherForMultipleCities(cityIds);
};

onMounted(async () => {
  const hasRequestedCurrentLocation = getHasRequestedCurrentLocation();

  const savedCitiesWeather = await getWeatherForSavedCities();
  cities.value.push(...savedCitiesWeather);

  if (!hasRequestedCurrentLocation) {
    getCurrentLocation(
      async (params) => {
        const city = await getWeatherByCoords({ lat: params.coords.latitude.toString(), lon: params.coords.longitude.toString() });
        cities.value.push(city);
        addCity(city);
        setHasRequestedCurrentLocation({ value: true });
      },
      () => {
        setHasRequestedCurrentLocation({ value: true });
      }
    );
  }
});
</script>
