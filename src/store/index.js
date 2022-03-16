import { createStore } from "vuex";
import APIService from "@/services/Api";
import { Moment } from "moment";

export default createStore({
  state: {
    userInfo: {
      name: "公司1",
      tasking_time: {},
    },
    allUserInfo: [
      {
        userID: "wendy@gmail.com.tw",
        companyID: "company1",
        companyName: "apple",
        identify: "TC100200300",
        workType: "看護",
        workPattern: "週休二日",
        wage: "50010",
        firstDayOfWork: Moment,
        lastDayOfWork: Moment,
      },
      {
        userID: "wendy@gmail.com.tw",
        companyID: "company2",
        companyName: "facebook",
        identify: "TC100200300",
        workType: "漁工",
        workPattern: "週休二日",
        wage: "100000",
        firstDayOfWork: Moment,
        lastDayOfWork: Moment,
      },
      {
        userID: "wendy@gmail.com.tw",
        companyID: "company3",
        companyName: "gogogro",
        identify: "TC100200300",
        workType: "廠工",
        workPattern: "非週休二日",
        wage: "100000",
        firstDayOfWork: Moment,
        lastDayOfWork: Moment,
      },
      {
        userID: "wendy@gmail.com.tw",
        companyID: "company4",
        companyName: "TSMC",
        identify: "TC100200300",
        workType: "看護",
        workPattern: "非週休二日",
        wage: "1000",
        firstDayOfWork: Moment,
        lastDayOfWork: Moment,
      },
    ],
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
    saveRecordingData(state, userInput) {
      state.data.push(userInput);
    },
    saveUserInfo(state, input) {
      state.allUserInfo = input;
    },
    updateCompanyName(state, data) {
      const { value, index } = data;
      console.log("confirm", value, index);
      console.log(value);
      console.log(state.allUserInfo[index]);
      state.allUserInfo[index].companyName = value;
    },
  },
  actions: {
    saveToDatabase(state, data) {
      console.log("dispath", state.basic_info, data);
      APIService.post(data);
    },
  },
  modules: {},
  getters: {
    collectionUserCompany(state) {
      return state.allUserInfo.map((userInfo) => userInfo.companyName);
    },
  },
});
