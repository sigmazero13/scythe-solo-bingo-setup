<template>
  <div class="game-view">
    <div v-if="game_id === 0">
      <h1>No Game Open</h1>
    </div>
    <div v-else>
      <h1>Game Info</h1>
      <b-form>
        <b-form-group label="Game ID:" label-cols="3">
          <b-form-input id="game-id" v-model="game_id" readonly />
        </b-form-group>
        <b-form-group label="Track:" label-cols="3">
          <b-form-select id="track" v-model="track" :options="tracks" />
        </b-form-group>
        <b-form-group label="Player:" label-cols="3">
          <FactionButtonBar
            id="p_faction"
            name="p_faction"
            selected="p_faction"
            v-model="p_faction"
            @update="updateFaction('player', $event)"
          />
          <br />
          <b-form-group label="Mat:" label-cols="3" label-for="p_mat">
            <b-form-select id="p_mat" v-model="p_mat" :options="mats" />
          </b-form-group>
          <b-form-group label="Score:" label-cols="3" label-for="p_score">
            <b-form-input id="p_score" v-model="p_score" type="number" />
          </b-form-group>
          <b-form-group
            v-if="tie_game"
            label="Winner?"
            label-cols="3"
            label-for="p_win"
          >
            <b-form-checkbox id="p_win" v-model="p_win" />
          </b-form-group>
        </b-form-group>
        <b-form-group label="Automa:" label-cols="3">
          <FactionButtonBar
            id="a_faction"
            name="a_faction"
            selected="a_faction"
            v-model="a_faction"
            @update="updateFaction('automa', $event)"
          />
          <br />
          <b-form-group label="Diff.:" label-cols="3" label-for="a_level">
            <b-form-select
              id="a_level"
              v-model="a_level"
              :options="automa_levels"
            />
          </b-form-group>
          <b-form-group label="Score:" label-cols="3" label-for="a_score">
            <b-form-input id="a_score" v-model="a_score" type="number" />
          </b-form-group>
        </b-form-group>
        <b-form-group label="Airship:" label-cols="3">
          <b-form-group label="A:" label-cols="2" label-for="airship_active">
            <b-form-select
              id="airship_active"
              v-model="airship_active"
              :options="airship_actives"
            />
          </b-form-group>
          <b-form-group label="P:" label-cols="2" label-for="airship_passive">
            <b-form-select
              id="airship_passive"
              v-model="airship_passive"
              :options="airship_passives"
            />
          </b-form-group>
        </b-form-group>
        <b-form-group label="Resolutions:" label-cols="3">
          <b-form-select
            id="resolutions"
            v-model="resolution"
            :options="resolutions"
          />
        </b-form-group>
        <b-form-group label="Bonus:" label-cols="3">
          <InfluenceIcon
            :width="25"
            :icon_num="this.bonus"
            v-b-modal="'bonus-modal'"
          />
          <div class="bonus-text" v-b-modal="'bonus-modal'">
            {{ inf_bonus }}
          </div>
        </b-form-group>
        <b-form-group label="Influence:" label-cols="3">
          <b-form-rating
            id="tokens"
            v-model="tokens"
            stars="3"
            show-clear
            icon-empty="circle"
            icon-full="circle-fill"
          />
        </b-form-group>
        <b-form-group label="Combat Fought During Game?" label-cols="8">
          <b-form-checkbox v-model="combats" class="field-offset" />
        </b-form-group>
        <b-form-group label="Location" label-cols="3">
          <b-form-radio-group
            id="location"
            v-model="location"
            :checked="location"
            buttons
          >
            <b-form-radio value="normal" button-variant="info">
              Normal
            </b-form-radio>
            <b-form-radio value="tunnel" button-variant="info">
              Tunnel
            </b-form-radio>
            <b-form-radio value="factory" button-variant="info">
              Factory
            </b-form-radio>
          </b-form-radio-group>
        </b-form-group>
      </b-form>
      <div v-if="invalid_matchup">
        <b-alert variant="danger" show>
          NOTE: The selected matchup is invalid!
        </b-alert>
      </div>
      <div>
        <b-button @click="save" :disabled="invalid_game" variant="success">
          SAVE
        </b-button>
      </div>
    </div>

    <b-modal id="bonus-modal" title="Influence Bonus" ok-only ok-title="Cancel">
      <div
        v-for="(bonus, inf_idx) in all_bonuses"
        :key="inf_idx"
        :class="infBonusClass(inf_idx)"
        @click="chooseBonus(inf_idx)"
      >
        <InfluenceIcon :width="20" :icon_num="inf_idx" />
        {{ bonus.short }}
      </div>
    </b-modal>
  </div>
</template>

<script>
import {
  AirshipActives,
  AirshipPassives,
  Difficulties,
  Factions,
  InfluenceBonuses,
  PlayerMats,
  Resolutions,
} from "../constants.js";
import { isBlank } from "../helpers/utilities.js";
import { DEFAULT_DATA } from "../models/GameData.js";

import FactionButtonBar from "./FactionButtonBar.vue";
import InfluenceIcon from "./InfluenceIcon.vue";

import { mapGetters } from "vuex";
import { createHelpers } from "vuex-map-fields";

const { mapFields } = createHelpers({
  getterType: "getGameField",
  mutationType: "updateGameField",
});

