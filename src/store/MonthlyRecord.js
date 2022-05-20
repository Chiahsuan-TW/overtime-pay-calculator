import axios from "axios";
const MonthlyRecord = {
  namespaced: true,
  state: () => ({
    recordData: [],
    monthlySummary: [],
    workingHours: [],
    overtimeHours: [],
    overtimePay: [],
  }),
  mutations: {
    getMonthlyData(state, getData) {
      state.recordData = getData;
    },
    addRecordData(state, currentData) {
      const findIndex = state.recordData.findIndex((element) => {
        return element.date === currentData.date;
      });
      if (findIndex !== -1) {
        state.recordData[findIndex] = currentData;
        return;
      }
      state.recordData.push(currentData);
    },
    clearPreviousData(state) {
      state.recordData = [];
    },
    updatedＷorkingHours(state, workingHours) {
      state.workingHours = workingHours;
    },
    updatedOvertimeHours(state, overtimeHours) {
      state.overtimeHours = overtimeHours;
    },
    updateOvertimePay(state, overtimePay) {
      state.overtimePay = overtimePay;
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
    getLocalStorageMonthlyData({ commit }, localItemKey) {
      const localStorageData = localStorage.getItem(localItemKey);
      const stringLocalStorageData = JSON.parse(localStorageData);
      if (localStorageData) {
        console.log("action-getLocalStorageMonthlyData 有取到資料");
        commit("getMonthlyData", stringLocalStorageData);
        return;
      } else {
        commit("clearPreviousData");
      }
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
    saveLocalStorageMonthlyData({ state }, currentPageComapnyID) {
      localStorage.setItem(currentPageComapnyID, JSON.stringify(state.recordData));
    },
  },
  getters: {
    monthlyRecordData(state, getters, rootState, rootGetters) {
      //登入
      if (rootGetters.isLogIn) {
        return state.recordData;
      }
      return state.recordData;
    },
    currentCompanyID(state, getters, rootState) {
      return `company${rootState.currentIndex + 1}`;
    },
  },
};

export { MonthlyRecord };
