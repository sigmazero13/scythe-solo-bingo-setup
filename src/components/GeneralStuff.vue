<template>
  <div>
    <h3>General:</h3>
    <p>
      <b>Player Board:</b> {{ player_board }}
      <span v-if="player_board_2 !== ''">
        ({{ faction }}: {{ player_board_2 }})
      </span>
      <br />
      <b>Structure Bonus:</b> {{ structure_bonus }}<br />
      <b>Fenris/Vesna Offset:</b> {{ fv_offset }}
    </p>
  </div>
</template>

<script>
export default {
  name: "GeneralStuff",
  data() {
    return {
      player_board: "Not yet selected...",
      player_board_2: "",
      structure_bonus: "Not yet selected...",
      fv_offset: "...",
    };
  },
  methods: {
    makeSelection() {
      var boards = this.pickBoard();
      this.player_board = boards[0];
      this.player_board_2 = boards[1];
      this.faction = boards[2];
      this.structure_bonus = this.pickBonus();
      this.fv_offset = Math.floor(Math.random() * 6);
    },

    pickBoard() {
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
      var board1 = boards[board1_num];
      var board2 = "";
      var faction = "";

      if (board1_num == 0) {
        faction = "Rusviet";
        board2_num += 1;
        board2 = boards[board2_num];
      } else if (board1_num == 3) {
        faction = "Crimea";
        if (board2_num >= 3) board2_num += 1;
        board2 = boards[board2_num];
      }
      return [board1, board2, faction];
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

<style scoped></style>