export default {
  name: "GameView",
  components: { FactionButtonBar, InfluenceIcon },
  data() {
    return {};
  },
  mounted() {
    if (this.p_faction !== null) {
      this.updateFaction("player", this.p_faction);
    }

    if (this.a_faction !== null) {
      this.updateFaction("automa", this.a_faction);
    }
  },
  methods: {
    newGame() {
      for (const key in DEFAULT_DATA) {
        this[key] = DEFAULT_DATA[key];
      }

      this.edit = false;
      this.game_id = this.max_game_id + 1;
      this.bonus = this.next_influence_bonus;
      this.a_level = this.next_automa_level;
    },
    editGame(game_id) {
      var game_data = this.game_by_id(game_id);
      for (const key in DEFAULT_DATA) {
        this[key] = game_data[key];
      }

      this.edit = true;
    },
    save() {
      var game = {};
      if (!this.tie_game) {
        this.p_win = this.winner_by_points;
      }
      for (const key in DEFAULT_DATA) {
        game[key] = this[key];
      }
      this.$emit("savegame", game);
      this.game_id = 0;
      // window.scrollTo(0, 0);
    },
    update({ field, value }) {
      switch (field) {
        case "automa-faction":
          this.a_faction = value;
          break;
        case "player-faction":
          this.p_faction = value;
          break;
        case "player-mat":
          this.p_mat = value;
          break;
        case "triumph-track":
          this.track = value;
          break;
        case "air-active":
          this.airship_active = value;
          break;
        case "air-passive":
          this.airship_passive = value;
          break;
        case "resolution":
          this.resolution = value;
          break;
        case "location":
          this.location = value;
          break;
      }
    },
    updateFaction(who, faction) {
      this[who[0] + "_faction"] = faction;
      this.$emit("update", { field: who + "-faction", value: faction });
    },
    infBonusClass(bonus_idx) {
      var bonus_class = "bonus-choose";
      if (bonus_idx == this.bonus) {
        bonus_class = bonus_class + " bonus-choose-highlight";
      }

      return bonus_class;
    },
    chooseBonus(new_bonus) {
      this.bonus = new_bonus;
      this.$bvModal.hide("bonus-modal");
    },
  },
  computed: {
    ...mapGetters([
      "availableMatchups",
      "max_game_id",
      "next_influence_bonus",
      "next_automa_level",
      "game_by_id",
    ]),
    ...mapFields(Object.keys(DEFAULT_DATA).map((k) => k)),

    all_bonuses() {
      return InfluenceBonuses;
    },
    inf_bonus() {
      return InfluenceBonuses[this.bonus]["short"];
    },
    invalid_game() {
      return (
        isBlank(this.p_faction) ||
        isBlank(this.p_mat) ||
        isBlank(this.a_faction) ||
        isBlank(this.p_score) ||
        isBlank(this.a_score) ||
        (this.airship_active === 0 && this.airship_passive !== 0) ||
        (this.airship_active !== 0 && this.airship_passive === 0)
      );
    },
    invalid_matchup() {
      if (this.edit || isBlank(this.p_faction) || isBlank(this.a_faction)) {
        return false;
      }

      var combo = this.p_faction + this.a_faction;
      if (this.availableMatchups.includes(combo)) {
        return false;
      } else {
        return !(
          this.location === "factory" &&
          this.availableMatchups.includes("FACTORY")
        );
      }
    },
    tracks() {
      return ["Standard", "War", "Peace", "Random"].map((k) => {
        return { value: k, text: k };
      });
    },
    factions() {
      return Object.entries(Factions).map(([k, v]) => {
        return { id: k, name: v["name"], offset: v["offset"] };
      });
    },
    mats() {
      return PlayerMats.map((mat) => {
        return { value: mat["num"], text: mat["name"] };
      });
    },
    automa_levels() {
      return Object.entries(Difficulties).map(([k, v]) => {
        return { value: k, text: v };
      });
    },
    airship_actives() {
      return [{ value: 0, text: "None" }].concat(
        AirshipActives.map((a) => {
          return { value: a["num"], text: "(" + a["num"] + ") " + a["name"] };
        })
      );
    },
    airship_passives() {
      return [{ value: 0, text: "None" }].concat(
        AirshipPassives.map((a) => {
          return { value: a["num"], text: "(" + a["num"] + ") " + a["name"] };
        })
      );
    },
    resolutions() {
      return [{ value: 0, text: "None" }].concat(
        Resolutions.map((a) => {
          return { value: a["num"], text: "(" + a["num"] + ") " + a["name"] };
        })
      );
    },
    winner_by_points() {
      return (
        !(isBlank(this.p_score) || isBlank(this.a_score)) &&
        this.p_score > this.a_score
      );
    },
    tie_game() {
      return (
        !(isBlank(this.p_score) || isBlank(this.a_score)) &&
        this.p_score === this.a_score
      );
    },
  },
};
</script>

<style scoped>
.game-view {
  padding-bottom: 30px;
}

.bonus-text {
  padding-left: 10px;
  display: inline-block;
}

#bonus-modal {
  padding-top: 50px;
}

.bonus-choose {
  padding: 2px;
}

.bonus-choose-highlight {
  background-color: #ffffaa;
}

.field-offset {
  top: 5px;
  z-index: 10;
}
</style>
