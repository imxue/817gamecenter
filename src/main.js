import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./utils/test";
import i18n from "./il8n/index";

Vue.use(ElementUI);

Vue.config.productionTip = false;

Vue.use(ViewUI, {
  i18n: (key, value) => i18n.t(key, value),
  // size: "small",
  capture: false
});

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
