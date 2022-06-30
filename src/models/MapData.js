export default {
  map: Object.freeze([
    { q: -5, r: 2, data: "HOME" },
    { q: -5, r: 3, data: "rs" },
    { q: -4, r: -1, data: "cn" },
    { q: -4, r: 0, data: "sp" },
    { q: -4, r: 1, data: "pa" },
    { q: -4, r: 2, data: "tc" },
    { q: -4, r: 3, data: "pt" },
    { q: -4, r: 4, data: "vr" },
    { q: -3, r: -2, data: "HOME" },
    { q: -3, r: -1, data: "nr" },
    { q: -3, r: 0, data: "at", tunnel: true },
    { q: -3, r: 1, data: "nf" },
    { q: -3, r: 2, data: "cv" },
    { q: -3, r: 3, data: "rf", tunnel: true },
    { q: -3, r: 4, data: "fp" },
    { q: -2, r: -2, data: "vs" },
    { q: -2, r: -1, data: "fc" },
    { q: -2, r: 0, data: "vn" },
    { q: -2, r: 1, data: "sa" },
    { q: -2, r: 2, data: "ts" },
    { q: -2, r: 3, data: "sv" },
    { q: -2, r: 4, data: "HOME" },
    { q: -1, r: -3, data: "cf" },
    { q: -1, r: -2, data: "rp" },
    { q: -1, r: -1, data: "av" },
    { q: -1, r: 0, data: "pr" },
    { q: -1, r: 1, data: "rc" },
    { q: -1, r: 2, data: "vp" },
    { q: -1, r: 3, data: "tf" },
    { q: 0, r: -4, data: "ft" },
    { q: 0, r: -3, data: "ar", tunnel: true },
    { q: 0, r: -2, data: "pf" },
    { q: 0, r: -1, data: "sn" },
    { q: 0, r: 0, data: "FACTORY" },
    { q: 0, r: 1, data: "ns" },
    { q: 0, r: 2, data: "fr" },
    { q: 0, r: 3, data: "ca", tunnel: true },
    { q: 1, r: -5, data: "nv" },
    { q: 1, r: -4, data: "pn" },
    { q: 1, r: -3, data: "va" },
    { q: 1, r: -2, data: "nc" },
    { q: 1, r: -1, data: "af" },
    { q: 1, r: 0, data: "fa" },
    { q: 1, r: 1, data: "rv" },
    { q: 1, r: 2, data: "tn" },
    { q: 1, r: 3, data: "sr" },
    { q: 2, r: -5, data: "HOME" },
    { q: 2, r: -4, data: "np" },
    { q: 2, r: -3, data: "tv" },
    { q: 2, r: -2, data: "rt" },
    { q: 2, r: -1, data: "cr" },
    { q: 2, r: 0, data: "ac" },
    { q: 2, r: 1, data: "vt" },
    { q: 2, r: 2, data: "HOME" },
    { q: 3, r: -5, data: "vc" },
    { q: 3, r: -4, data: "st" },
    { q: 3, r: -3, data: "cs", tunnel: true },
    { q: 3, r: -2, data: "fn" },
    { q: 3, r: -1, data: "ta" },
    { q: 3, r: 0, data: "pc", tunnel: true },
    { q: 3, r: 1, data: "tp" },
    { q: 4, r: -5, data: "fs" },
    { q: 4, r: -4, data: "ra" },
    { q: 4, r: -3, data: "sf" },
    { q: 4, r: -2, data: "cp" },
    { q: 4, r: -1, data: "nt" },
    { q: 4, r: 0, data: "an" },
    { q: 5, r: -4, data: "pv" },
    { q: 5, r: -3, data: "HOME" },
    { q: 5, r: -2, data: "as" },
  ]),

  cell(q, r) {
    for (var c of this.map) {
      if (c.q === q && c.r === r) {
        return c;
      }
    }

    return null;
  },

  allHome() {
    return this.map.filter((c) => {
      return c.data === "HOME";
    });
  },

  allTunnels() {
    return this.map.filter((c) => {
      return c.tunnel;
    });
  },

  findByFactions(factions) {
    if (factions === "FACTORY") {
      return this.cell(0, 0);
    }

    for (var c of this.map) {
      if (c.data === factions) {
        return c;
      }
    }

    return null;
  },
};
