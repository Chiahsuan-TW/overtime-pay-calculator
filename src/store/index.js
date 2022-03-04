import { createStore } from "vuex";

export default createStore({
  state: {
    // userInfo: {},
    data: [],
    userInfo: {
      name: "公司1",
      basic_info: {
        // workType: "",
        // workPattern: "",
        // wage: "",
        // firstDayOfWork: "",
      },
      tasking_time: {},
    },
  },
  mutations: {
    saveRecordingData(state, userInput) {
      state.data.push(userInput);
    },
    saveUserInfo(state, input) {
      state.userInfo.basic_info = input;
    },
  },
  actions: {},
  modules: {},
});
