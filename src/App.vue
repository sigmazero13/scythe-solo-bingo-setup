<template>
  <div id="app">
    <h1>Scythe Solo Campaign Game Setup</h1>
    <b-button @click="selectOptions()" variant="primary" class="randobutton">
      Randomize Selections
    </b-button>
    <VictoryTrack ref="vtrack" />
    <WindGambit ref="windgambit" />
  </div>
</template>

<script>
import VictoryTrack from "./components/VictoryTrack.vue";
import WindGambit from "./components/WindGambit.vue";
import { BButton } from "bootstrap-vue";

export default {
  name: "App",
  components: {
    VictoryTrack,
    WindGambit,
    BButton,
  },
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

h3 {
  margin-top: 0.5em;
}
</style>
