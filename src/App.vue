<template>
  <WeatherList
    v-if="!isSettingsOpened"
    :cities="weathers"
    @update:openSettings="toggleSettingsDisplay"
  />

  <CitySettings
    v-else
    :cities="weathers"
    @updated:addCity="saveCity"
    @updated:deleteCity="deleteCity"
    @updated:openSettings="toggleSettingsDisplay"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WeatherList from "@/components/WeatherList/WeatherList.vue";
import CitySettings from "@/components/CitySettings/CitySettings.vue";
import { ICityWeather, StatusCode } from "@/types/types";

export default defineComponent({
  name: "App",
  components: {
    WeatherList,
    CitySettings,
  },
  data() {
    const weathers: ICityWeather[] = [];

    return {
      weathers: weathers,
      isSettingsOpened: false,
    };
  },
  methods: {
    async citiesWeather(): Promise<ICityWeather[]> {
      let apiKey: string;
      apiKey = "f0747dfbe799b65db66d4d370bc1db29";
      const weathers: ICityWeather[] = [];
      for await (const city of this.allCities()) {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&units=metric&appid=${apiKey}`
        );
        const data: ICityWeather = await response.json();

        if (data.cod === StatusCode.OK) {
          weathers.push(data);
        } else {
          console.error(`CITY: ${city}`, data.message);
          await this.deleteCity(city);
        }
      }

      return weathers;
    },
    allCities() {
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
  },
  async mounted(): Promise<void> {
    await this.updateWeathers();
  },
});
</script>

<style lang="scss" src="./styles/app.scss" />
