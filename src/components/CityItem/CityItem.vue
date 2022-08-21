<template>
  <div class="city-item">
    <a class="city-item__drag" href="#">
      <img
        class="city-item__drag-img"
        src="../../assets/icons/utils/list.svg"
        alt="drag-n-drop"
      />
    </a>

    <h4 class="city-item__title">{{ name }}</h4>

    <a @click.prevent="deleteCity" class="city-item__delete" href="#">
      <img
        class="city-item__delete-img"
        src="../../assets/icons/utils/trash.svg"
        alt="drag-n-drop"
      />
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "CityItem",
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  methods: {
    deleteCity() {
      this.$emit("delete:item", this.name);
    },
  },
});
</script>

<style lang="scss" scoped src="./index.scss" />
