<template>
  <div class="city-settings">
    <a
      @click.prevent="openSettings"
      class="city-settings__close-settings close-settings"
      href="#"
    >
      <img
        class="close-settings__img"
        src="../../assets/icons/utils/close.svg"
        alt="close"
      />
    </a>

    <h3 class="city-settings__title">Settings</h3>

    <ul class="city-settings__cities">
      <li v-for="city of cities" :key="city.name" class="city-settings__city">
        <CityItem :name="city.name" @delete:item="deleteCity" />
      </li>
    </ul>

    <div v-if="!cities.length">Нет добавленных городов!</div>

    <div class="city-settings__add-location add-location">
      <h4 class="add-location__title">Add location:</h4>
      <CustomInput @updated:value="addCity" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import CityItem from "@/components/CityItem/CityItem.vue";
import CustomInput from "@/components/UI/CustomInput/CustomInput.vue";
import { ICityWeather } from "@/types/types";

export default defineComponent({
  name: "CitySettings",
  props: {
    cities: {
      type: Array as PropType<ICityWeather[]>,
      required: true,
    },
  },
  emits: ["updated:addCity", "updated:deleteCity", "updated:openSettings"],
  components: {
    CityItem,
    CustomInput,
  },
  methods: {
    addCity(value: string) {
      if (value.trim()) {
        this.$emit("updated:addCity", value);
      }
    },
    deleteCity(value: string) {
      this.$emit("updated:deleteCity", value);
    },
    openSettings() {
      this.$emit("updated:openSettings", false);
    },
  },
});
</script>

<style lang="scss" src="./index.scss" />
