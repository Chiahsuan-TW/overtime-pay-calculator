import { createStore } from "vuex";
// import APIService from "@/services/Api";
import moment, { Moment } from "moment";
import axios from "axios";
import api from "@/services/Api";
import { MonthlyRecord } from "@/store/MonthlyRecord.js";
export default createStore({
  state: {
    userID: "wendy@gmail.com.tw",
    dataBaseData: [],
    currentIndex: 0,
  },
  modules: {
    //有設定nameSpace
    recordingData: MonthlyRecord,
  },
  mutations: {
    updateCompanyName(state, data) {
      const { value, index } = data;
      state.dataBaseData[index].companyName = value;
    },
    getData(state, response) {
      state.dataBaseData = response;
    },
    updateUserInfoData(state, newValue) {
      state.dataBaseData = newValue;
      console.log("vuex更新過", state.dataBaseData);
    },
    updateCurrentIndex(state, newIndex) {
      console.log("有更新index:", newIndex);
      state.currentIndex = newIndex;
    },
  },
  actions: {
    async getDataBase({ state, commit }) {
      const allUserData = await api.getDataBase();
      commit(
        "getData",
        allUserData.filter((data) => data.userID === state.userID)
      );
    },
    postDataBase(context, postData) {
      //postUserInfoTosheet
      let { params, data } = { ...postData };
      console.log(params, data);
      axios({
        method: "post",
        url: "https://script.google.com/macros/s/AKfycbyxy0mg8Oaf12jtZzQVKHZjphjG2AOzOOVYOUfzQtrhMqJEVOnhqzLGV6dx0YR3JRU3fA/exec",
        headers: { "content-type": "text/plain;charset=utf-8" },
        data: data,
        params: {
          companyID: `company${params + 1}`,
        },
      });
      // .then(function (response) {
      //   console.log("收到", response.data);
      // });
    },
  },
  getters: {
    currentUserInfoData(state) {
      const result = state.dataBaseData;
      result.forEach((item) => {
        item.firstDayOfWork = item.firstDayOfWork ? moment(item.firstDayOfWork) : moment();
        item.lastDayOfWork = item.lastDayOfWork ? moment(item.lastDayOfWork) : moment();
      });
      return result;
    },

    collectionUserCompany(state, getters) {
      return getters.currentUserInfoData.map(function (data, index) {
        if (!data.companyName) {
          return `公司${index + 1}`;
        }
        return data.companyName;
      });
    },
    currentIndex(state) {
      return state.currentIndex;
    },
  },
});
