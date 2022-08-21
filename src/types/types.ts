export enum StatusCode {
  OK = 200,
  ERROR = 404,
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
  name?: string;
  weather: IWeather[];
  visibility: number;
  main: IMain;
  wind: IWind;
  cod: StatusCode;
  message: string;
}
