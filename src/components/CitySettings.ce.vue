<template>
  <div class="city-settings">
    <a
      @click.prevent="openSettings"
      class="city-settings__close-settings close-settings"
      href="#"
    >
      <img
        class="close-settings__img"
        src="../assets/icons/utils/close.svg"
        alt="close"
      />
    </a>

    <h3 class="city-settings__title">Settings</h3>

    <ul class="city-settings__cities">
      <li
        v-for="city of sortedCurrentCities"
        :key="city.name"
        class="city-settings__city"
      >
        <CityItem
          @updated:startDrag="startDrag"
          :name="city.name"
          :id="city.sortID"
          @updated:drop="onDrop"
          @delete:item="deleteCity"
        />
      </li>
    </ul>

    <div v-if="!currentCities.length">Нет добавленных городов!</div>

    <div class="city-settings__add-location add-location">
      <h4 class="add-location__title">Add location:</h4>
      <CustomInput @updated:value="addCity" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import CityItem from "@/components/CityItem.ce.vue";
import CustomInput from "@/components/UI/CustomInput.ce.vue";
import { ICityWeather } from "@/types/types";

export default defineComponent({
  name: "CitySettings",
  props: {
    cities: {
      type: Array as PropType<ICityWeather[]>,
      required: true,
    },
  },
  emits: [
    "updated:addCity",
    "updated:deleteCity",
    "updated:openSettings",
    "updated:changedSortID",
  ],
  data() {
    const currentCities: ICityWeather[] = [];

    return {
      currentCities: currentCities,
    };
  },
  components: {
    CityItem,
    CustomInput,
  },
  computed: {
    sortedCurrentCities() {
      return [...this.currentCities].sort(
        (a: ICityWeather, b: ICityWeather) =>
          (a?.sortID || 0) - (b?.sortID || 0)
      );
    },
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
    startDrag(evt: Event & { dataTransfer: DataTransfer }, name: string) {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("cityName", name);
    },
    onDrop(evt: Event & { dataTransfer: DataTransfer }, dropName: string) {
      const cityName: string = evt.dataTransfer.getData("cityName");
      const city: ICityWeather | undefined = this.cities.find(
        (item) => item.name == cityName
      );
      const drop: ICityWeather | undefined = this.cities.find(
        (item) => item.name == dropName
      );

      if (!city) return;

      const aID = JSON.parse(JSON.stringify(city?.sortID));
      const bID = JSON.parse(JSON.stringify(drop?.sortID));

      if (aID === bID) return;

      this.currentCities.map((item) => {
        if (item.sortID === aID) {
          item.sortID = bID;
        } else if (item.sortID === bID) {
          item.sortID = aID;
        }

        return item;
      });

      // emit current sorted list
      this.$emit("updated:changedSortID", this.sortedCurrentCities);
    },
  },
  mounted() {
    this.currentCities = this.cities;
  },
  updated() {
    this.currentCities = this.cities;
  },
});
</script>

<style lang="scss" />
