<template>
  <div id="app">
    <b-container>
      <h1>Scythe Bingo Reloaded</h1>
      <b-button @click="selectOptions()" variant="primary" class="randobutton">
        Randomize Selections
      </b-button>
      <VictoryTrack ref="vtrack" />
      <br />
      <WindGambit ref="windgambit" />
      <GeneralStuff ref="general" />
    </b-container>
  </div>
</template>

<script>
import VictoryTrack from "./components/VictoryTrack.vue";
import WindGambit from "./components/WindGambit.vue";
import GeneralStuff from "./components/GeneralStuff.vue";
import { BButton } from "bootstrap-vue";

export default {
  name: "App",
  components: {
    VictoryTrack,
    WindGambit,
    GeneralStuff,
    BButton,
  },
  data() {},
  methods: {
    selectOptions() {
      this.$refs.vtrack.makeSelection();
      this.$refs.windgambit.makeSelection();
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.randobutton {
  margin-bottom: 1em;
}

h1 {
  font-size: 1.7rem;
}
</style>
