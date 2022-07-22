<template>
  <div class="campaign-view">
    <b-button class="cbutton" variant="primary" @click="newGame">
      NEW GAME
    </b-button>
    <b-button class="cbutton" variant="danger" v-b-modal.confirm-reset-modal>
      RESET CAMPAIGN
    </b-button>
    <br />
    <span id="automa-score" v-if="this.log.length > 0">
      <b>Current Automa Score: {{ automa_score }}</b>
      <br />
      <b>Best Player Score: {{ best_player_score }}</b>
    </span>
    <b-table
      tbody-class="logrow"
      details-td-class="log-details"
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
        <b-icon-chevron-up
          @click="row.toggleDetails"
          v-if="row.detailsShowing"
        />
        <b-icon-chevron-down @click="row.toggleDetails" v-else />
      </template>

      <template #cell(player)="row" class="tablecell">
        <FactionIcon :icon="row.item.p_faction" :scale="0.25" />
        {{ row.item.p_score }}
      </template>

      <template #cell(automa)="row">
        <FactionIcon :icon="row.item.a_faction" :scale="0.25" />
        {{ row.item.a_score }}
      </template>

      <template #cell(scorediff)="row">
        {{ scoreDiff(row.item) }}
        <b-icon-trophy-fill variant="success" v-if="playerWon(row.item)" />
        <b-icon-x-circle-fill variant="danger" v-else />
      </template>

      <template #cell(bonus)="row">
        <InfluenceIcon :icon_num="row.item.bonus" :width="30" />
      </template>

      <template #row-details="row">
        <b-card class="log-details">
          <b-row>
            <b-col cols="4" class="detail">
              <b>Track:</b>
              <br />
              {{ row.item.track }}
            </b-col>
            <b-col cols="4" class="detail">
              <b>Mat:</b>
              <br />
              {{ row.item.p_mat }}
            </b-col>
            <b-col cols="4" class="detail">
              <b>Automa:</b>
              <br />
              {{ automaLevel(row.item) }}
            </b-col>
            <b-col cols="4" class="detail">
              <b>Airships:</b>
              <br />
              {{ airshipInfo(row.item) }}
            </b-col>
            <b-col cols="4" class="detail">
              <b>Resolution:</b><br />
              {{ resolution(row.item) }}
            </b-col>
            <b-col cols="4" class="detail">
              <b>Combats?</b><br />{{ row.item.combats ? "Yes" : "No" }}
            </b-col>
            <b-col cols="4" class="detail">
              <b>Bonus:</b><br />
              <InfluenceIcon :icon_num="row.item.bonus" :width="30" />
            </b-col>
            <b-col cols="4" class="detail">
              <b>Influence:</b>
              <br />
              {{ row.item.tokens }}
            </b-col>
            <b-col cols="4" class="detail">
              <span @click="editGame(row.item.game_id)">
                <b-icon-pencil />
                EDIT
              </span>
              <br />
              <span @click="openDeleteModal(row.item.game_id)">
                <b-icon-trash />
                DELETE
              </span>
            </b-col>
          </b-row>
        </b-card>
      </template>
    </b-table>

    <b-modal
      id="confirm-delete-modal"
      ref="confirm-delete-modal"
      title="Delete Game?"
      @ok="deleteGame"
    >
      <h4>Delete game #{{ game_id_to_delete }}? This cannot be undone!</h4>
    </b-modal>

    <b-modal
      id="confirm-reset-modal"
      title="Reset Campaign?"
      @ok="resetCampaign"
    >
      <h3>
        Do you really want to reset the campaign? This action cannot be undone!
      </h3>
    </b-modal>

    <b-modal
      id="achievement-modal"
      ref="achievement-modal"
      title="Achievements"
      :ok-disabled="too_many_achievements"
      @ok="commitAchievements"
    >
      <div v-if="qualified_achievements.length === 0">
        You did not qualify for any new achievements.
      </div>
      <div v-else>
        You qualified for the following achievements:
        <b-form-checkbox
          v-for="a in qualified_achievements"
          :key="a.key"
          :value="a.key"
          v-model="selected_achievements"
          stacked
        >
          {{ a.text }} ({{ a.points }})
        </b-form-checkbox>
        <div
          v-if="selected_achievements.length > 2"
          class="too-many-achievements"
        >
          You can only select 2 achievements.
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import FactionIcon from "./FactionIcon.vue";
import InfluenceIcon from "./InfluenceIcon.vue";
import { validAchievements } from "../helpers/achievementHelper";
import { Achievements, Difficulties } from "../constants.js";
import { scoreDiff } from "../helpers/utilities.js";

import saveState from "vue-save-state";
import { mapGetters } from "vuex";

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
        { key: "scorediff", label: "Diff." },
        { key: "bonus", label: "Bonus" },
        { key: "show_details", label: "" },
      ],
      game_id_to_delete: -1,
      new_achievement_keys: [],
      selected_achievements: [],
    };
  },
  methods: {
    resetCampaign() {
      this.$store.commit("resetCampaign");
    },
    newGame() {
      this.$emit("newgame"); //, {
    },
    editGame(game_id) {
      this.$emit("editgame", game_id);
    },
    openDeleteModal(game_id) {
      this.game_id_to_delete = game_id;
      this.$refs["confirm-delete-modal"].show();
    },
    deleteGame() {
      this.$store.commit("deleteGame", this.game_id_to_delete);
    },
    saveGame(game_data) {
      this.$store.commit("saveGame", game_data);

      if (game_data.p_score > game_data.a_score) {
        var new_achievements = validAchievements(this.log, this.achieved);
        this.new_achievement_keys = new_achievements;
        this.$refs["achievement-modal"].show();
      }
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
    playerWon(info) {
      if (info === null || info === undefined) return false;
      if (info.p_win === undefined) {
        info.p_win = scoreDiff(info) > 0;
      }
      return info.p_win;
    },
    commitAchievements() {
      this.$store.commit("addAchievements", this.selected_achievements);
      this.selected_achievements = [];
    },
    scoreDiff(game) {
      return scoreDiff(game);
    },
    getSaveStateConfig() {
      return {
        cacheKey: "CampaignView",
        ignoreProperties: [
          "fields",
          "game_id_to_delete",
          "new_achievement_keys",
          "selected_achievements",
        ],
      };
    },
  },
  computed: {
    ...mapGetters([
      "log",
      "achieved",
      "automa_score",
      "achievement_score",
      "best_player_score",
    ]),
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
    qualified_achievements() {
      var q = [];
      for (let a of Achievements) {
        if (this.new_achievement_keys.includes(a.key)) {
          q.push(a);
        }
      }

      return q;
    },
    too_many_achievements() {
      return this.selected_achievements.length > 2;
    },
  },
};
</script>

<style scoped>
.campaign-view {
  padding-bottom: 30px;
}

.cbutton {
  margin-bottom: 1em;
  margin-left: 0.5em;
  margin-right: 0.5em;
}

.logrow {
  color: #ff0000;
}

.log-details {
  font-size: 0.85rem;
}

td.log-details {
  padding: 0.3rem;
}

.log-details .card-body {
  padding: 0.2rem;
}

.log-details .detail {
  margin-bottom: 10px;
}

.too-many-achievements {
  color: red;
}

::v-deep .table td {
  padding: 0.3rem;
  vertical-align: middle;
}
</style>
