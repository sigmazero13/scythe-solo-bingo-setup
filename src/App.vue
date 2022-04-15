<template>
  <div id="app">
    <b-container class="app-container">
      <h1>Scythe Bingo Reloaded</h1>
      <b-button @click="selectOptions()" variant="primary" class="randobutton">
        Randomize Selections
      </b-button>
      <TriumphTrack ref="vtrack" />
      <br />
      <WindGambit ref="windgambit" />
      <GeneralStuff ref="general" />
    </b-container>
    <p class="disclaimer">
      "Bingo Reloaded" variant created by Steven St. John
    </p>
    <p class="disclaimer">
      Scythe Icons are &copy;Stonemeier Games, and are used with permission.
    </p>
  </div>
</template>

<script>
import TriumphTrack from "./components/TriumphTrack.vue";
import WindGambit from "./components/WindGambit.vue";
import GeneralStuff from "./components/GeneralStuff.vue";
import { BButton } from "bootstrap-vue";

export default {
  name: "App",
  components: {
    TriumphTrack,
    WindGambit,
    GeneralStuff,
    BButton,
  },
  data() {
    return {};
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

h1 {
  font-size: 1.7rem;
}

.app-container {
  margin-bottom: 5px;
}

.disclaimer {
  padding: 0px;
  margin: 0px;
  font-size: 0.5em;
}
</style>
