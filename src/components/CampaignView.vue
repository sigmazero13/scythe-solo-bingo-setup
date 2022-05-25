<template>
  <div>
    <b-button class="cbutton" variant="primary" @click="newGame">
      NEW GAME
    </b-button>
    <b-button class="cbutton" variant="danger" @click="resetCampaign">
      RESET CAMPAIGN
    </b-button>
    <b-table
      striped
      hover
      :items="log"
      :fields="fields"
      sort-by="game_id"
      sort-desc
      show-empty
    >
      <template #empty>
        <h4>No games recorded...</h4>
      </template>

      <template #cell(show_details)="row">
        <b-button size="sm" @click="row.toggleDetails">...</b-button>
      </template>

      <template #cell(player)="row">
        <FactionIcon :icon="row.item.p_faction" :scale="0.3" />
        {{ row.item.p_score }}
      </template>

      <template #cell(automa)="row">
        <FactionIcon :icon="row.item.a_faction" :scale="0.3" />
        {{ row.item.a_score }}
      </template>

      <template #row-details="row">
        <b-card>
          <b-row>
            <b-col cols="4"><b>Track:</b> {{ row.item.track }}</b-col>
            <b-col cols="4"><b>Mat:</b> {{ row.item.p_mat }}</b-col>
            <b-col cols="4"><b>Automa:</b> {{ automaLevel(row.item) }}</b-col>
            <b-col cols="4"><b>Airships: </b>{{ airshipInfo(row.item) }}</b-col>
            <b-col cols="4">
              <b>Resolution: </b>
              {{ resolution(row.item) }}
            </b-col>
            <b-col cols="4">
              <b>Combats?</b> {{ row.item.combats ? "Yes" : "No" }}
            </b-col>
            <b-col cols="4">
              <b>Bonus:</b>&nbsp;
              <InfluenceIcon :icon_num="row.item.bonus" :width="30" />
            </b-col>
            <b-col cols="4"><b>Influence:</b> {{ row.item.tokens }}</b-col>
          </b-row>
        </b-card>
      </template>
    </b-table>
  </div>
</template>

<script>
import FactionIcon from "./FactionIcon.vue";
import InfluenceIcon from "./InfluenceIcon.vue";
import { Difficulties } from "../constants.js";

import saveState from "vue-save-state";

export default {
  name: "CampaignView",
  components: { FactionIcon, InfluenceIcon },
  mixins: [saveState],
  data() {
    return {
      fields: [
        { key: "game_id", label: "ID" },
        { key: "player", label: "Player" },
        { key: "automa", label: "Automa" },
        { key: "show_details", label: "" },
      ],
      log: [
        // { game_id: 1, p_faction: "f", p_score: 5, a_faction: "p", a_score: 10 },
        // { game_id: 2, p_faction: "s", p_score: 10, a_faction: "r", a_score: 2 },
      ],
    };
  },
  methods: {
    resetCampaign() {
      // Do nothing yet
    },
    newGame() {
      var max_id = Math.max(...this.log.map((g) => g.game_id));
      if (max_id === -Infinity) max_id = 0;
      this.$emit("newgame", { game_id: max_id + 1 });
    },
    saveGame(data) {
      this.log.push(data);
    },
    automaLevel(info) {
      return Difficulties[info.a_level];
    },
    airshipInfo(info) {
      var active = info.airship_active;
      var passive = info.airship_passive;
      if (active === 0 || passive === 0) {
        return "None";
      } else {
        return "A:" + active + " P:" + passive;
      }
    },
    resolution(info) {
      if (info.resolution === 0) {
        return "None";
      } else {
        return info.resolution;
      }
    },
    getSaveStateConfig() {
      return {
        cacheKey: "CampaignView",
      };
    },
  },
  computed: {
    automa_level(info) {
      return Difficulties[info.a_level];
    },
    log_items() {
      return this.log.map((g) => {
        return {
          game_id: g["game_id"],
          p_faction: g["p_faction"],
          p_score: g["p_score"],
          a_faction: g["a_faction"],
          a_score: g["a_score"],
        };
      });
    },
  },
};
</script>

<style scoped>
.cbutton {
  margin-bottom: 1em;
  margin-left: 0.5em;
  margin-right: 0.5em;
}
</style>
