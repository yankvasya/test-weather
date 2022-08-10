<template>
  <div class="weather-item">
    <div class="weather">
      <h3 class="weather__title">London, UK</h3>

      <div class="weather__info">
        <img
          class="weather__img"
          src="../../assets/images/weathers/cloudy.png"
          alt="cloudy"
        />
        <h4 class="weather__degree">7&deg;C</h4>
      </div>

      <p class="weather__description">
        Feels like -3&deg;C. Broken clouds. Light breeze
      </p>

      <ul class="weather__details">
        <li class="weather__detail detail">
          <img
            class="detail__image"
            src="../../assets/icons/weather/sse.svg"
            alt="SSE"
          />
          <h5 class="detail__text">3.0m/s SSE</h5>
        </li>
        <li class="weather__detail detail">
          <img
            class="detail__image"
            src="../../assets/icons/weather/hpa.svg"
            alt="hPa"
          />
          <h5 class="detail__text">1021hPa</h5>
        </li>
      </ul>

      <ul class="weather__statistics">
        <li class="weather__humidity">Humidity: 97%</li>
        <li class="weather__dew-point">Dew point: 0&deg;C</li>
        <li class="weather__visibility">Visibility: 10.0km</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "WeatherItem",
  components: {},
});
</script>

<style lang="scss" scoped src="./index.scss" />
