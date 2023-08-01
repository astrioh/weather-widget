export type Config = {
  WEATHER_API_URL: string;
  WEATHER_API_KEY: string;
};

const CONFIG_ENV = {
  WEATHER_API_URL: process.env.WEATHER_API_URL,
  WEATHER_API_KEY: process.env.WEATHER_API_KEY
};

const parseConfig = (config: Partial<Config>): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in .env`);
    }
  }

  return config as Config;
};

export const CONFIG = parseConfig(CONFIG_ENV);
