<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <b>Your Faction: </b>
          <b-button class="faction-button" @click="makeSelection('c')">
            Crimea
          </b-button>
          <b-button class="faction-button" @click="makeSelection('r')">
            Rusviet
          </b-button>
          <b-button class="faction-button" @click="makeSelection('x')">
            Other
          </b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="gen-header" cols="6"><b>Player Board:</b></b-col>
        <b-col class="gen-col" cols="6">
          {{ player_board["name"] }} ({{ player_board["num"] }})
        </b-col>
      </b-row>
      <b-row>
        <b-col class="gen-header" cols="6"><b>Structure Bonus:</b></b-col>
        <b-col class="gen-col" cols="6">{{ structure_bonus["name"] }}</b-col>
      </b-row>
      <b-row>
        <b-col class="gen-header" cols="6"><b>Fenris/Vesna Offset:</b></b-col>
        <b-col class="gen-col" cols="6">{{ fv_offset }}</b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { Factions, PlayerMats, StructureBonuses } from "../constants.js";

export default {
  name: "GeneralStuff",
  data() {
    return {
      player_board: { name: "Not yet selected...", num: "..." },
      structure_bonus: { name: "Not yet selected..." },
      fv_offset: "...",
    };
  },
  methods: {
    makeSelection(faction_id) {
      this.player_board = this.pickBoard(faction_id);
      this.structure_bonus = this.pickBonus();
      this.fv_offset = Math.floor(Math.random() * 6) + 1;
    },

    pickBoard(faction_id) {
      const faction = Factions[faction_id];
      if ("exclude" in faction) {
        var board_num = Math.floor(Math.random() * 6);
        if (faction["exclude"] === PlayerMats[board_num]["num"]) {
          board_num = 6;
        }
        return PlayerMats[board_num];
      } else {
        return PlayerMats[Math.floor(Math.random() * 7)];
      }
    },

    pickBonus() {
      var bonus = Math.floor(Math.random() * StructureBonuses.length);
      return StructureBonuses[bonus];
    },
  },
};
</script>

<style scoped>
.gen-header {
  text-align: right;
  font-size: 0.9em;
}

.gen-col {
  text-align: left;
  font-size: 0.8em;
}

.faction-button {
  margin-left: 7px;
  margin-top: 7px;
  margin-bottom: 7px;
  padding: 2px;
}
</style>
