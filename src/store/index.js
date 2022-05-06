import { createStore } from "vuex";
// import APIService from "@/services/Api";
import moment, { Moment } from "moment";
import axios from "axios";
import api from "@/services/Api";
import { MonthlyRecord } from "@/store/MonthlyRecord.js";
export default createStore({
  state: {
    islogIn: false,
    userID: "wendy@gmail.com.tw",
    dataBaseData: [
      {
        companyID: "company1",
        companyName: "",
        firstDayOfWork: "",
        lastDayOfWork: "",
        identify: "",
        userID: "wendy@gmail.com.tw",
        wage: "",
        workPattern: "非輪班",
        workType: "",
      },
      {
        companyID: "company2",
        companyName: "",
        firstDayOfWork: "",
        lastDayOfWork: "",
        identify: "",
        userID: "wendy@gmail.com.tw",
        wage: "",
        workPattern: "非輪班",
        workType: "",
      },
      {
        companyID: "company3",
        companyName: "",
        firstDayOfWork: "",
        lastDayOfWork: "",
        identify: "",
        userID: "wendy@gmail.com.tw",
        wage: "",
        workPattern: "非輪班",
        workType: "",
      },
      {
        companyID: "company4",
        companyName: "",
        firstDayOfWork: "",
        lastDayOfWork: "",
        identify: "",
        userID: "wendy@gmail.com.tw",
        wage: "",
        workPattern: "非輪班",
        workType: "",
      },
    ],
    currentIndex: 0,
  },
  modules: {
    recordingData: MonthlyRecord,
  },
  mutations: {
    getData(state, response) {
      state.dataBaseData = response;
    },
    updateCompanyName(state, data) {
      const { value, index } = data;
      state.dataBaseData[index].companyName = value;
    },
    updateUserInfoData(state, newValue) {
      state.dataBaseData = newValue;
    },
    updateCurrentIndex(state, newIndex) {
      state.currentIndex = newIndex;
    },
    // updataLoginStatus(state) {
    //   state.islogIn = !state.islogIn;
    //   // this.$router.push({ path: "/Info" });
    // }, a83a9e04 0265bcd
  },
  actions: {
    getLocalStorage({ state, commit }, getLocalItem) {
      console.log("localStorage get data ", getLocalItem);
      const localStorageData = localStorage.getItem(getLocalItem);
      if (localStorageData) {
        // console.log("action-localStorageData 有取得資料", localStorageData);
        commit("getData", JSON.parse(localStorageData));
        return;
      }
      console.log('action-localStorageData 沒有取得資料"');
    },
    async getDataBase({ state, commit }) {
      const allUserData = await api.getDataBase();
      if (allUserData) {
        commit(
          "getData",
          allUserData.filter((data) => data.userID === state.userID)
        );
        return;
      }
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
    // async logInFacebook({ state, commit, dispatch }) {
    //   await dispatch("initFacebook");
    //   await window.FB.login(
    //     async (response) => {
    //       if (response.authResponse) {
    //         const res = await window.FB.api("/me", "GET", { fields: "email" }, (response) => {
    //           console.log("vuex 86 res", response, "email", response.email);
    //           state.userID = response.email;
    //           console.log("vuex 88", response.email);
    //           // commit("updataLoginStatus"); //89
    //         });
    //         console.log("vuex 91", res);
    //       } else {
    //         alert("Facebook帳號無法登入");
    //       }
    //     },
    //     { scope: "public_profile,email" }
    //   );
    //   commit("updataLoginStatus");
    // },
    // async initFacebook() {
    //   if (window.FB === undefined) {
    //     console.log("window.FB === undefined");
    //     window.fbAsyncInit = function () {
    //       initialize();
    //     };
    //   } else {
    //     console.log("window.FB !== undefined");
    //     initialize();
    //   }
    //   function initialize() {
    //     window.FB.init({
    //       appId: "1815043565359281",
    //       xfbml: true,
    //       cookie: true,
    //       version: "v13.0",
    //     });
    //   }
    // },
  },
  getters: {
    isLogIn(state) {
      if (state.userID === "wendy@gmail.com.tw") {
        return false;
      } else {
        return true;
      }
    },
    currentUserInfoData(state) {
      const result = state.dataBaseData;
      return result.map((item) => {
        item.firstDayOfWork = item.firstDayOfWork ? moment(item.firstDayOfWork) : moment();
        item.lastDayOfWork = item.lastDayOfWork ? moment(item.lastDayOfWork) : moment();
        return item;
      });
    },
    currentIndex(state) {
      return state.currentIndex;
    },
    collectionUserCompany(state, getters) {
      return getters.currentUserInfoData.map(function (data, index) {
        if (!data.companyName) {
          return `公司${index + 1}`;
        }
        return data.companyName;
      });
    },
  },
});
