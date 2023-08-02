<template>
  <div class="weather-city">
    <div class="name">{{ city.name }}, {{ city.country }}</div>
    <div class="main">
      <img class="icon" :src="city.iconUrl" width="60" height="60" :alt="weatherDescription" />
      <span class="temperature">{{ temperature }}&deg;C</span>
    </div>
    <div class="description">Feels like {{ tempFeelsLike }}&deg;C. {{ weatherDescription }}.</div>
    <div class="stats">
      <div class="stats-item">
        <WindIcon />
        <span>{{ city.windSpeed }}m/s</span>
      </div>
      <div class="stats-item">
        <CompassIcon />
        <span>{{ city.pressure }}hPa</span>
      </div>
      <div class="stats-item">
        <span>Humidity: {{ city.humidity }}%</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import WindIcon from '@/components/icons/WindIcon.vue';
import CompassIcon from '@/components/icons/CompassIcon.vue';
import { CityWeather } from '@/types/weather';
import { toSentenceCase } from '@/helpers';

const props = defineProps<{
  city: CityWeather;
}>();

const weatherDescription = computed(() => toSentenceCase(props.city.weatherDescription));
const temperature = computed(() => Math.round(props.city.temperature));
const tempFeelsLike = computed(() => Math.round(props.city.tempFeelsLike));
</script>

<style scoped lang="scss">
.weather-city {
  width: 100%;

  .name {
    font-size: 1.4rem;
    font-weight: bold;
  }

  .main {
    display: flex;
    align-items: center;
    gap: 1rem;

    margin: 2rem auto;
  }

  .temperature {
    font-size: 2.8rem;
  }

  .stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0.5rem;

    margin-top: 0.5rem;

    .stats-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }
}
</style>
