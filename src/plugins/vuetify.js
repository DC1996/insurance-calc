// import Vuetify from "vuetify/lib/framework";

import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import Vue from "vue";
import Vuetify, { colors } from "vuetify/lib";

import sk from "vuetify/lib/locale/sk";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      // https://coolors.co/palette/bcabae-e88d67-9999c3-7b8cde-0a2463
      light: {
        primary: "#7B8CDE",
        secondary: "#0A2463",
        accent: "#9999C3",
        warning: "#E88D67",
        info: "#BCABAE",
        muted: "#FAF9F9",
      },
    },
  },
  icons: {
    iconfont: "mdi",
  },
  lang: {
    locales: { sk },
    current: "sk",
  },
});
