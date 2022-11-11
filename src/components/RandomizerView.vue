<template>
  <div class="random-view">
    <b-button @click="selectOptions()" variant="primary" class="randobutton">
      Randomize Game Options
    </b-button>
    <TriumphTrack ref="vtrack" @update="update" />
    <br />
    <WindGambit ref="windgambit" @update="update" />
    <GeneralStuff ref="general" @update="update" @config="config" />
    <b-modal
      id="structure-modal"
      ref="structure-modal"
      title="Modular Board Bonuses?"
      ok-only="true"
    >
      THIS IS WHERE IT WILL GO.
    </b-modal>
  </div>
</template>

<script>
import TriumphTrack from "./TriumphTrack.vue";
import WindGambit from "./WindGambit.vue";
import GeneralStuff from "./GeneralStuff.vue";
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
    config(data) {
      if (data == "structure") {
        this.$refs["structure-modal"].show();
      }
    },
    reset() {
      this.$refs.vtrack.reset();
      this.$refs.windgambit.reset();
      this.$refs.general.reset();
    },
    selectOptions() {
      this.$refs.vtrack.makeSelection();
      this.$refs.windgambit.makeSelection();
    },
    update(data) {
      this.$emit("update", data);
    },
    updateFaction(data) {
      // Just passing the data down to the sub-view
      this.$refs.general.updateFaction(data);
    },
  },
};
</script>

<style scoped>
.random-view {
  padding-bottom: 30px;
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
