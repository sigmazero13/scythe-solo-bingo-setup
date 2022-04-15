<template>
  <div
    v-if="validIcon"
    :title="icon.name"
    class="triumph-icon"
    :style="offsetStyle"
  />
  <div v-else class="triumph-icon" />
</template>

<script>
export default {
  name: "TriumphIcon",
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
    iconList = {
      Upg: { name: "Upgrades", offset: 0 },
      Cbt: { name: "Combat", offset: 1 },
      Mch: { name: "Mechs", offset: 2 },
      Str: { name: "Structures", offset: 3 },
      Pop: { name: "Popularity", offset: 4 },
      Rec: { name: "Recruits", offset: 5 },
      Pow: { name: "Power", offset: 6 },
      Wrk: { name: "Workers", offset: 7 },
      CCrd: { name: "Combat Cards", offset: 8 },
      Obj: { name: "Objectives", offset: 9 },
      Res: { name: "Resources", offset: 10 },
      Enc: { name: "Encounters", offset: 11 },
      Fact: { name: "Factory Card", offset: 12 },
    };
    size = 90;
    pngName = "triumph-90x90";
    return {
      icons: iconList,
      size: size,
      png: pngName,
    };
  },
  computed: {
    validIcon: function () {
      console.log(this.icon);
      console.log(this.icon !== "");
      return this.icon !== "";
    },
    offsetStyle: function () {
      var w = this.size * this.scale;
      var h = this.size * this.scale;
      var s = this.size * this.scale;
      var offset = this.icons[this.icon].offset * this.size * this.scale;
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
div.triumph-icon {
  background-image: url("~@/assets/triumph-90x90.png");
}
</style>
