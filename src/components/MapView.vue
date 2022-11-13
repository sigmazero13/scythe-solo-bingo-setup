<template>
  <div class="map-view">
    <div class="map-canvas" id="mapdiv" ref="mapdiv">
      <v-stage ref="stage" :config="configKonva">
        <v-layer ref="layer">
          <v-group
            v-for="hex in nonhome"
            :key="hex.id"
            @click="handleClick"
            @tap="handleClick"
          >
            <v-regular-polygon :config="hexConfig(hex)"></v-regular-polygon>
            <v-circle
              v-if="hex.f1 !== 'x'"
              :config="{
                id: hex.f1 + hex.f2 + '-' + hex.f1,
                x: hex.x - hex.r / 3,
                y: hex.y - hex.r / 4,
                radius: hex.r / 4,
                stroke: '#000000',
                fill: factionColor(hex.f1),
                playable: available_hex(hex),
              }"
            ></v-circle>
            <v-circle
              v-if="hex.f2 !== 'x'"
              :config="{
                id: hex.f1 + hex.f2 + '-' + hex.f2,
                x: hex.x + hex.r / 3,
                y: hex.y - hex.r / 4,
                radius: hex.r / 4,
                stroke: '#000000',
                fill: factionColor(hex.f2),
                playable: available_hex(hex),
              }"
            ></v-circle>
            <v-text
              v-if="hexPlayed(hex)"
              :config="{
                id: hex.f1 + hex.f2 + '-score',
                align: 'center',
                x: hex.x - hex.r / 4,
                y: hex.y + hex.r / 4,
                text: hexScore(hex),
                fontSize: hex.r / 2,
                fill: '#ffffff',
                fontStyle: 'bold',
              }"
            ></v-text>
          </v-group>
          <v-circle
            v-for="hex in home"
            :key="hex.id"
            @click="handleClick"
            :config="{
              x: hex.x,
              y: hex.y,
              radius: hex.r / 2,
              fill: hex.hexColor,
            }"
          >
          </v-circle>
        </v-layer>
      </v-stage>
    </div>
    <b-modal
      id="matchup-modal"
      ref="matchup-modal"
      :title="title"
      ok-title="Play"
      :ok-disabled="!playable"
      @ok="selectMatchup"
      :ok-variant="ok_button_variant"
      cancel-variant="danger"
    >
      <div class="choose-modal">
        <div v-if="cell_special !== ''">
          {{ cell_special }}
        </div>
        <div v-if="show_factions">
          <FactionIcon :icon="p_faction" /> vs
          <FactionIcon :icon="a_faction" />
        </div>
        <div v-if="p_score != null" class="score-row">
          <span class="p-score">
            <b-icon-trophy-fill variant="success" v-if="p_won" />
            {{ p_score }}
          </span>
          <span class="hyphen">-</span>
          <span class="a-score">
            {{ a_score }}
            <b-icon-x-circle-fill variant="danger" v-if="!p_won" />
          </span>
        </div>
        <div v-if="info_text" class="info-text">
          {{ info_text }}
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import FactionIcon from "../components/FactionIcon.vue";
import MapData from "../models/MapData.js";

import { availableCells } from "../helpers/mapHelpers.js";

import { mapGetters } from "vuex";

