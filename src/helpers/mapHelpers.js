import MapData from "../models/MapData.js";

var axial_direction_vectors = [
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
];

function axialDirection(direction) {
  return axial_direction_vectors[direction];
}

function axialAdd(hex, vec) {
  return [hex[0] + vec[0], hex[1] + vec[1]];
}

function axialNeighbor(hex, direction) {
  return axialAdd(hex, axialDirection(direction));
}

export function availableCells(played) {
  var available = [];
  var i;
  var new_cell;

  if (played.length === 0) {
    for (var home of MapData.allHome()) {
      var home_cell_qr = [home.q, home.r];
      for (i = 0; i < 6; i += 1) {
        new_cell = MapData.cell(...axialNeighbor(home_cell_qr, i));
        if (new_cell !== null) {
          available.push(new_cell);
        }
      }
    }
  } else {
    var tunnels = false;
    for (var matchup of played) {
      var matchup_cell = MapData.findByFactions(matchup);
      if (matchup_cell === null) continue;

      if (matchup_cell.tunnel) tunnels = true;

      var matchup_cell_qr = [matchup_cell.q, matchup_cell.r];
      for (i = 0; i < 6; i += 1) {
        new_cell = MapData.cell(...axialNeighbor(matchup_cell_qr, i));
        if (
          new_cell === null ||
          new_cell.data === "HOME" ||
          played.includes(new_cell.data)
        ) {
          continue;
        }
        if (!available.includes(new_cell)) {
          available.push(new_cell);
        }
      }

      if (tunnels) {
        for (new_cell of MapData.allTunnels()) {
          if (
            !played.includes(new_cell.data) &&
            !available.includes(new_cell)
          ) {
            available.push(new_cell);
          }
        }
      }
    }
  }

  return available.sort((a, b) => {
    if (a.q < b.q) return -1;
    if (a.q > b.q) return 1;
    if (a.r < b.r) return -1;
    return 1;
  });
}

function foldScore(cell_scores, q, r, dir) {
  var this_cell = MapData.cell(q, r);

  if (this_cell === null || this_cell.data === "HOME") {
    return { blocked: true };
  } else if (!(this_cell.data in cell_scores)) {
    return { score: 0, length: 0 };
  } else if (cell_scores[this_cell.data] < 0) {
    return { blocked: true };
  }

  var new_cell_qr = axialNeighbor([q, r], dir);
  var new_data = foldScore(cell_scores, new_cell_qr[0], new_cell_qr[1], dir);

  if (new_data["blocked"]) {
    return { blocked: true };
  }

  return {
    score: cell_scores[this_cell.data] + new_data["score"],
    length: new_data["length"] + 1,
  };
}

function scoreForCell(cell_scores, q, r) {
  var best_score = 0;
  for (var dir = 0; dir < 6; dir++) {
    var score_info = foldScore(cell_scores, q, r, dir);
    if (score_info["blocked"]) {
      continue;
    }
    if (score_info["score"] > best_score) {
      best_score = score_info["score"];
    }
  }

  return best_score;
}

export function bestScore(cell_scores) {
  var best_score = 0;

  for (var factions in cell_scores) {
    var cell = MapData.findByFactions(factions);
    var score = scoreForCell(cell_scores, cell.q, cell.r);
    if (score > best_score) {
      best_score = score;
    }
  }

  return best_score;
}
