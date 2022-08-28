<template>
  <div class="weather-item">
    <div class="weather">
      <h3 class="weather__title">{{ city.name }}</h3>

      <div class="weather__info">
        <img
          class="weather__img"
          :src="getWeatherIcon"
          :alt="city.weather[0].main"
        />
        <h4 class="weather__degree">{{ city.main.temp }}&deg;C</h4>
      </div>

      <p class="weather__description">
        Feels like {{ city.main.feels_like }}&deg;C.
        {{ city.weather[0].description }}
      </p>

      <ul class="weather__details">
        <li class="weather__detail detail">
          <img
            class="detail__image"
            src="../../assets/icons/weather/sse.svg"
            alt="SSE"
          />
          <h5 class="detail__text">{{ city.wind.speed }}m/s SSE</h5>
        </li>
        <li class="weather__detail detail">
          <img
            class="detail__image"
            src="../../assets/icons/weather/hpa.svg"
            alt="hPa"
          />
          <h5 class="detail__text">{{ city.main.pressure }}hPa</h5>
        </li>
      </ul>

      <ul class="weather__statistics">
        <li class="weather__humidity">Humidity: {{ city.main.humidity }}%</li>
        <li class="weather__dew-point">
          Dew point: {{ city.main.temp_min }}&deg;C
        </li>
        <li class="weather__visibility">Visibility: {{ city.visibility }}km</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ICityWeather } from "@/types/types";

export default defineComponent({
  name: "WeatherItem",
  props: {
    city: {
      type: Object as PropType<ICityWeather>,
      required: true,
    },
  },
  computed: {
    getWeatherIcon(props: { city: ICityWeather }) {
      const path = `../../assets/images/weathers/${props.city.weather[0].main.toLowerCase()}.png`;

      return new URL(path, import.meta.url).href;
    },
  },
});
</script>

<style lang="scss" scoped src="./index.scss" />
