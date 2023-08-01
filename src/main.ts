import { defineCustomElement } from '@/defineCustomElementWithStyles';
import WeatherWidget from '@/WeatherWidget.vue';

customElements.define('weather-widget', defineCustomElement(WeatherWidget));
