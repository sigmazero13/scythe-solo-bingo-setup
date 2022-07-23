<template>
  <div>
    <b-container>
      <b-row align-v="start">
        <b-col cols="6" class="wg-header"><b>Airships:</b></b-col>
        <b-col cols="6">
          <span class="wg-col air-active"><b>A:</b> {{ active_string }}</span>
          <span class="wg-col air-passive"><b>P:</b> {{ passive_string }}</span>
        </b-col>
      </b-row>
      <b-row align-v="start">
        <b-col cols="6" class="wg-header"><b>Resolution:</b></b-col>
        <b-col cols="6" class="wg-col">{{ resolution_string }}</b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { AirshipActives, AirshipPassives, Resolutions } from "../constants.js";

import saveState from "vue-save-state";

export default {
  name: "WindGambit",
  mixins: [saveState],
  data() {
    return {
      ship_status: 0,
      active: { name: "Not yet selected...", num: 0 },
      passive: { name: "Not yet selected...", num: 0 },
      resolution: { name: "Not yet selected...", num: 0 },
    };
  },
  methods: {
    reset() {
      this.ship_status = 0;
      this.active = { name: "Not yet selected...", num: 0 };
      this.passive = { name: "Not yet selected...", num: 0 };
      this.resolution = { name: "Not yet selected...", num: 0 };
    },
    makeSelection() {
      var choice = Math.floor(Math.random() * 6);
      if (choice == 2 || choice >= 4) {
        this.ship_status = 2;
        this.active = this.pickCardOption(AirshipActives);
        this.passive = this.pickCardOption(AirshipPassives);
      } else {
        this.ship_status = 1;
        this.active = { name: "Not used", num: 0 };
        this.passive = { name: "Not used", num: 0 };
      }

      if (choice == 3 || choice >= 4) {
        this.resolution = this.pickCardOption(Resolutions);
      } else {
        this.resolution = { name: "Not used", num: 0 };
      }

      this.$emit("update", {
        field: "air-active",
        value: this.active["num"],
      });
      this.$emit("update", {
        field: "air-passive",
        value: this.passive["num"],
      });
      this.$emit("update", {
        field: "resolution",
        value: this.resolution["num"],
      });
    },

    pickCardOption(card_type) {
      return card_type[Math.floor(Math.random() * card_type.length)];
    },

    formatCardString(card) {
      if (card["num"] > 0) {
        return "(" + card["num"] + ") " + card["name"];
      } else {
        return card["name"];
      }
    },

    getSaveStateConfig() {
      return { cacheKey: "WindGambit" };
    },
  },

  computed: {
    active_string() {
      return this.formatCardString(this.active);
    },

    passive_string() {
      return this.formatCardString(this.passive);
    },

    resolution_string() {
      return this.formatCardString(this.resolution);
    },
  },
};
</script>

<style scoped>
.wg-header {
  text-align: right;
  font-size: 0.9em;
}

.wg-col {
  text-align: left;
  font-size: 0.8em;
  width: 100%;
  display: block;
}

.air-active {
  color: #990000;
}

.air-passive {
  color: #009900;
}
</style>
