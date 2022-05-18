<template>
  <div>
    <b-button @click="newGame">NEW GAME</b-button>
    <b-table striped hover :items="log" :fields="fields" />
  </div>
</template>

<script>
export default {
  name: "CampaignView",
  data() {
    return {
      fields: [
        { key: "game_id", label: "ID" },
        { key: "p_score", label: "Player" },
        { key: "a_score", label: "Automa" },
      ],
      log: [
        { game_id: 1, p_score: 5, a_score: 10 },
        { game_id: 2, p_score: 10, a_score: 2 },
      ],
    };
  },
  methods: {
    newGame() {
      this.$emit("newgame", { game_id: 1 });
    },
    saveGame(data) {
      this.log.push(data);
    },
  },
  computed: {
    log_items() {
      return this.log.map((g) => {
        return {
          game_id: g["game_id"],
          p_score: g["p_score"],
          a_score: g["a_score"],
        };
      });
    },
  },
};
</script>
