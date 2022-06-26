import Vue from "vue";
import VueCompositionAPI, { createApp, h } from "@vue/composition-api";

import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import Vuetify from "vuetify";
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.use(VueCompositionAPI);

const app = createApp({
  router,
  vuetify,
  render: () => h(App),
});
app.use(Vuetify);
app.mount("#app");
