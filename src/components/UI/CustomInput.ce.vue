<template>
  <div class="custom-input" :class="{ active: active }">
    <input
      @keydown.enter.prevent="downEnterInput"
      @keyup.enter.prevent="upEnterInput"
      class="custom-input__input"
      type="text"
      v-model="value"
    />
    <a @click.prevent="updateValue" class="custom-input__btn" href="#">
      <img
        class="custom-input__img"
        src="../../assets/icons/utils/enter.svg"
        alt="Нажмите Enter"
      />
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CustomInput",
  emits: ["updated:value"],
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
      this.updateValue();
    },
    updateValue() {
      this.$emit("updated:value", this.value);
      this.value = "";
    },
  },
});
</script>

<style lang="scss" />
