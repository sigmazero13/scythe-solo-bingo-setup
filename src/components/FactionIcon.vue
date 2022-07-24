<template>
  <div
    v-if="validIcon"
    :title="icon.name"
    class="faction-icon"
    :style="offsetStyle"
  />
  <div v-else class="faction-icon" />
</template>

<script>
import { Factions } from "../constants.js";

export default {
  name: "FactionIcon",
  props: {
    icon: {
      type: String,
      required: true,
    },
    scale: {
      type: Number,
      default: 1,
    },
  },
  data() {
    var iconList;
    var size;
    var pngName;
    size = 90;
    pngName = "factions-96x96";
    return {
      icons: iconList,
      size: size,
      png: pngName,
    };
  },
  computed: {
    validIcon: function () {
      return this.icon !== "";
    },
    offsetStyle: function () {
      var w = this.size * this.scale;
      var h = this.size * this.scale;
      var s = this.size * this.scale;
      var offset = Factions[this.icon].offset * this.size * this.scale;
      return {
        width: w + "px",
        height: h + "px",
        backgroundSize: "auto " + s + "px",
        backgroundPosition: "-" + offset + "px 0",
        display: "inline-block",
      };
    },
    iconType: function () {
      return this.type + "icon";
    },
  },
};
</script>

<style scoped>
div.faction-icon {
  background-image: url("~@/assets/factions-96x96.png");
}
</style>
