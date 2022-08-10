<template>
  <div class="custom-input" :class="{ active: active }">
    <input
      @keydown.enter.prevent="downEnterInput"
      @keyup.enter.prevent="upEnterInput"
      class="custom-input__input"
      type="text"
      v-model="value"
    />
    <a class="custom-input__btn" href="#">
      <img
        class="custom-input__img"
        src="../../../assets/icons/utils/enter.svg"
        alt="Нажмите Enter"
      />
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CustomInput",
  data() {
    return {
      value: "",
      active: false,
    };
  },
  methods: {
    downEnterInput() {
      this.active = true;
    },
    upEnterInput() {
      this.active = false;
      this.$emit("updated:value");
    },
  },
});
</script>

<style lang="scss" scoped src="./index.scss" />