export default {
  name: "MapView",
  components: { FactionIcon },
  data() {
    return {
      list: [],
      configKonva: {
        offsetX: -2,
        offsetY: -2,
        width: this.divwidth,
        height: this.divwidth,
      },
      p_faction: "a",
      a_faction: "f",
      cell_special: "",
      title: "TITLE",
      info_text: "",
      playable: false,
      p_won: false,
      p_score: null,
      a_score: null,
    };
  },
  methods: {
    handleClick(e) {
      var factions = e.target.id().substr(0, 2);
      var hex_type = e.target.attrs["type"];

      if (hex_type === "f") {
        this.p_faction = "a";
        this.a_faction = "a";
        this.cell_special = "FACTORY";
        factions = "FACTORY";
      } else {
        this.p_faction = factions[0];
        this.a_faction = factions[1];
        this.cell_special = hex_type === "t" ? "TUNNEL" : "";
      }

      var game = this.game_by_matchup(factions);
      if (game != null) {
        this.p_score = game.p_score;
        this.a_score = game.a_score;
        this.p_won = game.p_win;
        this.title = "Game #" + game.game_id;
        if (hex_type === "f") {
          this.p_faction = game.p_faction;
          this.a_faction = game.a_faction;
        }
      } else {
        this.p_score = null;
        this.a_score = null;
        this.playable = e.target.attrs["playable"];
        this.title = this.playable ? "Available Matchup" : "Future Matchup";
        if (e.target.attrs["ender"]) {
          this.info_text = "Winning this matchup will end the campaign!";
        } else {
          this.info_text = "";
        }
      }

      this.$refs["matchup-modal"].show();
    },
    selectMatchup() {
      var matchup_info = {
        p_faction: this.p_faction,
        a_faction: this.a_faction,
        location: "normal",
      };

      if (this.cell_special === "FACTORY") {
        matchup_info["location"] = "factory";
        matchup_info["p_faction"] = "";
        matchup_info["a_faction"] = "";
      } else if (this.cell_special === "TUNNEL") {
        matchup_info["location"] = "tunnel";
      }
      this.$emit("selectFactions", matchup_info);
    },
    factionColor(f) {
      switch (f) {
        case "a":
          return "#007700";
        case "c":
          return "#ffff22";
        case "f":
          return "#ff9933";
        case "n":
          return "#0000aa";
        case "p":
          return "#ffffff";
        case "r":
          return "#bb0000";
        case "s":
          return "#000000";
        case "t":
          return "#aa00aa";
        case "v":
          return "#00dddd";
        default:
          return "444444";
      }
    },
    available_hex(hex) {
      for (var cell of availableCells(this.played)) {
        if (cell.data === hex.data) {
          return true;
        }
      }

      return false;
    },
    hexConfig(hex) {
      var config = {
        id: hex.f1 + hex.f2,
        type: hex.type,
        x: hex.x,
        y: hex.y,
        radius: hex.r,
        sides: 6,
        rotation: 30,
        fill: hex.hexColor,
        stroke: hex.borderColor,
        strokeWidth: hex.borderWidth,
        listening: true,
        playable: false,
        ender: false,
      };

      var game = this.game_by_matchup(hex.data);
      if (game) {
        config["fill"] = game.p_win ? "#00aa00" : "#aa0000";
      } else if (this.available_hex(hex)) {
        if (this.matchup_will_end_campaign(hex.data)) {
          config["fill"] = "#00aaee";
          config["ender"] = true;
        } else {
          config["fill"] = "#deb887";
        }
        config["playable"] = true;
      }

      return config;
    },
    hexPlayed(hex) {
      return this.game_by_matchup(hex.data) !== null;
    },
    hexScore(hex) {
      var game = this.game_by_matchup(hex.data);
      if (game) {
        return game.p_score - game.a_score;
      }

      return 0;
    },
  },
  computed: {
    ...mapGetters(["game_by_matchup", "matchup_will_end_campaign", "played"]),
    playableCells() {
      return this.splitCellsByColumn(availableCells(this.played));
    },
    home() {
      return this.list.filter((hex) => hex.type === "h");
    },
    nonhome() {
      return this.list.filter((hex) => hex.type !== "h");
    },
    divwidth() {
      // console.log(this.$refs.mapdiv.clientWidth)
      // return this.$refs.mapdiv.clientWidth;
      var width = window.innerWidth - 30;
      return Math.min(width, 720);
    },
    available_matchup() {
      var matchup = this.p_faction + this.a_faction;
      if (this.cell_special === "FACTORY") {
        matchup = "xx";
      }
      return this.available_hex({ data: matchup });
    },
    show_factions() {
      return this.p_faction != this.a_faction;
    },
    ok_button_variant() {
      return this.playable ? "primary" : "secondary";
    },
  },
  mounted() {
    this.configKonva["width"] = this.divwidth;
    this.configKonva["height"] = this.divwidth;

    var r = (this.divwidth - 20) / 16.6;
    this.list = MapData.map
      .map((cell) => {
        var type = "n";
        var f = cell.data === "FACTORY" ? "xx" : cell.data;
        var borderColor = "#000000";
        var borderWidth = r / 10;
        var hexColor = "#aaaaaa";
        if (cell.data === "FACTORY") {
          type = "f";
          borderColor = "#990099";
          borderWidth = r / 6;
          var game = this.game_by_matchup("FACTORY");
          if (game) {
            f = game.p_faction + game.a_faction;
          }
        } else if (cell.data === "HOME") {
          type = "h";
          hexColor = "#888888";
        } else if (cell.tunnel) {
          type = "t";
          borderColor = "#ff0000";
          borderWidth = r / 6;
        }
        return {
          id: cell.q + "-" + cell.r + "-" + cell.data,
          data: cell.data,
          x: r * ((3.0 / 2) * (cell.q + 5)) + r,
          y: r * ((Math.sqrt(3) / 2) * cell.q + Math.sqrt(3) * (cell.r + 5)),
          r: r,
          f1: f[0],
          f2: f[1],
          type: type,
          hexColor: hexColor,
          borderColor: borderColor,
          borderWidth: borderWidth,
          score: 0,
          played: false,
          won: false,
          z: type === "n" ? 0 : 1,
        };
      })
      .sort((a, b) => (a.z > b.z ? 1 : -1));
  },
};
</script>

<style scoped>
.map-view {
  padding-bottom: 30px;
}

div.map-canvas {
  /* width: 95%; */
  margin: auto;
  background-color: #dddddd;
}

div.choose-modal {
  text-align: center;
  font-size: 2em;
}

div.score-row {
  display: flex;
}

div.info-text {
  font-size: 0.7em;
  color: #dd5522;
}

span.p-score {
  text-align: right;
  width: 45%;
}

span.a-score {
  text-align: left;
  width: 45%;
}

span.hyphen {
  text-align: center;
  width: 10%;
}
</style>
