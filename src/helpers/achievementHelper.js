// import { Achievements } from "../constants";

export function validAchievements(log, current_achievements) {
  const EXP_FACTIONS = ["a", "f", "t", "v"];
  var newly_achieved = [];

  var last_game = log.slice(-1)[0];
  var last_3_games = log.slice(-3);

  if (last_3_games.length === 3) {
    var wins = 0;
    for (let game of last_3_games) {
      if (game.p_score > game.a_score) {
        wins += 1;
      }
    }
    if (wins === 3) {
      newly_achieved.push("3wins");
    }
  }

  if (!current_achievements.includes("3inf3")) {
    var inf3 = 0;

    for (let game of log) {
      if (game.tokens === 3) {
        inf3 += 1;
      }
    }

    if (inf3 >= 3) {
      newly_achieved.push("3inf3");
    }
  }

  if (last_game.p_score > last_game.a_score) {
    var last_level = parseInt(last_game.a_level);
    if (last_level === 4) {
      newly_achieved.push("automa+");
    }
    if (last_level === 5) {
      newly_achieved.push("automaszyna");
    }
    if (EXP_FACTIONS.includes(last_game.p_faction)) {
      newly_achieved.push("asexp");
    }
    if (EXP_FACTIONS.includes(last_game.a_faction)) {
      newly_achieved.push("vsexp");
    }
    if (last_game.location !== "normal") {
      newly_achieved.push(last_game.location);
    }
    if (last_game.airship_active !== 0) {
      newly_achieved.push("airships");
    }
    if (last_game.resolution !== 0) {
      newly_achieved.push("resolution");
    }
    if (last_game.p_score - last_game.a_score > 25) {
      newly_achieved.push("25+");
    }
    if (last_3_games.length < 2 || last_3_games[1].tokens < 3) {
      newly_achieved.push("nobonus");
    }
    if (last_game.track !== "Standard") {
      newly_achieved.push(last_game.track.toLowerCase());
    }
    if (!last_game.combats) {
      newly_achieved.push("nocombat");
    }
  }

  return newly_achieved.filter((x) => {
    return !current_achievements.includes(x);
  });
}
