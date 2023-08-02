<template>
  <div class="settings-screen">
    <div class="close-icon" @click="emit('close-settings')">&#10006;</div>

    <div class="title">Settings</div>
    <div class="cities">
      <draggable :list="cityList" item-key="id" class="city-list" tag="ul" handle=".handle">
        <template #item="{ element }">
          <li class="city-item">
            <div class="handle"><HandleIcon /></div>
            <span class="name">{{ element.name }}, {{ element.country }}</span>
            <div class="delete" @click="removeCity(element.id)"><DeleteIcon /></div>
          </li>
        </template>
      </draggable>
    </div>

    <form class="add-city" @submit.prevent="selectFirstSuggestion">
      <SearchWithSuggestions
        :suggestions="citySuggestions"
        :loading="isSearching"
        @search="onSearchCities"
        @select="addCity"
      />
      <button type="submit" class="search-btn"><SearchIcon /></button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import draggable from "vuedraggable";
import HandleIcon from "@/components/icons/HandleIcon.vue";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";
import SearchIcon from "@/components/icons/SearchIcon.vue";
import { CityWeather, SearchedCity } from "@/types/weather";
import { searchCityByName, getWeatherByCoords } from "@/services/weather";
import SearchWithSuggestions from "./elements/SearchWithSuggestions.vue";

const props = defineProps<{
  cities: CityWeather[];
}>();

const emit = defineEmits<{
  (event: "close-settings"): void;
  (event: "change-order", cities: CityWeather[]): void;
  (event: "remove-city", cityId: number): void;
  (event: "add-city", city: CityWeather): void;
}>();

const cityList = computed({
  get() {
    return props.cities;
  },
  set(value) {
    emit("change-order", value);
  },
});

const searchedCities = ref<SearchedCity[]>([]);
const isSearching = ref(false);

const citySuggestions = computed(() => {
  return searchedCities.value.map((city, index) => ({
    id: index,
    name: `${city.name}, ${city.country}`,
  }));
});

const onSearchCities = async (searchQuery: string) => {
  if (!searchQuery.trim()) {
    searchedCities.value = [];
    return;
  }

  isSearching.value = true;
  searchedCities.value = await searchCityByName(searchQuery);
  isSearching.value = false;
};

const addCity = async (searchedCityIndex: number) => {
  const searchedCity = searchedCities.value[searchedCityIndex];
  const cityWeather = await getWeatherByCoords({ lat: searchedCity.lat, lon: searchedCity.lon });
  emit("add-city", cityWeather);
  searchedCities.value = [];
};

const selectFirstSuggestion = () => {
  if (isSearching.value || !searchedCities.value[0]) {
    return;
  }

  addCity(0);
};

const removeCity = (cityId) => {
  emit("remove-city", cityId);
};
</script>

<style scoped lang="scss">
.settings-screen {
  position: relative;
}

.close-icon {
  position: absolute;
  top: 0;
  right: 0;

  font-size: 1.4rem;

  cursor: pointer;
}

.title {
  font-size: 1.4rem;
  font-weight: bold;
}

.city-list {
  margin: 0;
  margin-top: 2rem;
  padding: 0;

  list-style: none;
}

.city-item {
  display: flex;
  align-items: center;

  margin-top: 1rem;
  padding: 0.7rem 0.5rem;

  background-color: #ccc;

  &:first-child {
    margin-top: 0;
  }

  .handle {
    display: flex;
    align-items: center;
    justify-content: center;

    margin-right: 0.5rem;

    cursor: pointer;
  }

  .name {
    flex-grow: 1;
  }

  .delete {
    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
  }
}
.add-city {
  display: flex;

  margin-top: 2rem;

  .search-btn {
    background-color: transparent;
    border: none;

    cursor: pointer;
  }
}
</style>
