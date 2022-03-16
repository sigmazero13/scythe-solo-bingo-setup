<template>
  <div>
    <h3>Wind Gambit Modules:</h3>
    <p><b>Airships: </b>{{ airship }}</p>
    <p><b>Resolution: </b>{{ resolution }}</p>
  </div>
</template>

<script>
export default {
  name: "WindGambit",
  data() {
    return {
      airship: "Not yet selected...",
      resolution: "Not yet selected...",
    };
  },
  methods: {
    makeSelection() {
      var choice = Math.floor(Math.random() * 6);
      if (choice == 2 || choice >= 4) {
        this.airship = this.pickAirship();
      } else {
        this.airship = "Not used";
      }

      if (choice == 3 || choice >= 4) {
        this.resolution = this.pickResolution();
      } else {
        this.resolution = "Not used";
      }
    },

    pickAirship() {
      var airships = [
        "(1) Bombard",
        "(2) Bounty",
        "(3) Siege Engine",
        "(4) Distract",
        "(5) Espionage",
        "(6) Blitzkreig",
        "(8) War Correspondant",
      ];

      var ship = Math.floor(Math.random() * 7);
      return airships[ship];
    },

    pickResolution() {
      var resolutions = [
        "(1) Land Rush",
        "(2) Factory Explosion",
        "(3) Spoils of War",
        "(4) King of the Hill",
        "(5) Deja Vu",
        "(6) Mission Possible",
        "(7) Doomsday Clock",
        "(8) Backup Plan",
      ];

      var res = Math.floor(Math.random() * 8);
      return resolutions[res];
    },
  },
};
</script>

<style scoped></style>
