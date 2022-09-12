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
            src="../assets/icons/weather/sse.svg"
            alt="wind direction"
          />
          <h5 class="detail__text">
            {{ city.wind.speed }}m/s {{ getWindDirection }}
          </h5>
        </li>
        <li class="weather__detail detail">
          <img
            class="detail__image"
            src="../assets/icons/weather/hpa.svg"
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
      return new URL(
        `../assets/images/weathers/${props.city.weather[0].main.toLowerCase()}.png`,
        import.meta.url
      ).href;
    },
    getWindDirection(props: { city: ICityWeather }) {
      const deg = props.city.wind.deg;
      if (deg >= 22.5 && deg < 45) {
        return "NNE";
      } else if (deg >= 45 && deg < 67.5) {
        return "NE";
      } else if (deg >= 67.5 && deg < 90) {
        return "ENE";
      } else if (deg >= 90 && deg < 112.5) {
        return "E";
      } else if (deg >= 112.5 && deg < 135) {
        return "ESE";
      } else if (deg >= 135 && deg < 157.5) {
        return "SE";
      } else if (deg >= 157.5 && deg < 180) {
        return "SSE";
      } else if (deg >= 180 && deg < 202.5) {
        return "S";
      } else if (deg >= 202.5 && deg < 225) {
        return "SSW";
      } else if (deg >= 225 && deg < 247.5) {
        return "SW";
      } else if (deg >= 247.5 && deg < 270) {
        return "WSW";
      } else if (deg >= 270 && deg < 292.5) {
        return "W";
      } else if (deg >= 292.5 && deg < 315) {
        return "WNW";
      } else if (deg >= 315 && deg < 337.5) {
        return "NW";
      } else if (deg >= 337.5 && deg < 360) {
        return "NNW";
      } else {
        return "N";
      }
    },
  },
});
</script>

<style lang="scss" />
