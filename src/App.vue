<template>
  <div id="app">
    <div class="header">
      <h1>Scythe Bingo Reloaded</h1>
    </div>
    <b-container class="app-container">
      <b-tabs
        content-class="mt-3"
        nav-wrapper-class="sticky-top tab-custom bg-light"
      >
        <b-tab title="New Game"><GameView ref="game" /></b-tab>
        <b-tab title="Randomize" active>
          <RandomizerView @update="update_from_randomizer" />
        </b-tab>
        <b-tab title="Log">THE LOG GOES HERE</b-tab>
      </b-tabs>
    </b-container>
    <div class="footer">
      <p class="disclaimer">
        "Bingo Reloaded" variant created by Steven St. John
      </p>
      <p class="disclaimer">
        Scythe Icons are &copy;Stonemeier Games, and are used with permission.
      </p>
    </div>
  </div>
</template>

<script>
import GameView from "./components/GameView.vue";
import RandomizerView from "./components/RandomizerView.vue";

export default {
  name: "App",
  components: {
    RandomizerView,
    GameView,
  },
  data() {
    return {};
  },
  methods: {
    update_from_randomizer(data) {
      console.log("App received update event: " + data["field"]);
      this.$refs.game.update(data);
    },
  },
};
</script>

<style>
html,
body {
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 50px;
  height: 100%;
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

.header {
  position: fixed;
  top: 0;
  padding-top: 10px;
  height: 50px;
  width: 100%;
  background-color: #ddf;
  z-index: 2000;
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding-top: 5px;
  background-color: #ddf;
}

.tab-custom {
  top: 50px;
}

.disclaimer {
  padding: 0px;
  margin: 0px;
  font-size: 0.5em;
}
</style>
