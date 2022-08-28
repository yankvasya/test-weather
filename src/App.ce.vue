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
      />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WeatherList from "@/components/WeatherList.ce.vue";
import CitySettings from "@/components/CitySettings.ce.vue";
import { ICityWeather, StatusCode } from "@/types/types";

export default defineComponent({
  name: "App",
  props: {
    width: {
      type: String,
      default: "480px",
    },
    api: {
      type: String,
      default: "f0747dfbe799b65db66d4d370bc1db29",
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
    async citiesWeather(): Promise<ICityWeather[]> {
      const weathers: ICityWeather[] = [];
      for await (const city of this.allCities()) {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&units=metric&appid=${this.api}`
        );
        const data: ICityWeather = await response.json();

        switch (data.cod) {
          case StatusCode.CITY_NOT_FOUND:
            await this.deleteCity(city);
            break;
          case StatusCode.INVALID_KEY:
            this.isKeyInvalid = true;
            break;
          case StatusCode.OK:
            weathers.push(data);
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
