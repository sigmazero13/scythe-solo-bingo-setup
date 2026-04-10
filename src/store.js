import Vue from "vue";
import Vuex from "vuex";

import {
  availableCells,
  bestCells,
  bestScore,
  scoreForCell,
  matchupWillEnd,
} from "./helpers/mapHelpers.js";
import MapData from "./models/MapData.js";
import { scoreDiff } from "./helpers/utilities.js";
import { Achievements, InfluenceBonuses } from "./constants.js";
import { DEFAULT_DATA } from "./models/GameData.js";

import { getField, updateField } from "vuex-map-fields";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    log: [],
    achieved: [],
    settings: { modular: true, hardest_diff: true },
    cur_game: { ...DEFAULT_DATA },
  },
  getters: {
    log: (state) => {
      return state.log;
    },
    settings: (state) => {
      return state.settings;
    },
    game_by_id: (state) => (game_id) => {
      for (var game of state.log) {
        if (game.game_id === game_id) {
          return game;
        }
      }

      return null;
    },
    game_by_matchup: (state) => (matchup) => {
      for (var game of state.log) {
        if (matchup === "FACTORY") {
          if (game.location === "factory") {
            return game;
          }
        } else {
          if (
            game.p_faction === matchup[0] &&
            game.a_faction === matchup[1] &&
            game.location !== "factory"
          ) {
            return game;
          }
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
    cell_scores: (state) => {
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

      return cell_scores;
    },
    influence_score: (state) => {
      return state.log.reduce((sum, game) => sum + game.tokens, 0);
    },
    best_player_score_for: (state, getters) => (factions) => {
      let cell = MapData.findByFactions(factions);
      if (cell === null) {
        return 0;
      }

      return (
        scoreForCell(getters.cell_scores, cell.q, cell.r).score +
        getters.achievement_score
      );
    },
    best_player_score: (state, getters) => {
      return (
        bestScore(getters.cell_scores) +
        getters.achievement_score +
        getters.influence_score
      );
    },
    best_player_cells: (state, getters) => {
      return bestCells(getters.cell_scores, getters.campaign_finished);
    },
    best_total_score: (state, getters) => {
      var best_score = bestScore(getters.cell_scores, true);
      return best_score >= 0
        ? best_score + getters.achievement_score + getters.influence_score
        : -1;
    },
    best_partial_bingo_score: (state, getters) => {
      return bestScore(getters.cell_scores, false);
    },
    bingo_score: (state, getters) => {
      return bestScore(getters.cell_scores, true);
    },
    campaign_finished: (state, getters) => {
      return getters.best_total_score >= 0;
    },
    matchup_will_end_campaign: (state, getters) => (factions) => {
      return matchupWillEnd(getters.cell_scores, factions);
    },
    max_game_id: (state) => {
      var max_id = Math.max(...state.log.map((g) => g.game_id));
      return max_id === -Infinity ? 0 : max_id;
    },
    current_influence_bonus: (state) => {
      if (state.log.length === 0) {
        return null;
      }

      var game = state.log[state.log.length - 1];
      if (game.tokens === 3) {
        return game.bonus;
      }

      return null;
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
        return 3;
      }

      var last_game = state.log.slice(-1)[0];
      var last_level = parseInt(last_game.a_level);
      var max_level = state.settings["hardest_diff"] ? 7 : 5;
      if (last_game.p_win) {
        return last_level >= max_level ? max_level : last_level + 1;
      } else {
        return last_level <= 1 ? 1 : last_level - 1;
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
      for (let key of ["a_score", "p_score", "a_level"]) {
        game_data[key] = parseInt(game_data[key]);
      }
      for (const [index, game] of state.log.entries()) {
        if (game.game_id === game_data.game_id) {
          // Update an existing game's data
          for (let key in game_data) {
            state.log[index][key] = game_data[key];
          }

          localStorage.setItem("log", JSON.stringify(state.log));
          this.commit("newGame");
          return;
        }
      }

      // If it gets here, it's a new game
      state.log.push(game_data);
      localStorage.setItem("log", JSON.stringify(state.log));
      this.commit("newGame");
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
    updateSetting(state, field) {
      updateField(state.settings, field);
      localStorage.setItem("settings", JSON.stringify(state.settings));
    },
    newGame(state) {
      state.cur_game = { ...DEFAULT_DATA };
      localStorage.setItem("cur_game", JSON.stringify(state.cur_game));
    },
    init(state) {
      state.log = JSON.parse(localStorage.getItem("log") || "[]");
      for (let game_data of state.log) {
        for (let key of ["a_score", "a_level", "p_score"]) {
          game_data[key] = parseInt(game_data[key]);
        }
      }
      state.achieved = JSON.parse(localStorage.getItem("achieved") || "[]");
      if (localStorage.getItem("cur_game")) {
        state.cur_game = JSON.parse(localStorage.getItem("cur_game"));
      } else {
        state.cur_game = { ...DEFAULT_DATA };
      }

      if (localStorage.getItem("settings")) {
        state.settings = JSON.parse(localStorage.getItem("settings"));
      } else {
        state.settings = { modular: true, hardest_diff: true };
      }
    },
  },
});
