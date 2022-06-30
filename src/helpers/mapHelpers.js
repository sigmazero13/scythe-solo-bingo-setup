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
