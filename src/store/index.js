import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    GameCompany: [],
    GameType: [],
    LineType: [],
    GameName: [],
    DisplayName: [],
    GameGroupName: [],
    IsDefaultLine: ""
  },
  mutations: {
    GameCompany(state, param) {
      state.GameCompany = param;
    },
    GameType(state, param) {
      state.GameType = param;
    },
    LineType(state, param) {
      state.LineType = param;
    },
    DisplayName(state, param) {
      state.DisplayName = param;
    },
    GameName(state, param) {
      state.GameName = param;
    },
    GameGroupName(state, param) {
      state.GameGroupName = param;
    },
    HaveDefault(state, param) {
      state.IsDefaultLine = param;
    }
  },
  actions: {
    Save_GameCompay_name({ commit }, param) {
      commit("GameCompany", param);
    },
    Save_Game_type({ commit }, param) {
      commit("GameType", param);
    },
    Save_Line_name({ commit }, param) {
      commit("LineType", param);
    },
    Save_Game_displayname({ commit }, param) {
      commit("DisplayName", param);
    },
    Save_Game_name({ commit }, param) {
      commit("GameName", param);
    },
    Save_GameGroup_name({ commit }, param) {
      commit("GameGroupName", param);
    },
    IsDefaultLine({ commit }, param) {
      commit("HaveDefault", param);
    }
  },
  modules: {}
});
