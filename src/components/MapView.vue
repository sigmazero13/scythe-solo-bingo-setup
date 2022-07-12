<template>
  <div class="map-view">
    MAP
    <div
      v-for="(col, col_idx) in playableCells"
      v-bind:key="col_idx"
      class="column"
    >
      <div
        v-for="cell in col"
        v-bind:key="cell.data"
        class="cell"
        @click="selectMatchup(cell)"
      >
        <span v-if="cell.data === 'FACTORY'">FACTORY</span>
        <span v-else>
          <FactionIcon :icon="cell.data[0]" :scale="0.25" />
          vs
          <FactionIcon :icon="cell.data[1]" :scale="0.25" />
        </span>
      </div>
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
    updatePlayed(game_list) {
      var updatedPlayed = [];
      for (var game of game_list) {
        var game_data =
          game.location === "factory"
            ? "FACTORY"
            : game.p_faction + game.a_faction;
        updatedPlayed.push(game_data);
      }

      this.played = updatedPlayed;
    },
    splitCellsByColumn(cells) {
      var columns = [];
      var last_q = null;
      var this_col = [];

      for (var cell of cells) {
        if (cell.q !== last_q) {
          if (this_col.length > 0) {
            columns.push(this_col);
          }
          this_col = [];
        }

        this_col.push(cell);
      }

      if (this_col.length > 0) {
        columns.push(this_col);
      }

      return columns;
    },
    selectMatchup(cell) {
      var matchup_info = { factions: "", location: "normal" };

      if (cell.data === "FACTORY") {
        matchup_info["location"] = "factory";
      } else {
        matchup_info["factions"] = cell.data;
        matchup_info["location"] = cell.tunnel ? "tunnel" : "normal";
      }
      this.$emit("selectFactions", matchup_info);
    },
  },
  computed: {
    playableCells() {
      return this.splitCellsByColumn(availableCells(this.played));
    },
  },
};
</script>

<style scoped>
.map-view {
  padding-bottom: 30px;
}

div.column {
  padding-bottom: 8px;
}

div.cell {
  padding-bottom: 0px;
}
</style>
