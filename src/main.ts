import { defineCustomElement } from '@/defineCustomElementWithStyles';
import App from './App.vue';

customElements.define('weather-widget', defineCustomElement(App));
