<template>
  <div
    @dragstart="startDrag($event, name)"
    @dragend="endDrag($event, name)"
    @dragover.prevent
    @dragenter.prevent
    @drop="onDrop($event, name)"
    draggable="true"
    class="city-item"
    :class="{ draggable: draggable }"
  >
    <a @click.prevent class="city-item__drag" href="#">
      <img
        class="city-item__drag-img"
        src="../assets/icons/utils/list.svg"
        alt="drag-n-drop"
      />
    </a>

    <h4 class="city-item__title">{{ id }} {{ name }}</h4>

    <a @click.prevent.stop="deleteCity" class="city-item__delete" href="#">
      <img
        class="city-item__delete-img"
        src="../assets/icons/utils/trash.svg"
        alt="drag-n-drop"
      />
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "CityItem",
  emits: [
    "delete:item",
    "updated:startDrag",
    "updated:endDrag",
    "updated:drop",
  ],
  props: {
    name: {
      type: String as PropType<string>,
    },
    id: {
      type: Number as PropType<number>,
    },
  },
  data() {
    return {
      draggable: false,
    };
  },
  methods: {
    deleteCity(): void {
      this.$emit("delete:item", this.name);
    },
    startDrag(event: Event, name: string): void {
      this.draggable = true;
      this.$emit("updated:startDrag", event, name);
    },
    endDrag(event: Event, name: string): void {
      this.draggable = false;
      this.$emit("updated:endDrag", event, name);
    },
    onDrop(event: Event, name: string): void {
      this.$emit("updated:drop", event, name);
    },
  },
});
</script>

<style lang="scss" />
