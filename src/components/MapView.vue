<template>
  <div class="map-view">
    MAP
    <div v-for="c in playableCells" v-bind:key="c.data">
      {{ c.q }}, {{ c.r }} :
      <FactionIcon :icon="c.data[0]" :scale="0.25" />
      vs
      <FactionIcon :icon="c.data[1]" :scale="0.25" />
    </div>
  </div>
</template>

<script>
// import MapData from "../models/MapData.js";
import FactionIcon from "../components/FactionIcon.vue";
import { availableCells } from "../helpers/mapHelpers.js";

export default {
  name: "MapView",
  components: { FactionIcon },
  data() {
    return { played: [] };
  },
  methods: {
    updatePlayed(data) {
      var updatedPlayed = [];
      for (var game of data) {
        updatedPlayed.push(game.p_faction + game.a_faction);
      }

      this.played = updatedPlayed;
    },
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
