<template>
  <div class="game-view">
    <h1>Game Info</h1>
    <b-form>
      <b-form-group label="Game ID:" label-cols="3">9999</b-form-group>
      <b-form-group label="Inf. Bonus:" label-cols="3">
        Something...
      </b-form-group>
      <b-form-group label="Track:" label-cols="3">
        {{ track }}
      </b-form-group>
      <b-form-group label="Player:" label-cols="3">
        <b-form-group label="Faction:" label-cols="3" label-for="p_faction">
          <b-form-select
            id="p_faction"
            v-model="p_faction"
            :options="factions"
          />
        </b-form-group>
        <b-form-group label="Mat:" label-cols="3" label-for="p_mat">
          <b-form-select id="p_mat" v-model="p_mat" :options="mats" />
        </b-form-group>
        <b-form-group label="Score:" label-cols="3" label-for="p_score">
          <b-form-input id="p_score" v-model="p_score" />
        </b-form-group>
      </b-form-group>
      <b-form-group label="Automa:" label-cols="3">
        <b-form-group label="Faction:" label-cols="3" label-for="a_faction">
          <b-form-select
            id="a_faction"
            v-model="a_faction"
            :options="factions"
          />
        </b-form-group>
        <b-form-group label="Diff.:" label-cols="3" label-for="a_level">
          <b-form-select
            id="a_level"
            v-model="a_level"
            :options="automa_levels"
          />
        </b-form-group>
        <b-form-group label="Score:" label-cols="3" label-for="a_score">
          <b-form-input id="a_score" v-model="p_score" />
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
      <b-form-group label="Influence:" label-cols="3">
        <b-form-rating
          id="tokens"
          v-model="tokens"
          stars="3"
          show-clear="true"
          icon-empty="circle"
          icon-full="circle-fill"
        />
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
import {
  AirshipActives,
  AirshipPassives,
  Difficulties,
  Factions,
  PlayerMats,
  Resolutions,
} from "../constants.js";

export default {
  name: "GameView",
  data() {
    return {
      track: "...",
      p_faction: null,
      p_mat: null,
      a_faction: null,
      a_level: 2,
      airship_active: 0,
      airship_passive: 0,
      resolution: 0,
      tokens: 0,
    };
  },
  methods: {
    update(data) {
      switch (data["field"]) {
        case "player-mat":
          this.p_mat = data["value"];
          break;
        case "triumph-track":
          this.track = data["value"];
          break;
      }
    },
  },
  computed: {
    factions() {
      return Object.entries(Factions).map(([k, v]) => {
        return { value: k, text: v["name"] };
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
  },
};
</script>

<style scoped>
.game-view {
  padding-bottom: 30px;
}
</style>
