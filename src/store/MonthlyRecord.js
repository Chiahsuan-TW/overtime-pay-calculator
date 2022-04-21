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
    async getMonthlyData({ commit, rootState }, currentPageComapnyID) {
      let config = {
        method: "get",
        url: "https://script.google.com/macros/s/AKfycbzH77ym7e9JnY1RCUfqkgTY2vzzr5cE_kf7ifMgreW27XfQ07u4xBdoqM1agqpqa3Wk/exec",
        params: {
          companyID: currentPageComapnyID,
          userID: rootState.userID, //全域
        },
      };
      await axios(config)
        .then(function (response) {
          console.log("data", response.data);
          commit("getMonthlyData", response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    postMonthlyData({ getters, rootState }, currentDayInfo) {
      const data = JSON.stringify(currentDayInfo);
      axios({
        method: "post",
        url: "https://script.google.com/macros/s/AKfycbxRh3FTXmjl-PkZz9fmH5TOaCW5PtKGipEOiHgPRqKBWZTY05GfogF95MQAKsbw_kq0/exec",
        header: { "content-type": "text/plain;charset=utf-8" },
        data: data,
        params: {
          companyID: currentDayInfo.companyID,
          userID: rootState.userID,
        },
      })
        .then((response) => console.log("postMonthlyDataResponse:", response.data))
        .catch(() => console.log("error"));
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
