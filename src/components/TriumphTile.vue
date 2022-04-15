<template>
  <div v-if="isDoubleGoal">
    <div class="goal-div">
      <span class="goal-first">
        <TriumphIcon :icon="goals[0]" :scale="0.4" />
      </span>
      <span class="slash">/</span>
      <span class="goal-second">
        <TriumphIcon :icon="goals[1]" :scale="0.4" />
      </span>
    </div>
    <div class="count-div count-half">x{{ counts[0] }} / x{{ counts[1] }}</div>
  </div>
  <div v-else>
    <div class="goal-div">
      <TriumphIcon :icon="goal" :scale="0.6" />
    </div>
    <div class="count-div count-full">x{{ count }}</div>
  </div>
</template>

<script>
import TriumphIcon from "./TriumphIcon.vue";

export default {
  name: "TriumphTile",
  components: {
    TriumphIcon,
  },
  props: {
    goal: String,
    count: String,
  },
  data() {
    return {};
  },
  computed: {
    isDoubleGoal() {
      return this.goal.includes("/");
    },
    goals() {
      return this.goal.split("/");
    },
    counts() {
      return this.count.split("/");
    },
  },
};
</script>

<style scoped>
.goal-div {
  height: 55px;
  vertical-align: middle;
  position: relative;
}

.goal-first {
  position: absolute;
  top: 0px;
  left: -2px;
}

.goal-second {
  position: absolute;
  bottom: -3px;
  right: -2px;
}

.slash {
  position: absolute;
  top: -10%;
  left: 0%;
  width: 100%;
  font-size: 4em;
}

.count-div {
  vertical-align: middle;
}

.count-full {
  padding-top: 0px;
  font-size: 2em;
}

.count-half {
  padding-top: 0px;
  font-size: 1.5em;
}
</style>
