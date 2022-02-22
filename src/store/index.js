import { createStore } from "vuex";

export default createStore({
  state: {
    data: {},
  },
  mutations: {
    saveRecordingData(state, date) {
      state.data = date;
    },
  },
  actions: {},
  modules: {},
});
