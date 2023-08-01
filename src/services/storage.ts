type CityState = {
  id: number;
  name: string;
  country: string;
  lat: string;
  lon: string;
};

type LocalStorageState = {
  hasRequestedCurrentLocation: boolean;
  cities: CityState[];
};

const LOCAL_STORAGE_KEY = 'weather_widget_data';

function getLocalStorageState(): LocalStorageState {
  const result: LocalStorageState = {
    hasRequestedCurrentLocation: false,
    cities: []
  };

  const localStorageContent = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) as LocalStorageState;

  if (!localStorageContent) {
    return result;
  }

  const isCitiesValid = Array.isArray(localStorageContent.cities) && localStorageContent.cities.every((city) => city.lat && city.lon);
  if (isCitiesValid) {
    result.cities = localStorageContent.cities;
  }

  const isHasRequestedLocationValid = typeof localStorageContent.hasRequestedCurrentLocation === 'boolean';
  if (isHasRequestedLocationValid) {
    result.hasRequestedCurrentLocation = localStorageContent.hasRequestedCurrentLocation;
  }

  return result;
}

export function getHasRequestedCurrentLocation(): boolean {
  const localStorageState = getLocalStorageState();
  return localStorageState.hasRequestedCurrentLocation;
}

export function setHasRequestedCurrentLocation(data: { value: true }) {
  const localStorageState = getLocalStorageState();
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ ...localStorageState, hasRequestedCurrentLocation: data.value }));
}

export function addCity(city: CityState) {
  const localStorageState = getLocalStorageState();
  localStorageState.cities.push(city);

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localStorageState));
}

export function removeCity(cityId: number) {
  const localStorageState = getLocalStorageState();
  localStorageState.cities = localStorageState.cities.filter((city) => city.id !== cityId);

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localStorageState));
}

export function getCities() {
  const localStorageState = getLocalStorageState();
  return localStorageState.cities;
}
