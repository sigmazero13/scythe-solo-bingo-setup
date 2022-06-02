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
    >
      {{ option.text }} ({{ option.points }})
    </b-form-checkbox>
  </div>
</template>

<script>
import { Achievements } from "../constants";

export default {
  name: "AchievementView",
  data() {
    return { achieved: [] };
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
