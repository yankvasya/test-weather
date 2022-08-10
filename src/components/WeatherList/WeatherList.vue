<template>
  <div class="weather-list">
    <a class="weather-list__open-settings open-settings" href="#">
      <img
        class="open-settings__img"
        src="../../assets/icons/utils/settings.svg"
        alt="settings"
      />
    </a>

    <ul class="weather-list__list">
      <li v-for="n of 2" :key="n" class="weather-list__item">
        <weather-item />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WeatherItem from "@/components/WeatherItem/WeatherItem.vue";

export default defineComponent({
  name: "WeatherList",
  components: {
    WeatherItem,
  },
});
</script>

<style lang="scss" scoped src="./index.scss" />
