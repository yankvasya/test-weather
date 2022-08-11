<template>
  <div class="city-settings">
    <a class="city-settings__close-settings close-settings" href="#">
      <img
        class="close-settings__img"
        src="../../assets/icons/utils/close.svg"
        alt="close"
      />
    </a>

    <h3 class="city-settings__title">Settings</h3>

    <ul class="city-settings__cities">
      <li v-for="n of 2" :key="n" class="city-settings__city">
        <CityItem />
      </li>
    </ul>

    <div class="city-settings__add-location add-location">
      <h4 class="add-location__title">Add location:</h4>
      <CustomInput />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CityItem from "@/components/CityItem/CityItem.vue";
import CustomInput from "@/components/UI/CustomInput/CustomInput.vue";

export default defineComponent({
  name: "CitySettings",
  components: {
    CityItem,
    CustomInput,
  },
});
</script>

<style lang="scss" src="./index.scss" />
