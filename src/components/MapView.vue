<template>
  <div class="map-view">
    <div>{{info}}</div>
    <div class="map-canvas" id="mapdiv" ref="mapdiv">
      <v-stage ref="stage" :config="configKonva">
        <v-layer ref="layer">
          <v-group v-for="hex in nonhome" :key="hex.id" @click="handleClick" @tap="handleClick">
            <v-regular-polygon
              :config="hexConfig(hex)"
            ></v-regular-polygon>
            <v-circle
              v-if="hex.type !== 'f'"
              :config="{
                id: hex.f1 + hex.f2 + '-' + hex.f1,
                x: hex.x - hex.r / 3,
                y: hex.y - hex.r / 4,
                radius: hex.r / 4,
                stroke: '#000000',
                fill: factionColor(hex.f1),
              }"
            ></v-circle>
            <v-circle
              v-if="hex.type !== 'f'"
              :config="{
                id: hex.f1 + hex.f2 + '-' + hex.f2,
                x: hex.x + hex.r / 3,
                y: hex.y - hex.r / 4,
                radius: hex.r / 4,
                stroke: '#000000',
                fill: factionColor(hex.f2),
              }"
            ></v-circle>
            <v-text
              v-if="hexPlayed(hex)"
              :config="{
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
  </div>
</template>

<script>
// import FactionIcon from "../components/FactionIcon.vue";
import MapData from "../models/MapData.js";

import { availableCells } from "../helpers/mapHelpers.js";

import { mapGetters } from "vuex";

export default {
  name: "MapView",
  // components: { FactionIcon },
  data() {
    return {
      list: [],
      configKonva: {
        offsetX: -2,
        offsetY: -2,
        width: this.divwidth,
        height: this.divwidth,
      },
      info: 'TEST',
    };
  },
  methods: {
    handleClick(e) {
      console.log(e.target);
      this.info = e.target.id();
    },
    selectMatchup(cell) {
      var matchup_info = { factions: "", location: "normal" };

      if (cell.data === "FACTORY") {
        matchup_info["location"] = "factory";
      } else {
        matchup_info["factions"] = cell.data;
        matchup_info["location"] = cell.tunnel ? "tunnel" : "normal";
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
    available(hex) {
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
        x: hex.x,
        y: hex.y,
        radius: hex.r,
        sides: 6,
        rotation: 30,
        fill: hex.hexColor,
        stroke: hex.borderColor,
        strokeWidth: hex.borderWidth,
        listening: true,
      };

      var game = this.game_by_matchup(hex.data);
      if (game) {
        config["fill"] = game.p_win ? "#007700" : "#770000";
      } else if (this.available(hex)) {
        config["fill"] = "#007799";
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
    }
  },
  computed: {
    ...mapGetters(["game_by_matchup", "played"]),
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
      return window.innerWidth - 30;
    },
  },
  mounted() {
    this.configKonva["width"] = this.divwidth;
    this.configKonva["height"] = this.divwidth;
    
    var r = (this.divwidth - 20) / 16.5;
    this.list = MapData.map
      .map((cell) => {
        var type = "n";
        var f = cell.data === "FACTORY" ? "xx" : cell.data;
        var borderColor = "#000000";
        var borderWidth = r / 10;
        var hexColor = "#deb887";
        // if (!played) {
        //   score = 0;
        //   won = false;
        // } else {
        //   var won = score % 2 === 0;
        //   if (!won) {
        //     score = -score;
        //     hexColor = "#aa0000";
        //   } else {
        //     hexColor = "#00dd00";
        //   }
        // }
        if (cell.data === "FACTORY") {
          type = "f";
          borderColor = "#990099";
          borderWidth = r / 6;
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
</style>
