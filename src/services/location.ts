export function getCurrentLocation(successCallback: (params: GeolocationPosition) => void, errorCallback?: () => void) {
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}
