<template>
  <div>
    <h1>Game Info</h1>
    <b-form>
      <b-form-group label="Game ID:" label-cols="3">9999</b-form-group>
      <b-form-group label="Inf. Bonus:" label-cols="3">
        Something...
      </b-form-group>
      <b-form-group label="Track:" label-cols="3">
        {{ track }}
      </b-form-group>
      <b-form-group label="Player:" label-cols="3" label-for="p_faction">
        <b-form-select id="p_faction" v-model="p_faction" :options="factions" />
        <br />
        <b-form-select id="p_mat" v-model="p_mat" :options="mats" />
      </b-form-group>
      <b-form-group label="Automa:" label-cols="3" label-for="a_faction">
        <b-form-select id="a_faction" v-model="a_faction" :options="factions" />
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
import { Factions, PlayerMats } from "../constants.js";

export default {
  name: "GameView",
  data() {
    return {
      track: "...",
      p_faction: null,
      p_mat: null,
      a_faction: null,
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
  },
};
</script>

<style scoped></style>
