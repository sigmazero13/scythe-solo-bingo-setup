<template>
  <div class="map-view">
    MAP
    <div v-for="c in playableCells" v-bind:key="c.data">
      {{ c.q }}, {{ c.r }} :
      <span v-if="c.data === 'FACTORY'">FACTORY</span>
      <span v-else>
        <FactionIcon :icon="c.data[0]" :scale="0.25" />
        vs
        <FactionIcon :icon="c.data[1]" :scale="0.25" />
      </span>
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
        var game_data =
          game.location === "factory"
            ? "FACTORY"
            : game.p_faction + game.a_faction;
        updatedPlayed.push(game_data);
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
