<template>
  <div>
    <h3>Wind Gambit Modules:</h3>
    <h4>Airships:</h4>
    <p v-if="ship_status == 0">No yet selected...</p>
    <p v-else-if="ship_status == 1">Not used</p>
    <p v-else>
      <b>Active:</b> {{ active }}<br />
      <b>Passive:</b> {{ passive }}
    </p>
    <h4>Resolution:</h4>
    <p>{{ resolution }}</p>
  </div>
</template>

<script>
export default {
  name: "WindGambit",
  data() {
    return {
      ship_status: 0,
      active: "Not yet selected...",
      passive: "Not yet selected...",
      resolution: "Not yet selected...",
    };
  },
  methods: {
    makeSelection() {
      var choice = Math.floor(Math.random() * 6);
      if (choice == 2 || choice >= 4) {
        this.ship_status = 2;
        this.active = this.pickActive();
        this.passive = this.pickPassive();
      } else {
        this.ship_status = 1;
        this.active = "Not used";
        this.passive = "Not used in this game";
      }

      if (choice == 3 || choice >= 4) {
        this.resolution = this.pickResolution();
      } else {
        this.resolution = "Not used";
      }
    },

    pickActive() {
      var actives = [
        "(1) Bombard",
        "(2) Bounty",
        "(3) Siege Engine",
        "(4) Distract",
        "(5) Espionage",
        "(6) Blitzkreig",
        "(8) War Correspondant",
      ];

      var active = Math.floor(Math.random() * 7);
      return actives[active];
    },

    pickPassive() {
      var passives = [
        "(9) Ferry",
        "(10) Boost",
        "(11) Drill",
        "(12) Hero",
        "(13) Safe Haven",
        "(14) Reap",
        "(15) Craft",
        "(16) Negotiate",
      ];

      var passive = Math.floor(Math.random() * 8);
      return passives[passive];
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
