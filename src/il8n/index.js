import Vue from "vue";
import VueI18n from "vue-i18n";
import en from "view-design/dist/locale/en-US";
import zh from "view-design/dist/locale/zh-CN";
import zhTW from "view-design/dist/locale/zh-TW";
Vue.use(VueI18n);
Vue.locale = () => {};
import zhCN from "./zh-CN";
import Cusomen from "./en";
import CusomZhTw from "./Tra";
let lang =
  localStorage.getItem("GameLang") ||
  navigator.language ||
  navigator.userLanguage ||
  "zh-TW";
const i18n = new VueI18n({
  locale: lang,
  messages: {
    "zh-CN": Object.assign(zh, zhCN),
    "zh-TW": Object.assign(zhTW, CusomZhTw),
    en: Object.assign(en, Cusomen)
  }
});
lang && localStorage.setItem("GameLang", lang);
export default i18n;
