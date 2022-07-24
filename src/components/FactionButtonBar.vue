<template>
  <div>
    <b-form-radio-group
      id="id"
      :checked="value"
      name="name"
      buttons
      @change="change"
    >
      <b-form-radio
        v-for="faction in factions"
        :key="faction['id']"
        :value="faction['id']"
        class="faction-btn"
        button-variant="outline-primary"
      >
        <FactionIcon :icon="faction['id']" :scale="0.25" />
      </b-form-radio>
    </b-form-radio-group>
  </div>
</template>

<script>
import { Factions } from "../constants.js";
import FactionIcon from "./FactionIcon.vue";

export default {
  name: "FactionButtonBar",
  components: {
    FactionIcon,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {};
  },
  methods: {
    change(event) {
      this.$emit("update", event);
    },
  },
  computed: {
    factions() {
      var x = Object.entries(Factions).map(([k, v]) => {
        return { id: k, name: v["name"], offset: v["offset"] };
      });
      return x;
    },
  },
};
</script>

<style scoped>
.faction-btn {
  padding: 2px;
}
</style>
