import { createStore } from "vuex";
// import APIService from "@/services/Api";
import moment, { Moment } from "moment";
import axios from "axios";
import api from "@/services/Api";
export default createStore({
  state: {
    mail: "wendy@gmail.com.tw",
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
    // postDataBase({ state, commit }, editingCompanies) {
    //   const userData = state.dataBaseData[0];
    //   var myHeaders = new Headers();
    //   myHeaders.append("Cookie", "__Host-GAPS=1:eyUw4aI4SNl_B8ngss48IsVc3JjPoA:m0HB6tmTEkfyddFX");
    //   var formData = new FormData();
    //   for (const key in userData) {
    //     formData.append(key, userData[key]);
    //   }
    //   var requestOptions = {
    //     method: "POST",
    //     headers: myHeaders,
    //     body: formData,
    //     redirect: "follow",
    //   };

    //   fetch(
    //     "https://script.google.com/macros/s/AKfycbxydCYdA6d_pfeFFgzyR723yeVAlDT1BavyFSXdVjYVup-Nsb80ohRfvcG21Od1Pr1CQg/exec",
    //     requestOptions
    //   )
    //     .then((response) => response.text())
    //     .then((result) => console.log(result))
    //     .catch((error) => console.log("error", error));
    // },
    postDataBase(context, postData) {
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
      }).then(function (response) {
        console.log("收到", response.data);
      });
    },
  },
  modules: {
    //把data裝到這裡
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
  },
});
