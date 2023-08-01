import { CONFIG } from '@/config';
import axios from 'axios';

export const weatherApi = axios.create({
  baseURL: CONFIG.WEATHER_API_URL,
  headers: {
    Accept: 'application/json'
  }
});
