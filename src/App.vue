<template>
  <WeatherList v-if="false" />
  <CitySettings />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WeatherList from "@/components/WeatherList/WeatherList.vue";
import CitySettings from "@/components/CitySettings/CitySettings.vue";

export default defineComponent({
  name: "App",
  components: {
    WeatherList,
    CitySettings,
  },
});
</script>

<style lang="scss" src="./styles/app.scss" />
