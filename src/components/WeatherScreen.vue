<template>
  <div class="weather-screen">
    <div class="option-icon" @click="emit('open-settings')"><OptionIcon /></div>
    <div v-if="cities.length" class="weather-list">
      <WeatherItem v-for="city in cities" :key="city.id" :city="city" />
    </div>
    <div v-else-if="loading" class="loading">
      <VSpinner />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CityWeather } from '@/types/weather';
import OptionIcon from '@/components/icons/OptionIcon.vue';
import VSpinner from '@/components/elements/VSpinner.vue';
import WeatherItem from '@/components/WeatherItem.vue';

withDefaults(
  defineProps<{
    cities: CityWeather[];
    loading?: boolean;
  }>(),
  {
    loading: false,
  }
);

const emit = defineEmits<{
  (event: 'open-settings'): void;
}>();
</script>

<style scoped lang="scss">
.weather-screen {
  position: relative;
}

.weather-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.option-icon {
  position: absolute;
  top: 0;
  right: 0;

  font-size: 1.4rem;

  cursor: pointer;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
