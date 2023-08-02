<template>
  <div class="settings-screen">
    <div class="close-icon" @click="emit('close-settings')">&#10006;</div>

    <div class="title">Settings</div>
    <div class="cities">
      <draggable :list="cityList" item-key="id" tag="ul" handle=".handle">
        <template #item="{ element }">
          <div class="city-item">
            <div class="handle" />
            <span class="name">{{ element.name }}, {{ element.country }}</span>
            <div class="delete"></div>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import draggable from 'vuedraggable';
import { CityWeather } from '@/types/weather';

const props = defineProps<{
  cities: CityWeather[];
}>();

const emit = defineEmits<{
  (event: 'close-settings'): void;
  (event: 'change-order', cities: CityWeather[]): void;
}>();

const cityList = computed({
  get() {
    return props.cities;
  },
  set(value) {
    emit('change-order', value);
  }
});
</script>

<style lang="scss">
.weather-screen {
  position: relative;
}

.close-icon {
  position: absolute;
  right: 1rem;
  top: 0.5rem;

  font-size: 1.3rem;

  cursor: pointer;
}
</style>
