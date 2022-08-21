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
      apiKey = "209c67b06f00d97d5d8416a54e002c9b";
      const weathers: ICityWeather[] = [];
      for await (const city of this.allCities()) {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&units=metric&appid=${apiKey}`
        );
        const data: ICityWeather = await response.json();

        if (data.cod === StatusCode.OK) {
          weathers.push(data);
        } else {
          console.error(data.message);
        }
      }

      return weathers;
    },
    allCities() {
      return JSON.parse(localStorage.getItem("weather-cities") || "[]"); // ENUM
    },
    async saveCity(name: string) {
      localStorage.setItem(
        "weather-cities",
        JSON.stringify([
          ...this.allCities().filter((city: string) => city !== name),
          name,
        ])
      );

      await this.updateWeathers();
    },
    async deleteCity(name: string) {
      localStorage.setItem(
        "weather-cities",
        JSON.stringify([
          ...this.allCities().filter((city: string) => city !== name),
        ])
      );

      await this.updateWeathers();
    },
    toggleSettingsDisplay(value: boolean) {
      this.isSettingsOpened = value;
    },
    async updateWeathers() {
      this.weathers = await this.citiesWeather();
    },
  },
  async mounted() {
    await this.updateWeathers();
  },
});
</script>

<style lang="scss" src="./styles/app.scss" />
