<template>
  <div class="settings-view">
    <b-form-checkbox v-model="modboard_structure">
      Include Modular Board Bonus Tiles
    </b-form-checkbox>
    <br />
    <b-form-checkbox v-model="hardest_difficulty">
      Include hardest difficulties
    </b-form-checkbox>
  </div>
</template>

<script>
export default {
  name: "SettingsView",
  data() {
    return {};
  },
  computed: {
    modboard_structure: {
      get() {
        return this.$store.state.settings["modular"];
      },
      set(new_value) {
        return this.$store.commit("updateSetting", {
          path: "modular",
          value: new_value,
        });
      },
    },
    hardest_difficulty: {
      get() {
        return this.$store.state.settings["hardest_diff"];
      },
      set(new_value) {
        return this.$store.commit("updateSetting", {
          path: "hardest_diff",
          value: new_value,
        });
      },
    },
  },
};
</script>

<style scoped>
.settings-view {
  padding-bottom: 30px;
}
</style>
