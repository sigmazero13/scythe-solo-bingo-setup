<template>
  <div>
    <b-container>
      <b-row>
        <b-col class="gen-header" cols="6"><b>Player Board:</b></b-col>
        <b-col class="gen-col" cols="6">{{ player_board }}</b-col>
      </b-row>
      <b-row>
        <b-col class="gen-header" cols="6"><b>Structure Bonus:</b></b-col>
        <b-col class="gen-col" cols="6">{{ structure_bonus }}</b-col>
      </b-row>
      <b-row>
        <b-col class="gen-header" cols="6"><b>Fenris/Vesna Offset:</b></b-col>
        <b-col class="gen-col" cols="6">{{ fv_offset }}</b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "GeneralStuff",
  data() {
    return {
      player_board: "Not yet selected...",
      structure_bonus: "Not yet selected...",
      fv_offset: "...",
    };
  },
  methods: {
    makeSelection(faction) {
      this.player_board = this.pickBoard(faction);
      this.structure_bonus = this.pickBonus();
      this.fv_offset = Math.floor(Math.random() * 6);
    },

    pickBoard(faction) {
      var boards = [
        "Industrial (1)",
        "Engineering (2)",
        "Militant (2a)",
        "Patriotic (3)",
        "Innovative (3a)",
        "Mechanical (4)",
        "Agricultural (5)",
      ];

      var board1_num = Math.floor(Math.random() * 7);
      var board2_num = Math.floor(Math.random() * 6);
      var board = boards[board1_num];

      if (board1_num === 0 && faction === "rusviet") {
        board2_num += 1;
        board = boards[board2_num];
      } else if (board1_num === 3 && faction === "crimea") {
        if (board2_num >= 3) board2_num += 1;
        board = boards[board2_num];
      }
      return board;
    },

    pickBonus() {
      var bonuses = [
        "Adjacent Tunnels",
        "Adjacent Lakes",
        "Adjacent Encounters",
        "On Tunnels",
        "Straight Line",
        "On Farms/Tundras",

        "Adj. to Base/Factory",
        "Adj. to Same Lake",
        "On Villages",
        "On Encounters",
        "Not Adj. to structures",
        "Diamond pattern",
        "On Mountains/Forests",
        "Adj. to Same Encounter",
      ];

      var bonus = Math.floor(Math.random() * 14);
      return bonuses[bonus];
    },
  },
};
</script>

<style scoped>
.gen-header {
  text-align: right;
  font-size: 0.9em;
}

.gen-col {
  text-align: left;
  font-size: 0.8em;
}
</style>
