<template>
  <div class="random-view">
    <b-button @click="selectOptions()" variant="primary" class="randobutton">
      Randomize Selections
    </b-button>
    <TriumphTrack ref="vtrack" @update="update" />
    <br />
    <WindGambit ref="windgambit" />
    <GeneralStuff ref="general" @update="update" />
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
    selectOptions() {
      this.$refs.vtrack.makeSelection();
      this.$refs.windgambit.makeSelection();
    },
    update(data) {
      console.log("RandomizerView received update event: " + data["field"]);
      this.$emit("update", data);
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
