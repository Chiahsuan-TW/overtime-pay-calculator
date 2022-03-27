import { createStore } from "vuex";
// import APIService from "@/services/Api";
import { Moment } from "moment";
import axios from "axios";
import api from "@/services/Api";
export default createStore({
  state: {
    mail: "ajay@gmail.com.tw",
    dataBaseData: [],
    data: [
      {
        userID: "wendy@gmail.com.tw",
        companyID: "company1",
        date: "2022-03-24",
        onDuty: "09:00",
        offDuty: "18:00",
        isDayOff: true,
        leaveType: "病假",
        workingHours: 0,
        overtimeHours: 0,
        overtimePay: 0,
      },
      {
        userID: "wendy@gmail.com.tw",
        companyID: "company2",
        date: "2022-04-24",
        onDuty: "09:00",
        offDuty: "18:00",
        isDayOff: true,
        leaveType: "病假",
        workingHours: 9,
        overtimeHours: 0,
        overtimePay: 0,
      },
      {
        userID: "wendy@gmail.com.tw",
        companyID: "company3",
        date: "2022-05-24",
        onDuty: "09:00",
        offDuty: "18:00",
        isDayOff: true,
        leaveType: "病假",
        workingHours: 9,
        overtimeHours: 0,
        overtimePay: 0,
      },
      {
        userID: "wendy@gmail.com.tw",
        companyID: "company1",
        date: "2022-3-25",
        onDuty: "09:00",
        offDuty: "21:00",
        isDayOff: false,
        leaveType: "",
        workingHours: 12,
        overtimeHours: 4,
        overtimePay: 800,
      },
      {
        userID: "wendy@gmail.com.tw",
        companyID: "company4",
        date: "2022-6-24",
        onDuty: "09:00",
        offDuty: "21:00",
        isDayOff: false,
        leaveType: "",
        workingHours: 12,
        overtimeHours: 4,
        overtimePay: 800,
      },
    ],
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
  },
  actions: {
    async getDataBase({ state, commit }) {
      const allUserData = await api.getDataBase();
      commit(
        "getData",
        allUserData.filter((data) => data.userID === state.mail)
      );
    },
    postDataBase({ state, commit }, editingCompanies) {
      // store in vuex and post data to google sheet
      // console.log(editingCompanies);
      // commit("updateUserInfoData", editingCompanies);
      // const formdata = new FormData();
      // const userData = state.allUserInfo[1];
      // for (const key in userData) {
      //   formdata.append(key, userData[key]);
      // }
      // const config = {
      //   method: "post",
      //   url: "https://script.google.com/macros/s/AKfycbzIEThR60wFbKhk6Re0ClPk1kfQX_MelHiJG-0ncHjUSzyggviznfd3zyHfJgJEojGlCQ/exec",
      //   data: formdata,
      // };
      // axios(config)
      //   .then(function (response) {
      //     console.log(JSON.stringify(response.data));
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
    },
  },
  modules: {
    //把data裝到這裡
  },
  getters: {
    currentUserInfoData(state) {
      const result = state.dataBaseData;
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
  },
});
