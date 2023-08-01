<template></template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getCurrentLocation } from '@/services/location';
import { CityWeather } from '@/types/weather';
import { setHasRequestedCurrentLocation } from '@/services/storage';
import { getHasRequestedCurrentLocation } from '@/services/storage';

const cities: CityWeather[] = ref([]);

onMounted(() => {
  const hasRequestedCurrentLocation = getHasRequestedCurrentLocation();

  if (!hasRequestedCurrentLocation) {
    getCurrentLocation(
      async (params) => {
        params.coords.latitude;
        setHasRequestedCurrentLocation({ value: true });
      },
      () => {
        setHasRequestedCurrentLocation({ value: true });
      }
    );
  }
});
</script>
