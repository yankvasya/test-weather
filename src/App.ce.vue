<template>
  <div id="app" :style="{ width: width }">
    <div v-if="isKeyInvalid">Api key is incorrect</div>
    <template v-else>
      <WeatherList
        v-if="!isSettingsOpened"
        :cities="weathers"
        :allCities="allCities()"
        @update:openSettings="toggleSettingsDisplay"
      />

      <CitySettings
        v-else
        :cities="weathers"
        @updated:addCity="saveCity"
        @updated:deleteCity="deleteCity"
        @updated:openSettings="toggleSettingsDisplay"
        @updated:changedSortID="updateCurrentSorting"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WeatherList from "@/components/WeatherList.ce.vue";
import CitySettings from "@/components/CitySettings.ce.vue";
import { ICityWeather, StatusCode } from "@/types/types";

const weatherApiURL = "https://api.openweathermap.org/data/2.5/";

const weatherAPI = import.meta.env.VITE_WEATHER_API || "";

export default defineComponent({
  name: "App",
  props: {
    width: {
      type: String,
      default: "480px",
    },
  },
  components: {
    WeatherList,
    CitySettings,
  },
  data() {
    const weathers: ICityWeather[] = [];

    return {
      weathers: weathers,
      isSettingsOpened: false,
      isKeyInvalid: false,
    };
  },
  methods: {
    async fetchWeathersCity(city: string): Promise<ICityWeather> {
      const response = await fetch(
        `${weatherApiURL}weather?q=${city}&lang=en&units=metric&appid=${weatherAPI}`
      );
      return await response.json();
    },
    async fetchWeathersCoords(lat: number, lon: number): Promise<ICityWeather> {
      const response = await fetch(
        `${weatherApiURL}weather?lat=${lat}&lon=${lon}&appid=${weatherAPI}`
      );
      return await response.json();
    },

    wasLocationRequested(): boolean {
      return !!localStorage.getItem("wasLocationRequested");
    },
    changeLocationRequested(value: boolean): void {
      localStorage.setItem("wasLocationRequested", JSON.stringify(value));
    },
    async citiesWeather(): Promise<ICityWeather[]> {
      const weathers: ICityWeather[] = [];
      for await (const city of this.allCities()) {
        const idx = this.allCities().indexOf(city);
        const data = await this.fetchWeathersCity(city);

        switch (data.cod) {
          case StatusCode.CITY_NOT_FOUND:
            await this.deleteCity(city);
            break;
          case StatusCode.INVALID_KEY:
            this.isKeyInvalid = true;
            break;
          case StatusCode.OK:
            weathers.push({ sortID: idx + 1, ...data });
            break;
          default:
            console.error(data.message);
            break;
        }
      }

      return weathers;
    },
    allCities(): string[] {
      return JSON.parse(localStorage.getItem("weather-cities") || "[]"); // ENUM
    },
    async saveCity(name: string): Promise<void> {
      localStorage.setItem(
        "weather-cities",
        JSON.stringify([
          ...this.allCities().filter((city: string) => city !== name),
          name,
        ])
      );

      await this.updateWeathers();
    },
    async saveAllCities(list: ICityWeather[]): Promise<void> {
      localStorage.setItem(
        "weather-cities",
        JSON.stringify(list.map((city) => city.name))
      );
    },
    async deleteCity(name: string): Promise<void> {
      localStorage.setItem(
        "weather-cities",
        JSON.stringify([
          ...this.allCities().filter((city: string) => city !== name),
        ])
      );

      await this.updateWeathers();
    },
    toggleSettingsDisplay(value: boolean): void {
      this.isSettingsOpened = value;
    },
    async updateWeathers(): Promise<void> {
      this.weathers = await this.citiesWeather();
    },
    updateCurrentSorting(changedList: ICityWeather[]): void {
      this.saveAllCities(changedList);
    },
    async takeCurrentWeather(): Promise<void> {
      const success = async (pos: GeolocationPosition): Promise<void> => {
        console.log("success", pos.coords);
        const data = await this.fetchWeathersCoords(
          pos.coords.latitude,
          pos.coords.longitude
        );

        await this.saveCity(data.name);
        this.changeLocationRequested(true);
      };
      const error = (err: GeolocationPositionError) => {
        console.log("error", err);
        this.changeLocationRequested(true);
      };

      const options: PositionOptions = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };
      navigator.geolocation.getCurrentPosition(success, error, options);
    },
  },
  async mounted(): Promise<void> {
    await this.updateWeathers();
    if (!this.wasLocationRequested()) await this.takeCurrentWeather();
  },
});
</script>

<style lang="scss" src="./styles/app.scss" />
