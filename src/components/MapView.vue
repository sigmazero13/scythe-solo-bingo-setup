<template>
  <div class="map-view">
    MAP
    <div
      v-for="c in playableCells"
      v-bind:key="c.data"
    >
      {{ c.q }}, {{ c.r }} : {{ c.data }}
    </div>
  </div>
</template>

<script>
// import MapData from "../models/MapData.js";
import { availableCells } from "../helpers/mapHelpers.js";

export default {
  name: "MapView",
  data() {
    return { played: [] };
  },
  computed: {
    playableCells() {
      return availableCells(this.played);
    },
  },
};
</script>

<style scoped>
.map-view {
  padding-bottom: 30px;
}
</style>
