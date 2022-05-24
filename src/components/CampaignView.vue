<template>
  <div>
    <b-button class="cbutton" variant="primary" @click="newGame">
      NEW GAME
    </b-button>
    <b-button class="cbutton" variant="danger">
      RESET CAMPAIGN
    </b-button>
    <b-table
      striped
      hover
      :items="log"
      :fields="fields"
      sort-by="game_id"
      sort-desc
      show-empty
    >
      <template #empty>
        <h4>No games recorded...</h4>
      </template>
      
      <template #cell(show_details)="row">
        <b-button size="sm" @click="row.toggleDetails">
          ...
        </b-button>
      </template>

      <template #cell(player)="row">
        <FactionIcon :icon="row.item.p_faction" :scale="0.3" />
        {{ row.item.p_score }}
      </template>

      <template #cell(automa)="row">
        <FactionIcon :icon="row.item.a_faction" :scale="0.3" />
        {{ row.item.a_score }}
      </template>

      <template #row-details="row">
        <b-card>
          <b-row>
            <b-col>Track: {{ row.item.track }}</b-col>
            <b-col>Mat: {{ row.item.mat }}</b-col>
            <b-col>Automa: {{ row.item.a_level }}</b-col>
            <b-col>
              Airship: A-{{ row.item.airship_active }},
              P-{{ row.item.airship_passive }}
            </b-col>
            <b-col>Bonus: {{ row.item.bonus }}</b-col>
            <b-col>Influence: {{ row.item.tokens }}</b-col>
          </b-row>
        </b-card>
      </template>
    </b-table>
  </div>
</template>

<script>
import FactionIcon from "./FactionIcon.vue";

export default {
  name: "CampaignView",
  components: { FactionIcon },
  data() {
    return {
      fields: [
        { key: "game_id", label: "ID" },
        { key: "player", label: "Player" },
        { key: "automa", label: "Automa" },
        { key: "show_details", label: "" },
      ],
      log: [
        // { game_id: 1, p_faction: "f", p_score: 5, a_faction: "p", a_score: 10 },
        // { game_id: 2, p_faction: "s", p_score: 10, a_faction: "r", a_score: 2 },
      ],
    };
  },
  methods: {
    newGame() {
      var max_id = Math.max(...this.log.map((g) => g.game_id));
      if (max_id === -Infinity) max_id = 0;
      this.$emit("newgame", { game_id: max_id + 1 });
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
          p_faction: g["p_faction"],
          p_score: g["p_score"],
          a_faction: g["a_faction"],
          a_score: g["a_score"],
        };
      });
    },
  },
};
</script>

<style scoped>
.cbutton {
  margin-bottom: 1em;
  margin-left: 0.5em;
  margin-right: 0.5em;
}
</style>