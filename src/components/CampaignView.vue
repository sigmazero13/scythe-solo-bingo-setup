<template>
  <div>
    <b-button class="cbutton" variant="primary" @click="newGame">
      NEW GAME
    </b-button>
    <b-button class="cbutton" variant="danger" v-b-modal.confirm-reset-modal>
      RESET CAMPAIGN
    </b-button>
    <br />
    <span id="automa-score" v-if="this.log.length > 0">
      <b>Current Automa Score: {{ automa_score }}</b>
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
        <b-icon-trophy-fill variant="success" v-if="scoreDiff(row.item) > 0" />
        <b-icon-x-circle-fill
          variant="danger"
          v-else-if="scoreDiff(row.item) < 0"
        />
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
              <span @click="editGame(row.item)">
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
  </div>
</template>

<script>
import FactionIcon from "./FactionIcon.vue";
import InfluenceIcon from "./InfluenceIcon.vue";
import { Difficulties, InfluenceBonuses } from "../constants.js";

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
        { key: "scorediff", label: "Diff." },
        { key: "bonus", label: "Bonus" },
        { key: "show_details", label: "" },
      ],
      log: [],
      game_id_to_delete: -1,
    };
  },
  methods: {
    resetCampaign() {
      this.log = [];
    },
    newGame() {
      var max_id = Math.max(...this.log.map((g) => g.game_id));
      if (max_id === -Infinity) max_id = 0;
      this.$emit("newgame", {
        game_id: max_id + 1,
        bonus: this.nextInfluenceBonus(),
      });
    },
    editGame(game_data) {
      this.$emit("editgame", game_data);
    },
    openDeleteModal(game_id) {
      this.game_id_to_delete = game_id;
      this.$refs["confirm-delete-modal"].show();
    },
    deleteGame() {
      for (let i in this.log) {
        if (this.log[i].game_id === this.game_id_to_delete) {
          this.log.splice(i, 1);
          return;
        }
      }
    },
    nextInfluenceBonus() {
      var options = Array.from(Array(InfluenceBonuses.length).keys());
      for (let game of this.log.slice(-8)) {
        var idx = options.indexOf(game.bonus);
        if (idx !== -1) {
          options.splice(idx, 1);
        }
      }
      var newBonusIdx = Math.floor(Math.random() * options.length);
      return options[newBonusIdx];
    },
    saveGame(data) {
      for (let i in this.log) {
        if (this.log[i].game_id === data.game_id) {
          for (let key in data) {
            this.log[i][key] = data[key];
          }
          return;
        }
      }

      // If it gets here, it's a new game.
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
    scoreDiff(info) {
      if (info === null || info === undefined) return 0;
      return info.p_score - info.a_score;
    },
    getSaveStateConfig() {
      return {
        cacheKey: "CampaignView",
        ignoreProperties: ["fields", "game_id_to_delete"],
      };
    },
  },
  computed: {
    automa_score() {
      return this.log.reduce((sum, game) => {
        var diff = game.a_score - game.p_score;

        return diff > 0 ? sum + diff : sum;
      }, 0);
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

::v-deep .table td {
  padding: 0.3rem;
  vertical-align: middle;
}
</style>
