<template>
  <div id="app">
    <div class="header">
      <h1>Scythe Bingo Reloaded:</h1>
    </div>
    <b-container class="app-container">
      <b-tabs
        content-class="mt-3"
        nav-wrapper-class="sticky-top tab-custom bg-light"
        v-model="cur_tab"
      >
        <b-tab active>
          <template v-slot:title>
            <b-icon-journal-text />
          </template>
          <CampaignView
            ref="campaign"
            @newgame="newGame"
            @editgame="editGame"
          />
        </b-tab>
        <b-tab>
          <template v-slot:title>
            <b-icon-award />
          </template>
          <AchievementView ref="achievements" />
        </b-tab>
        <b-tab>
          <template v-slot:title>
            <b-icon-gear-wide-connected />
          </template>
          <GameView ref="game" @savegame="saveGame" @update="updateFromGame" />
        </b-tab>
        <b-tab>
          <template v-slot:title>
            <b-icon-map />
          </template>
          <MapView ref="map" @selectFactions="selectFactionsFromMap" />
        </b-tab>
        <b-tab>
          <template v-slot:title>
            <b-icon-dice6 />
          </template>
          <RandomizerView ref="random" @update="updateFromRandomizer" />
        </b-tab>
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
import AchievementView from "./components/AchievementView.vue";
import CampaignView from "./components/CampaignView.vue";
import GameView from "./components/GameView.vue";
import MapView from "./components/MapView.vue";
import RandomizerView from "./components/RandomizerView.vue";

const CAMPAIGN_TAB = 0;
const GAME_TAB = 2;

export default {
  name: "App",
  components: {
    AchievementView,
    CampaignView,
    GameView,
    MapView,
    RandomizerView,
  },
  data() {
    return {
      cur_tab: CAMPAIGN_TAB,
    };
  },
  methods: {
    // For most of these, App is just used as a communications hub, passing the
    // data object to the specific view that needs it.  See the specific view
    // file for details on what the object looks like, if needed.

    newGame() {
      this.$refs.game.newGame();
      this.$refs.random.reset();
      this.cur_tab = GAME_TAB;
    },
    editGame(data) {
      this.$refs.game.editGame(data);
      this.$refs.random.reset();
      this.cur_tab = GAME_TAB;
    },
    saveGame() {
      this.$refs.campaign.saveGame();
      this.cur_tab = CAMPAIGN_TAB;
    },
    updateFromGame(data) {
      this.$refs.random.updateFaction(data);
    },
    updateFromRandomizer(data) {
      this.$refs.game.update(data);
    },
    selectFactionsFromMap({ p_faction, a_faction, location }) {
      this.$refs.game.newGame();

      if (p_faction !== "") {
        this.$refs.game.update({ field: "player-faction", value: p_faction });
        this.$refs.game.update({ field: "automa-faction", value: a_faction });

        this.$refs.random.updateFaction({
          field: "player-faction",
          value: p_faction,
        });
        this.$refs.random.updateFaction({
          field: "automa-faction",
          value: a_faction,
        });
      }
      this.$refs.game.update({ field: "location", value: location });
      this.cur_tab = GAME_TAB;
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
  padding-top: 50px;
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
  z-index: 1000;
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding-top: 5px;
  background-color: #ddf;
  z-index: 1000;
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
