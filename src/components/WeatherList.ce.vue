<template>
  <div class="weather-list">
    <a
      @click.prevent="openSettings"
      class="weather-list__open-settings open-settings"
      href="#"
    >
      <img
        class="open-settings__img"
        src="../assets/icons/utils/settings.svg"
        alt="settings"
      />
    </a>

    <h3 v-if="!allCities.length">No saved cities!</h3>

    <h4 v-else-if="!cities.length">Loading weathers...</h4>

    <ul v-else class="weather-list__list">
      <li
        v-for="city of sortedCities"
        :key="city.name"
        class="weather-list__item"
      >
        <weather-item :city="city" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import WeatherItem from "@/components/WeatherItem.ce.vue";
import { ICityWeather } from "@/types/types";

export default defineComponent({
  name: "WeatherList",
  props: {
    cities: {
      type: Object as PropType<ICityWeather[]>,
      required: true,
    },
    allCities: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  components: {
    WeatherItem,
  },
  computed: {
    sortedCities(): ICityWeather[] {
      return [...this.cities].sort(
        (a: ICityWeather, b: ICityWeather) =>
          (a?.sortID || 0) - (b?.sortID || 0)
      );
    },
  },
  methods: {
    openSettings(): void {
      this.$emit("update:openSettings", true);
    },
  },
});
</script>

<style lang="scss" />
