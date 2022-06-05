// import { Achievements } from "../constants";

export function validAchievements(log, achievements) {
  const EXP_FACTIONS = ["a", "f", "t", "v"];
  var achieved = [];

  var last_game = log.slice(-1)[0];
  var last_3_games = log.slice(-3);

  if (last_3_games.length === 3) {
    var wins = 0;
    var inf3 = 0;

    for (let game of last_3_games) {
      if (game.p_score > game.a_score) {
        wins += 1;
      }
      if (game.tokens === 3) {
        inf3 += 1;
      }
    }
    if (wins === 3) {
      achieved.push("3wins");
    }
    if (inf3 === 3) {
      achieved.push("3inf3");
    }
  }

  if (last_game.p_score > last_game.a_score) {
    if (last_game.a_level === 4) {
      achieved.push("automa+");
    }
    if (last_game.a_level === 5) {
      achieved.push("automszyna");
    }
    if (EXP_FACTIONS.includes(last_game.p_faction)) {
      achieved.push("asexp");
    }
    if (EXP_FACTIONS.includes(last_game.a_faction)) {
      achieved.push("vsexp");
    }
    if (last_game.location !== "normal") {
      achieved.push(last_game.location);
    }
    if (last_game.airship_active !== 0) {
      achieved.push("airships");
    }
    if (last_game.resolution !== 0) {
      achieved.push("resolution");
    }
    if (last_game.p_score - last_game.a_score > 25) {
      achieved.push("25+");
    }
    if (last_3_games.length < 2 || last_3_games[1].tokens < 3) {
      achieved.push("nobonus");
    }
    if (last_game.track !== "Standard") {
      achieved.push(last_game.track.toLowerCase());
    }
    if (!last_game.combats) {
      achieved.push("nocombat");
    }

    console.log("Already achieved:");
    console.log(achievements);
    console.log("Achievements BEFORE");
    console.log(achieved);
    var x = achieved.filter((x) => {
      console.log("CHECKING FOR FILTER " + x);
      console.log(!achievements.includes(x));
      return !achievements.includes(x);
    });
    console.log("Achievements AFTER:");
    console.log(x);

    return x;
  }
}
