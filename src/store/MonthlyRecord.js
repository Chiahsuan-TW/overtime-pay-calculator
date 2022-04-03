import axios from "axios";
const MonthlyRecord = {
  namespaced: true,
  state: () => ({
    recordData: [],
  }),
  mutations: {
    clickButton(state) {
      console.log(state.data);
    },
    getMonthlyData(state, getData) {
      state.recordData = getData;
    },
  },
  actions: {
    getMonthlyData({ getters, commit, rootState }) {
      console.log("userID", rootState.userID);
      console.log("comapnyID", getters.currentCompanyID);
      let config = {
        method: "get",
        url: "https://script.google.com/macros/s/AKfycbzH77ym7e9JnY1RCUfqkgTY2vzzr5cE_kf7ifMgreW27XfQ07u4xBdoqM1agqpqa3Wk/exec",
        params: {
          companyID: getters.currentCompanyID, //全域
          userID: rootState.userID, //全域
        },
      };
      axios(config)
        .then(function (response) {
          commit("getMonthlyData", response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  getters: {
    monthlyRecordData(state) {
      return state.recordData;
    },
    currentCompanyID(state, getters, rootState) {
      return `company${rootState.currentIndex + 1}`;
    },
  },
};

export { MonthlyRecord };
