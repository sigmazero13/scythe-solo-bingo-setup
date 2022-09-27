import Vue from "vue";
import VueKonva from "vue-konva";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import store from "./store.js";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueKonva);

import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  store: store,
  beforeCreate() {
    this.$store.commit("init");
  },
}).$mount("#app");
