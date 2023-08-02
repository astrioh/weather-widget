<template>
  <div id="weather-widget">
    <WeatherScreen v-show="currentScreen === 'weather'" :cities="cities" :loading="isLoading" @open-settings="changeScreen('settings')" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getCurrentLocation } from '@/services/location';
import { CityWeather } from '@/types/weather';
import { addCity, setHasRequestedCurrentLocation, getHasRequestedCurrentLocation, getCities } from '@/services/storage';
import { getWeatherByCoords, getWeatherForMultipleCities } from '@/services/weather';
import WeatherScreen from '@/components/WeatherScreen.vue';

const cities = ref<CityWeather[]>([]);
const isLoading = ref(false);

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

  if (!hasRequestedCurrentLocation) {
    getCurrentLocation(
      async (params) => {
        isLoading.value = true;
        const city = await getWeatherByCoords({ lat: params.coords.latitude.toString(), lon: params.coords.longitude.toString() });
        isLoading.value = false;
        cities.value.push(city);
        addCity(city);
        setHasRequestedCurrentLocation({ value: true });
      },
      () => {
        setHasRequestedCurrentLocation({ value: true });
      }
    );
  }

  isLoading.value = true;
  const savedCitiesWeather = await getWeatherForSavedCities();
  isLoading.value = false;
  cities.value.push(...savedCitiesWeather);
});

type AppScreens = 'weather' | 'settings';
const currentScreen = ref<AppScreens>('weather');

const changeScreen = (screen: AppScreens) => {
  currentScreen.value = screen;
};
</script>

<style scoped lang="scss">
#weather-widget {
  width: 100%;
  height: 100%;

  padding: 0.7rem;

  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
