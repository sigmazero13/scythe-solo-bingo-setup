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

  if (played.length === 0) {
    for (var home of MapData.allHome()) {
      console.log("CHECKING HOME:");
      console.log(home);
      for (var i = 0; i < 6; i += 1) {
        var home_cell = [home.q, home.r];
        var new_cell = MapData.cell(...axialNeighbor(home_cell, i));
        if (new_cell !== null) {
          available.push(new_cell);
        }
      }
    }
  }

  return available;
}
