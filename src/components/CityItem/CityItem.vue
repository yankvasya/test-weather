<template>
  <div class="city-item">
    <a class="city-item__drag" href="#">
      <img
        class="city-item__drag-img"
        src="../../assets/icons/utils/list.svg"
        alt="drag-n-drop"
      />
    </a>

    <h4 class="city-item__title">London, UK</h4>

    <a class="city-item__delete" href="#">
      <img
        class="city-item__delete-img"
        src="../../assets/icons/utils/trash.svg"
        alt="drag-n-drop"
      />
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CityItem",
});
</script>

<style lang="scss" scoped src="./index.scss" />
