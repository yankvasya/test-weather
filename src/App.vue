<template>
  <WeatherList />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WeatherList from "@/components/WeatherList/WeatherList.vue";

export default defineComponent({
  name: "App",
  components: {
    WeatherList,
  },
});
</script>

<style lang="scss" src="./styles/app.scss" />
