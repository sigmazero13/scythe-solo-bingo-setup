<template>
  <div>
    <b-container>
      <b-row>
        <b-col cols="5"><b>Victory Track:</b></b-col>
        <b-col cols="7">{{ track }}</b-col>
      </b-row>
      <b-row
        v-for="(row, row_index) in formattedTrack"
        v-bind:key="`track-row-${row_index}`"
      >
        <b-col
          v-for="(item, index) in row"
          v-bind:key="`track-col-${row_index}-${index}`"
          class="track-col"
          v-bind:class="trackClass(item['influence'])"
        >
          {{ item["text"] }}
        </b-col>
      </b-row>
      <br />
      <b-row align-v="center">
        <b-col><b>Tunnels: </b></b-col>
        <b-col
          v-for="(tunnel, tunnel_index) in tunnels"
          v-bind:key="`tunnel-col-${tunnel_index}`"
          class="tunnel-col"
          v-bind:class="trackClass(tunnel['influence'])"
        >
          {{ tunnel.text }}
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "VictoryTrack",
  data() {
    return {
      track: "Not yet selected...",
      track_items: Array(10).fill({ text: "..." }),
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
  methods: {
    makeSelection() {
      var choice = Math.floor(Math.random() * 6);
      switch (choice) {
        case 0:
        case 1:
          this.track = "Standard";
          this.buildNormalTrack();
          break;
        case 2:
          this.track = "Peace";
          this.buildPeaceTrack();
          break;
        case 3:
          this.track = "War";
          this.buildWarTrack();
          break;
        case 4:
        case 5:
          this.track = "Random";
          this.buildRandomTrack();
          break;
      }

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
    },

    buildNormalTrack() {
      this.track_items = [
        { text: "6 Upg" },
        { text: "4 Mch" },
        { text: "4 Str" },
        { text: "4 Rec" },
        { text: "8 Wrk" },
        { text: "Obj" },
        { text: "Cbt" },
        { text: "Cbt" },
        { text: "18 Pop" },
        { text: "16 Pow" },
      ];
    },

    buildWarTrack() {
      this.track_items = [
        { text: "6 Upg/4 Str" },
        { text: "4 Mch" },
        { text: "4 Rec" },
        { text: "Obj" },
        { text: "Cbt" },
        { text: "Cbt" },
        { text: "Cbt" },
        { text: "Cbt" },
        { text: "16 Pow" },
        { text: "8 CCrd" },
      ];
    },

    buildPeaceTrack() {
      this.track_items = [
        { text: "6 Upg" },
        { text: "4 Str" },
        { text: "4 Mch/4 Rec" },
        { text: "8 Wrk" },
        { text: "Obj" },
        { text: "Obj" },
        { text: "13 Pop" },
        { text: "3 Enc" },
        { text: "Fact" },
        { text: "16 Res" },
      ];
    },

    buildRandomTrack() {
      var options = [
        "6 Upg",
        "4 Mch",
        "4 Str",
        "4 Rec",
        "8 Wkr",
        "Obj",
        "Cbt",
        "Cbt",
        "Cbt",
        "Cbt",
        "18 Pop",
        "3 Enc",
        "Fact",
        "16 Pow",
        "8 CCrd",
        "16 Res",
      ];

      // var desolation = [
      //   "7 Hex",
      //   "20 $$",
      //   "9-pt Bonus",
      //   "Obj",
      //   "5 Star",
      // ]
      var track_options = [];

      while (track_options.length < 10) {
        var choice = Math.floor(Math.random() * options.length);
        if (!track_options.includes(choice)) {
          track_options.push(choice);
        }
      }

      track_options.sort((a, b) => a - b);
      this.track_items = [];
      for (var option_num of track_options) {
        this.track_items.push({ text: options[option_num] });
      }
    },
  },

  computed: {
    formattedTrack() {
      return this.track_items.reduce((rows, value, i) => {
        if (i % 5 === 0) rows.push([]);
        rows[rows.length - 1].push(value);
        return rows;
      }, []);
    },
    trackClass() {
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
