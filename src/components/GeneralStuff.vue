<template>
  <div>
    <b-container>
      <b-row>
        <b-col cols="3"><b>You: </b></b-col>
        <b-col cols="9">
          <FactionButtonBar
            id="p_faction"
            name="p_faction"
            selected="p_faction"
            v-model="p_faction"
            @update="selectFaction('player', $event)"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="3"><b>Automa: </b></b-col>
        <b-col cols="9">
          <FactionButtonBar
            id="a_faction"
            name="a_faction"
            selected="a_faction"
            v-model="a_faction"
            @update="selectFaction('automa', $event)"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-button
            @click="makeSelection()"
            variant="primary"
            class="randobutton"
            :disabled="button_disabled"
          >
            Randomize Player Options
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
        <b-col class="gen-header" cols="6" @click="configStructure">
          <b>Structure Bonus:</b>
        </b-col>
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

import FactionButtonBar from "./FactionButtonBar.vue";

import saveState from "vue-save-state";

export default {
  name: "GeneralStuff",
  components: { FactionButtonBar },
  mixins: [saveState],
  data() {
    return {
      player_board: { name: "Not yet selected...", num: "..." },
      structure_bonus: { name: "Not yet selected..." },
      fv_offset: "...",
      p_faction: null,
      a_faction: null,
    };
  },
  methods: {
    reset() {
      this.player_board = { name: "Not yet selected...", num: "..." };
      this.structure_bonus = { name: "Not yet selected..." };
      this.fv_offset = "...";
      this.p_faction = null;
      this.a_faction = null;
    },
    configStructure() {
      this.$emit("config", "structure");
    },
    makeSelection() {
      this.player_board = this.pickBoard(this.p_faction);
      this.structure_bonus = this.pickBonus();
      this.fv_offset = Math.floor(Math.random() * 6) + 1;

      if (!this.showOffset()) {
        this.fv_offset = "N/A";
      }

      this.$emit("update", {
        field: "player-mat",
        value: this.player_board["num"],
      });
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
    showOffset() {
      return (
        this.p_faction === "f" ||
        this.p_faction === "v" ||
        this.a_faction === "f" ||
        this.a_faction === "v"
      );
    },
    updateFaction({ field, value }) {
      switch (field) {
        case "automa-faction":
          this.a_faction = value;
          break;
        case "player-faction":
          this.p_faction = value;
          break;
      }
    },
    selectFaction(who, faction) {
      this[who[0] + "_faction"] = faction;
      this.$emit("update", { field: who + "-faction", value: faction });
    },
    getSaveStateConfig() {
      return { cacheKey: "GeneralStuff" };
    },
  },
  computed: {
    button_disabled() {
      return this.p_faction === null || this.a_faction === null;
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

.randobutton {
  margin-left: 7px;
  margin-top: 7px;
  margin-bottom: 7px;
  padding: 2px;
}
</style>
