<template>
  <div id="weather-widget">
    <WeatherScreen
      v-show="currentScreen === 'weather'"
      :cities="cities"
      :loading="isLoading"
      @open-settings="changeScreen('settings')"
    />
    <SettingsScreen
      v-show="currentScreen === 'settings'"
      :cities="cities"
      :loading="isLoading"
      @close-settings="changeScreen('weather')"
      @add-city="pushCity"
      @remove-city="removeCity"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getCurrentLocation } from '@/services/location';
import { CityWeather } from '@/types/weather';
import * as storageApi from '@/services/storage';
import { getWeatherByCoords, getWeatherForMultipleCities } from '@/services/weather';
import WeatherScreen from '@/components/WeatherScreen.vue';
import SettingsScreen from './components/SettingsScreen.vue';

const cities = ref<CityWeather[]>([]);
const isLoading = ref(false);

const getWeatherForSavedCities = async (): Promise<CityWeather[]> => {
  const citiesState = storageApi.getCities();

  if (!citiesState.length) {
    return [];
  }

  const cityIds = citiesState.map((city) => city.id);
  return getWeatherForMultipleCities(cityIds);
};

onMounted(async () => {
  const hasRequestedCurrentLocation = storageApi.getHasRequestedCurrentLocation();

  if (!hasRequestedCurrentLocation) {
    getCurrentLocation(
      async (params) => {
        isLoading.value = true;
        const city = await getWeatherByCoords({
          lat: params.coords.latitude.toString(),
          lon: params.coords.longitude.toString(),
        });
        isLoading.value = false;
        cities.value.push(city);
        storageApi.addCity(city);
        storageApi.setHasRequestedCurrentLocation({ value: true });
      },
      () => {
        storageApi.setHasRequestedCurrentLocation({ value: true });
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

const pushCity = (city: CityWeather) => {
  cities.value.push(city);
  storageApi.addCity(city);
};

const removeCity = (cityId: number) => {
  cities.value = cities.value.filter((city) => city.id !== cityId);
  storageApi.removeCity(cityId);
};
</script>

<style scoped lang="scss">
#weather-widget {
  width: 100%;
  height: 100%;

  padding: 0.7rem;

  box-sizing: border-box;
  overflow: auto;

  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
