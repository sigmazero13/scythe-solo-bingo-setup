<template>
  <div>
    <b-container>
      <b-row>
        <b-col cols="5"><b>Triumph Track:</b></b-col>
        <b-col cols="7">{{ track }}</b-col>
      </b-row>
      <b-row
        v-for="(row, row_index) in formatted_track"
        v-bind:key="`track-row-${row_index}`"
      >
        <b-col
          v-for="(item, index) in row"
          v-bind:key="`track-col-${row_index}-${index}`"
          class="track-col"
          v-bind:class="track_class(item['influence'])"
        >
          <TriumphTile :goal="item['text']" :count="item['count']" />
        </b-col>
      </b-row>
      <br />
      <b-row align-v="center">
        <b-col><b>Tunnels: </b></b-col>
        <b-col
          v-for="(tunnel, tunnel_index) in tunnels"
          v-bind:key="`tunnel-col-${tunnel_index}`"
          class="tunnel-col"
          v-bind:class="track_class(tunnel['influence'])"
        >
          {{ tunnel.text }}
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { TriumphVariants, Triumphs } from "../constants.js";
import TriumphTile from "./TriumphTile.vue";

import saveState from "vue-save-state";

export default {
  name: "TriumphTrack",
  components: {
    TriumphTile,
  },
  mixins: [saveState],
  data() {
    return this.new_data();
  },
  methods: {
    new_data() {
      return {
        track: "Not yet selected...",
        track_items: Array(10).fill({ text: "", count: "0" }),
        tunnels: [
          { text: "N" },
          { text: "NE" },
          { text: "SE" },
          { text: "S" },
          { text: "SW" },
          { text: "N" },
        ],
      };
    },
    reset() {
      var clean = this.new_data();
      this.track = clean.track;
      this.track_items = clean.track_items;
      this.tunnels = clean.tunnels;
    },
    makeSelection() {
      var choice = Math.floor(Math.random() * TriumphVariants.length);
      this.track = TriumphVariants[choice];
      this.track_items = this.buildTrack(TriumphVariants[choice].toLowerCase());

      for (var i = 0; i < this.tunnels.length; i++) {
        this.tunnels[i]["influence"] = false;
      }

      var infChoices = [];
      while (infChoices.length < 3) {
        choice = Math.floor(Math.random() * 12);
        if (infChoices.includes(choice)) {
          continue;
        }
        if (choice < 10) {
          infChoices.push(choice);
          this.track_items[choice]["influence"] = true;
        } else {
          do {
            choice = Math.floor(Math.random() * 6);
          } while (infChoices.includes(choice + 10));
          infChoices.push(choice + 10);
          this.tunnels[choice]["influence"] = true;
        }
      }

      this.$emit("update", { field: "triumph-track", value: this.track });
    },

    buildTrackOptions(track_type) {
      return Triumphs.filter((t) => t["tracks"].includes(track_type)).map(
        (t) => {
          return { text: t["text"], count: t["count"] };
        }
      );
    },

    buildRandomTrack() {
      var options = this.buildTrackOptions("random");
      var track_options = [];

      while (track_options.length < 10) {
        var choice = Math.floor(Math.random() * options.length);
        if (!track_options.includes(choice)) {
          track_options.push(choice);
        }
      }

      track_options.sort((a, b) => a - b);

      var track_items = [];
      for (var option_num of track_options) {
        track_items.push(options[option_num]);
      }

      return track_items;
    },

    buildTrack(track_type) {
      if (track_type === "random") {
        return this.buildRandomTrack();
      } else {
        return this.buildTrackOptions(track_type);
      }
    },

    getSaveStateConfig() {
      return { cacheKey: "TriumphTrack" };
    },
  },
  computed: {
    formatted_track() {
      return this.track_items.reduce((rows, value, i) => {
        if (i % 5 === 0) rows.push([]);
        rows[rows.length - 1].push(value);
        return rows;
      }, []);
    },
    track_class() {
      return (influence) => {
        return influence ? "influence" : "";
      };
    },
  },
};
</script>

<style scoped>
ul {
  padding-left: 0;
  list-style-position: inside;
}

.influence-row {
  padding: 0.5em;
}

.track-col {
  border: 1px solid black;
  white-space: nowrap;
  font-size: 0.75em;
  padding-left: 2px;
  padding-right: 2px;
  padding-bottom: 0px;
}

.tunnel-col {
  border: 1px solid black;
  white-space: nowrap;
  font-size: 0.65em;
  padding: 2px;
}

.influence {
  background-color: #ee5555;
}
</style>
