export enum StatusCode {
  OK = 200,
  CITY_NOT_FOUND = "404",
  INVALID_KEY = 401,
}

export enum WeatherValues {
  CLOUDS = "Clouds",
  RAIN = "Rain",
  CLEAR = "Clear",
  THUNDERSTORM = "Thunderstorm",
  HAZE = "Haze",
  MIST = "Mist",
  DUST = "Dust",
  DRIZZLE = "Drizzle",
}

interface IWind {
  speed: number;
  deg: number;
}

interface IMain {
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  temp_min: number; //dew point
}

interface IWeather {
  main: WeatherValues;
  description: string;
}

export interface ICityWeather {
  sortID?: number;
  name: string;
  weather: IWeather[];
  visibility: number;
  main: IMain;
  wind: IWind;
  cod: StatusCode;
  message: string;
}
