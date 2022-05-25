<template>
  <div class="influence-icon" :style="offsetStyle" />
</template>

<script>
import { InfluenceBonuses } from "../constants.js";

export default {
  name: "InfluenceIcon",
  props: {
    icon_num: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      default: 50,
    },
  },
  data() {
    var iconList;
    var size;
    var pngName;
    size = 70;
    pngName = "influence_icons";
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
      var info = InfluenceBonuses[this.icon_num];
      var w = this.width;
      var scale = this.width / info.width;
      var h = Math.floor(info.height * scale);
      var s = this.size * scale;
      var offset = info.offset * scale;
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
div.influence-icon {
  background-image: url("~@/assets/influence_icons.png");
}
</style>
