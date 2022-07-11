<template>
  <div class="achievement-view">
    <h2>Achievements</h2>
    <b-form-checkbox
      v-for="option in all_achievements"
      v-model="achieved"
      :key="option.key"
      :value="option.key"
      text-field="text"
      class="achievement-option"
      stacked
      @change="achievementToggled"
    >
      {{ option.text }} ({{ option.points }})
    </b-form-checkbox>
  </div>
</template>

<script>
import { Achievements } from "../constants";

import saveState from "vue-save-state";

export default {
  name: "AchievementView",
  mixins: [saveState],
  data() {
    return { achieved: [] };
  },
  mounted() {
    this.$emit("refreshAchievements", this.achieved);
  },
  methods: {
    // "achievements" is a list of achievement keys
    addAchievements(new_achievements) {
      for (let new_a of new_achievements) {
        if (!this.achieved.includes(new_a)) {
          this.achieved.push(new_a);
        }
      }
    },
    achievementToggled(selected_achievements) {
      this.$emit("refreshAchievements", selected_achievements);
    },
    reset() {
      this.achieved = [];
    },
    getSaveStateConfig() {
      return {
        cacheKey: "AchievementView",
      };
    },
  },
  computed: {
    all_achievements() {
      return Achievements;
    },
  },
};
</script>

<style scoped>
.achievement-view {
  padding-bottom: 30px;
  text-align: left;
}

.achievement-option {
  padding-bottom: 5px;
}
</style>
