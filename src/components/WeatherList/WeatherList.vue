<template>
  <div class="weather-list">
    <a
      @click.prevent="openSettings"
      class="weather-list__open-settings open-settings"
      href="#"
    >
      <img
        class="open-settings__img"
        src="../../assets/icons/utils/settings.svg"
        alt="settings"
      />
    </a>

    <ul v-if="cities.length" class="weather-list__list">
      <li v-for="city of cities" :key="city.name" class="weather-list__item">
        <weather-item :city="city" />
      </li>
    </ul>

    <h3 v-else>Не сохраненных городов</h3>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import WeatherItem from "@/components/WeatherItem/WeatherItem.vue";
import { ICityWeather } from "@/types/types";

export default defineComponent({
  name: "WeatherList",
  props: {
    cities: {
      type: Object as PropType<ICityWeather[]>,
    },
  },
  components: {
    WeatherItem,
  },
  methods: {
    openSettings() {
      this.$emit("update:openSettings", true);
    },
  },
});
</script>

<style lang="scss" scoped src="./index.scss" />
