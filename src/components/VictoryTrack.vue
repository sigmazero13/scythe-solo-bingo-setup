<template>
  <div>
    <h3>Victory Track:</h3>
    <p>{{ track }}</p>
    <b-container v-if="show_track">
      <b-row
        v-for="(row, row_index) in formattedTrack"
        v-bind:key="`track-row-${row_index}`"
      >
        <b-col
          v-for="(item, index) in row"
          v-bind:key="`track-col-${row_index}-${index}`"
          class="track-col"
        >
          {{ item }}
        </b-col>
      </b-row>
    </b-container>
    <h3>Influence:</h3>
    <b-container class="influence-row">
      <b-row>
        <b-col
          v-for="inf in influence"
          v-bind:key="inf.num"
          class="influence-col"
        >
          {{ inf.text }}
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
      track_items: [],
      tunnels: [
        "North Tunnel",
        "Northeast Tunnel",
        "Southeast Tunnel",
        "South Tunnel",
        "Southwest Tunnel",
        "Northwest Tunnel",
      ],
      influence: [
        { num: 97, text: "Not selected..." },
        { num: 98, text: "Not selected..." },
        { num: 99, text: "Not selected..." },
      ],
      show_track: false,
    };
  },
  methods: {
    makeSelection() {
      var choice = Math.floor(Math.random() * 6);
      switch (choice) {
        case 0:
        case 1:
          this.track = "Standard Track";
          this.show_track = false;
          this.buildNormalTrack();
          break;
        case 2:
          this.track = "Peace Track";
          this.show_track = false;
          this.buildPeaceTrack();
          break;
        case 3:
          this.track = "War Track";
          this.show_track = false;
          this.buildWarTrack();
          break;
        case 4:
        case 5:
          this.track = "Random Track";
          this.show_track = true;
          this.buildRandomTrack();
          break;
      }

      var infChoices = [];
      this.influence = [];
      while (infChoices.length < 3) {
        choice = Math.floor(Math.random() * 12);
        if (infChoices.includes(choice)) {
          continue;
        }
        if (choice < 10) {
          infChoices.push(choice);
          this.influence.push({
            num: choice,
            text: this.track_items[choice],
          });
        } else {
          do {
            choice = Math.floor(Math.random() * 6) + 10;
          } while (infChoices.includes(choice));
          infChoices.push(choice);
          this.influence.push({
            num: choice,
            text: this.tunnels[choice - 10],
          });
        }
      }

      this.influence.sort((a, b) => a.num - b.num);
    },

    buildNormalTrack() {
      this.track_items = [
        "6 Upgrades",
        "4 Mechs",
        "4 Structures",
        "4 Recruits",
        "8 Workers",
        "Objective",
        "Combat",
        "Combat",
        "18 Popularity",
        "16 Power",
      ];
    },

    buildWarTrack() {
      this.track_items = [
        "6 Upg / 4 Str",
        "4 Mechs",
        "4 Recruits",
        "Objective",
        "Combat",
        "Combat",
        "Combat",
        "Combat",
        "16 Power",
        "8 Combat Cards",
      ];
    },

    buildPeaceTrack() {
      this.track_items = [
        "6 Upgrades",
        "4 Structures",
        "4 Mech / 4 Recr",
        "8 Workers",
        "Objective",
        "Objective",
        "13 Popularity",
        "3 Encounters",
        "Factory Card",
        "16 Resources",
      ];
    },

    buildRandomTrack() {
      var options = [
        "6 Upgrades",
        "4 Mechs",
        "4 Structures",
        "4 Recruits",
        "8 Workers",
        "Objective",
        "Combat",
        "Combat",
        "Combat",
        "Combat",
        "18 Popularity",
        "3 Encounters",
        "Factory Card",
        "16 Power",
        "8 Combat Cards",
        "16 Resources",
      ];

      // var desolation = [
      //   "7 Areas",
      //   "20 Coins",
      //   "9-Point Structure Bonus",
      //   "Objective",
      //   "5 Stars",
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
        this.track_items.push(options[option_num]);
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

.track-col,
.influence-col {
  border: 1px solid black;
  white-space: nowrap;
}
</style>
