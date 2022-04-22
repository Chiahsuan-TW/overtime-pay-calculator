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
    recordingData: MonthlyRecord,
  },
  mutations: {
    logInFacebook() {},
    updateCompanyName(state, data) {
      const { value, index } = data;
      state.dataBaseData[index].companyName = value;
    },
    getData(state, response) {
      state.dataBaseData = response;
    },
    updateUserInfoData(state, newValue) {
      state.dataBaseData = newValue;
    },
    updateCurrentIndex(state, newIndex) {
      state.currentIndex = newIndex;
    },
    async initFacebook() {
      if (window.FB === undefined) {
        console.log("window.FB === undefined");
        window.fbAsyncInit = function () {
          initialize();
        };
      } else {
        console.log("window.FB !== undefined");
        initialize();
      }
      function initialize() {
        window.FB.init({
          appId: "1815043565359281",
          xfbml: true,
          cookie: true,
          version: "v13.0",
        });
        console.log(window.FB);
      }
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
    async postDataBase(context, postData) {
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
    },
    async logInFacebook({ state, commit }) {
      await commit("initFacebook");
      window.FB.login(
        (response) => {
          if (response.authResponse) {
            this.islogin = true;
            window.FB.api("/me", "GET", { fields: "email" }, (response) => {
              console.log("res", response, "email", response.email);
              state.userID = response.email;
            });
          } else {
            alert("Facebook帳號無法登入");
          }
        },
        { scope: "public_profile,email" }
      );
    },
  },
  getters: {
    userID(state) {
      return state.userID;
    },
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
