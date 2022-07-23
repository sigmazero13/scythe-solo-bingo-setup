import Vue from "vue";
import Vuex from "vuex";

import { availableCells, bestScore } from "./helpers/mapHelpers.js";
import { scoreDiff } from "./helpers/utilities.js";
import { Achievements, InfluenceBonuses } from "./constants.js";
import { DEFAULT_DATA } from "./models/GameData.js";

import { getField, updateField } from "vuex-map-fields";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    log: [],
    achieved: [],
    cur_game: { ...DEFAULT_DATA },
  },
  getters: {
    log: (state) => {
      return state.log;
    },
    game_by_id: (state) => (game_id) => {
      for (var game of state.log) {
        if (game.game_id === game_id) {
          return game;
        }
      }

      return null;
    },
    played: (state) => {
      var updatedPlayed = [];
      for (var game of state.log) {
        var game_data =
          game.location === "factory"
            ? "FACTORY"
            : game.p_faction + game.a_faction;
        updatedPlayed.push(game_data);
      }

      return updatedPlayed;
    },
    availableMatchups: (state, getters) => {
      return availableCells(getters.played).map((m) => m.data);
    },
    achieved: (state) => {
      return state.achieved;
    },
    automa_score: (state) => {
      return state.log.reduce((sum, game) => {
        var diff = game.a_score - game.p_score;

        return diff > 0 ? sum + diff : sum;
      }, 0);
    },
    achievement_score: (state) => {
      return Achievements.reduce((sum, achievement) => {
        var score = state.achieved.includes(achievement.key)
          ? achievement.points
          : 0;

        return sum + score;
      }, 0);
    },
    best_player_score: (state, getters) => {
      var cell_scores = {};

      for (var game of state.log) {
        var factions = game.p_faction + game.a_faction;
        if (game.location === "factory") {
          factions = "FACTORY";
        }

        if (game.p_win) {
          var score = scoreDiff(game);
          cell_scores[factions] = score;
        } else {
          cell_scores[factions] = -1;
        }
      }

      return bestScore(cell_scores) + getters.achievement_score;
    },
    max_game_id: (state) => {
      var max_id = Math.max(...state.log.map((g) => g.game_id));
      return max_id === -Infinity ? 0 : max_id;
    },
    next_influence_bonus: (state) => {
      var options = Array.from(Array(InfluenceBonuses.length).keys());
      for (let game of state.log.slice(-8)) {
        var idx = options.indexOf(game.bonus);
        if (idx !== -1) {
          options.splice(idx, 1);
        }
      }
      var newBonusIdx = Math.floor(Math.random() * options.length);
      return options[newBonusIdx];
    },
    next_automa_level: (state) => {
      if (state.log.length === 0) {
        return 2;
      }

      var last_game = state.log.slice(-1)[0];
      if (last_game.p_win) {
        return last_game.a_level >= 7 ? 7 : last_game.a_level + 1;
      } else {
        return last_game.a_level <= 1 ? 1 : last_game.a_level - 1;
      }
    },
    getGameField(state) {
      return getField(state.cur_game);
    },
    is_edit(state) {
      for (let game of state.log) {
        if (game.game_id === state.cur_game.game_id) {
          return true;
        }
      }

      return false;
    },
  },

  mutations: {
    resetCampaign(state) {
      state.log = [];
      state.achieved = [];

      localStorage.setItem("log", JSON.stringify(state.log));
      localStorage.setItem("achieved", JSON.stringify(state.achieved));
    },
    deleteGame(state, id_to_delete) {
      for (const [index, game] of state.log.entries()) {
        if (game.game_id === id_to_delete) {
          state.log.splice(index, 1);
          localStorage.setItem("log", JSON.stringify(state.log));
          return;
        }
      }
    },
    saveGame(state) {
      const game_data = state.cur_game;
      for (const [index, game] of state.log.entries()) {
        if (game.game_id === game_data.game_id) {
          // Update an existing game's data
          for (let key in game_data) {
            var value = game_data[key];
            if (key.includes("_score")) {
              value = parseInt(value);
            }
            state.log[index][key] = value;
          }

          localStorage.setItem("log", JSON.stringify(state.log));
          return;
        }
      }

      // If it gets here, it's a new game
      state.log.push(game_data);
      localStorage.setItem("log", JSON.stringify(state.log));
    },
    addAchievements(state, new_achievements) {
      for (let new_a of new_achievements) {
        if (!state.achieved.includes(new_a)) {
          state.achieved.push(new_a);
        }
      }

      localStorage.setItem("achieved", JSON.stringify(state.achieved));
    },
    updateAchievements(state, new_achievements) {
      state.achieved = new_achievements;

      localStorage.setItem("achieved", JSON.stringify(state.achieved));
    },
    updateGameField(state, field) {
      updateField(state.cur_game, field);
      localStorage.setItem("cur_game", JSON.stringify(state.cur_game));
    },
    newGame(state) {
      state.cur_game = { ...DEFAULT_DATA };
      localStorage.setItem("cur_game", JSON.stringify(state.cur_game));
    },
    init(state) {
      state.log = JSON.parse(localStorage.getItem("log") || "[]");
      state.achieved = JSON.parse(localStorage.getItem("achieved") || "[]");
      if (localStorage.getItem("cur_game")) {
        state.cur_game = JSON.parse(localStorage.getItem("cur_game"));
      } else {
        state.cur_game = { ...DEFAULT_DATA };
      }
    },
  },
});
