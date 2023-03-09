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

function foldScore(cell_scores, q, r, dir, length) {
  // Don't check past 5 spots
  if (length >= 5) {
    return { score: 0, played: 0 };
  }

  var this_cell = MapData.cell(q, r);

  if (this_cell === null || this_cell.data === "HOME") {
    return { blocked: true };
  } else if (cell_scores[this_cell.data] < 0) {
    return { blocked: true };
  }

  var this_score = 0;
  var played = 0;

  if (this_cell.data in cell_scores) {
    this_score = cell_scores[this_cell.data];
    played = 1;
  }

  var new_cell_qr = axialNeighbor([q, r], dir);
  var new_score = foldScore(
    cell_scores,
    new_cell_qr[0],
    new_cell_qr[1],
    dir,
    length + 1
  );

  if (new_score.blocked) {
    return { blocked: true };
  }

  return {
    score: this_score + new_score.score,
    played: played + new_score.played,
  };
}

export function scoreForCell(cell_scores, q, r, only_bingo) {
  var best_score = -1;
  var best_dir = -1;
  for (var dir = 0; dir < 6; dir++) {
    var new_score = foldScore(cell_scores, q, r, dir, 0);
    if (new_score.blocked || (new_score.played < 5 && only_bingo)) {
      continue;
    }
    if (new_score.score > best_score) {
      best_score = new_score.score;
      best_dir = dir;
    }
  }

  return { score: best_score, dir: best_dir };
}

function bestScoreCellDir(cell_scores, only_bingo) {
  var best_score = -1;
  var best_cell = null;
  var best_dir = -1;

  for (var factions in cell_scores) {
    var cell = MapData.findByFactions(factions);
    var score_data = scoreForCell(cell_scores, cell.q, cell.r, only_bingo);
    if (score_data.score > best_score) {
      best_score = score_data.score;
      best_cell = cell;
      best_dir = score_data.dir;
    }
  }

  return { score: best_score, cell: best_cell, dir: best_dir };
}

export function bestCells(cell_scores, only_bingo) {
  var best_data = bestScoreCellDir(cell_scores, only_bingo);
  var cells = [];

  var cell = best_data.cell;
  while (cell != null && cells.length < 5) {
    console.log(cell);
    console.log(best_data.dir);
    if (!(cell.data in cell_scores) || cell_scores[cell.data] < 0) {
      break;
    }
    cells.push([cell.q, cell.r]);
    var new_cell_qr = axialNeighbor([cell.q, cell.r], best_data.dir);
    cell = MapData.cell(new_cell_qr[0], new_cell_qr[1]);
  }

  return cells;
}

export function bestScore(cell_scores, only_bingo) {
  return bestScoreCellDir(cell_scores, only_bingo).score;
}

function winLength(cell_scores, q, r, dir, length) {
  if (length >= 5) {
    return length;
  }

  var this_cell = MapData.cell(q, r);

  if (this_cell === null || this_cell.data === "HOME") {
    return length - 1;
  } else if (cell_scores[this_cell.data] < 0) {
    return length - 1;
  } else if (!(this_cell.data in cell_scores) && length > 0) {
    return length - 1;
  }

  var new_cell_qr = axialNeighbor([q, r], dir);
  return winLength(
    cell_scores,
    new_cell_qr[0],
    new_cell_qr[1],
    dir,
    length + 1
  );
}

export function matchupWillEnd(cell_scores, factions) {
  let cell = MapData.findByFactions(factions);
  for (var dir = 0; dir < 3; dir++) {
    var dir_a = winLength(cell_scores, cell.q, cell.r, dir, 0);
    var dir_b = winLength(cell_scores, cell.q, cell.r, dir + 3, 0);
    if (dir_a + dir_b >= 4) {
      return true;
    }
  }

  return false;
}
