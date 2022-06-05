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
    addAchievements(data) {
      for (let new_a in data) {
        if (!this.achieved.includes(new_a)) {
          this.achieved.push(new_a);
        }
      }
    },
    achievementToggled(data) {
      this.$emit("refreshAchievements", data);
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
