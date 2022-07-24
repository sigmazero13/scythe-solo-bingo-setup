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
    return 0;
  }

  var this_cell = MapData.cell(q, r);

  if (this_cell === null || this_cell.data === "HOME") {
    return -1;
  } else if (cell_scores[this_cell.data] < 0) {
    return -1;
  }

  var this_score =
    this_cell.data in cell_scores ? cell_scores[this_cell.data] : 0;

  var new_cell_qr = axialNeighbor([q, r], dir);
  var new_sum = foldScore(
    cell_scores,
    new_cell_qr[0],
    new_cell_qr[1],
    dir,
    length + 1
  );

  if (new_sum < 0) {
    return -1;
  }

  return this_score + new_sum;
}

export function scoreForCell(cell_scores, q, r) {
  var best_score = 0;
  for (var dir = 0; dir < 6; dir++) {
    var score = foldScore(cell_scores, q, r, dir, 0);
    if (score < 0) {
      continue;
    }
    if (score > best_score) {
      best_score = score;
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

function potentialBingo(cell_scores, q, r, dir, length) {
  if (length >= 5) {
    return true;
  }

  var this_cell = MapData.cell(q, r);

  if (this_cell === null || this_cell.data === "HOME") {
    return false;
  } else if (cell_scores[this_cell.data] < 0) {
    return false;
  } else if (!(this_cell.data in cell_scores) && length > 0) {
    return false;
  }

  var new_cell_qr = axialNeighbor([q, r], dir);
  return potentialBingo(
    cell_scores,
    new_cell_qr[0],
    new_cell_qr[1],
    dir,
    length + 1
  );
}

export function matchupWillEnd(cell_scores, factions) {
  let cell = MapData.findByFactions(factions);
  for (var dir = 0; dir < 6; dir++) {
    if (potentialBingo(cell_scores, cell.q, cell.r, dir, 0)) {
      return true;
    }
  }

  return false;
}
