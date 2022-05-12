<template>
  <h3>工時及休假紀錄</h3>
  <div class="modal">
    <!-- <p>是會員嗎{{ isLogIn }}</p>
    <pre>目前工作類型:{{ currentWorkPattern }}</pre>
    <pre>目前哪一個companyID:{{ currentCompanyID }}</pre>
    <pre>當月{{ currentMonthRecordingData }}</pre> -->
    <!-- <pre>薪水{{ currentWage }}</pre> -->
    <Stepper :currentStep="currentStep" />
    <div class="modal-content">
      <div class="calendar-month" v-if="isRouterAlive" ref="calendar-month">
        {{ selectedDate }}
        <div class="calendar-month-header">
          <CalendarDateIndicator :selected-date="selectedDate" @dateSelected="selectDate" />
        </div>
        <table>
          <CalendarWeekdays />
          <tr class="days-grid">
            <CalendarMonthDayItem
              v-for="day in days"
              :key="day.date"
              :day="day"
              :is-current-month="day.isCurrentMonth"
              :is-today="day.date === today"
              :monthlyRecordData="monthlyRecordData"
            >
            </CalendarMonthDayItem>
          </tr>
        </table>
      </div>
      <MonthlyInfo :workingHours="workingHours" :overtimeHours="overtimeHours" :overtimePay="overtimePay"></MonthlyInfo>
      <div class="button-group">
        <router-link :to="{ name: 'Info' }">
          <ProcedureButton class="previous">上一步</ProcedureButton>
        </router-link>
        <router-link :to="{ name: 'AnnualRecord' }">
          <ProcedureButton class="result">歷月應得加班費</ProcedureButton>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import CalendarDateIndicator from "../components/CalendarDateIndicator.vue";
import CalendarWeekdays from "../components/CalendarWeekdays.vue";
import CalendarMonthDayItem from "../components/CalendarMonthDayItem.vue";
import Stepper from "../components/Stepper.vue";
import ProcedureButton from "../components/ProcedureButton.vue";
import MonthlyInfo from "@/components/MonthlyInfo.vue";
import moment from "moment";

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

export default {
  name: "Home",
  components: {
    CalendarDateIndicator,
    CalendarWeekdays,
    CalendarMonthDayItem,
    Stepper,
    ProcedureButton,
    MonthlyInfo,
  },
  created() {
    // 確認是否會員;
    if (this.isLogIn) {
      //是會員
      this.$store.dispatch("recordingData/getMonthlyData", this.currentCompanyID);
      return;
    }
    this.$store.dispatch("recordingData/getLocalStorageMonthlyData", this.currentCompanyID);
  },
  mounted() {},
  data() {
    return {
      selectedDate: dayjs(),
      currentStep: 2,
      isRouterAlive: true,
      // workingHours: 100,
    };
  },
  props: ["userInput"],
  methods: {
    selectDate(newSelectedDate) {
      this.selectedDate = newSelectedDate;
    },
    getWeekday(date) {
      return dayjs(date).weekday();
    },
    caculateOverTimePay(data, regularHours, extraHours) {
      return data.reduce((previousValue, currentData) => {
        const momentStartDuty = moment(currentData.date + " " + currentData.onDuty);
        const momentOffDuty = moment(currentData.date + " " + currentData.offDuty);
        const hour = momentOffDuty.diff(momentStartDuty, "hour");
        const hourlyWage = 100;
        if (hour > extraHours) {
          let pay = (hour - extraHours) * 1.67 * hourlyWage + (extraHours - regularHours) * 1.34 * hourlyWage;
          return (previousValue += pay);
        }
        if (hour > regularHours) {
          let pay = (hour - regularHours) * 1.34 * hourlyWage;
          return (previousValue += pay);
        }
        return previousValue;
      }, 0);
    },
  },
  computed: {
    isLogIn() {
      return this.$store.getters.isLogIn;
    },
    userID() {
      return this.$store.getters.userID;
    },
    days() {
      return [...this.previousMonthDays, ...this.currentMonthDays, ...this.nextMonthDays];
    },
    today() {
      return dayjs().format("YYYY-MM-DD");
    },
    month() {
      return Number(this.selectedDate.format("M"));
    },
    year() {
      return Number(this.selectedDate.format("YYYY"));
    },
    numberOfDaysInMonth() {
      return dayjs(this.selectedDate).daysInMonth();
    },
    currentMonthDays() {
      return [...Array(this.numberOfDaysInMonth)].map((day, index) => {
        return {
          date: dayjs(`${this.year}-${this.month}-${index + 1}`).format("YYYY-MM-DD"),
          isCurrentMonth: true,
          weekday: this.getWeekday(dayjs(`${this.year}-${this.month}-${index + 1}`).format("YYYY-MM-DD")),
        };
      });
    },
    previousMonthDays() {
      const firstDayOfTheMonth = this.getWeekday(this.currentMonthDays[0].date);
      const previousMonth = dayjs(`${this.year}-${this.month}-01`).subtract(1, "month");
      const numberOfDaysInPreviousMonth = firstDayOfTheMonth ? firstDayOfTheMonth - 1 : 6;
      const lastMondayDayOfMonth = dayjs(this.currentMonthDays[0].date)
        .subtract(numberOfDaysInPreviousMonth, "day")
        .date();
      return [...Array(numberOfDaysInPreviousMonth)].map((day, index) => {
        return {
          date: dayjs(`${previousMonth.year()}-${previousMonth.month() + 1}-${lastMondayDayOfMonth + index}`).format(
            "YYYY-MM-DD"
          ),
          isCurrentMonth: false,
        };
      });
    },
    nextMonthDays() {
      const lastDayOfTheMonthWeekday = this.getWeekday(`${this.year}-${this.month}-${this.currentMonthDays.length}`);
      const nextMonth = dayjs(`${this.year}-${this.month}-01`).add(1, "month");
      const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
        ? 7 - lastDayOfTheMonthWeekday
        : lastDayOfTheMonthWeekday;

      return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
        return {
          date: dayjs(`${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`).format("YYYY-MM-DD"),
          isCurrentMonth: false,
        };
      });
    },
    currentCompanyID() {
      return this.$store.getters["recordingData/currentCompanyID"];
    },
    monthlyRecordData() {
      return this.$store.getters["recordingData/monthlyRecordData"];
    },
    currentMonthRecordingData() {
      const selectedMonth = moment([this.year, this.month]);
      return this.monthlyRecordData.filter((item) => {
        let dateOfYearMonth = item.date.split("-");
        dateOfYearMonth.pop();
        return selectedMonth.diff(moment(dateOfYearMonth), "month") === 0;
      });
    },
    currentWorkPattern() {
      const index = this.$store.getters.currentUserInfoData.findIndex((inforData) => {
        return inforData.companyID === this.currentCompanyID;
      });
      return this.$store.getters.currentUserInfoData[index].workPattern;
    },
    currentWage() {
      const index = this.$store.getters.currentUserInfoData.findIndex((inforData) => {
        return inforData.companyID === this.currentCompanyID;
      });
      // const monthlyMinimumWage = 25250;
      // this.$store.getters.currentUserInfoData[index].wage

      return index;
    },
    workingHours() {
      return this.currentMonthRecordingData.reduce((total, currentValue) => {
        const momentStartDuty = moment(currentValue.date + " " + currentValue.onDuty);
        const momentOffDuty = moment(currentValue.date + " " + currentValue.offDuty);
        const hour = momentOffDuty.diff(momentStartDuty, "hour");
        return (total += hour);
      }, 0);
    },
    overtimeHours() {
      const workPattern = new Map([
        ["輪班", "shiftWork"],
        ["非輪班", "nonShiftWork"],
      ]);
      const maximumTime = {
        shiftWork: 10,
        nonShiftWork: 8,
      };
      let totalHours = 0;
      return this.currentMonthRecordingData.reduce((totalHours, currentData) => {
        const momentStartDuty = moment(currentData.date + " " + currentData.onDuty);
        const momentOffDuty = moment(currentData.date + " " + currentData.offDuty);
        const hour = momentOffDuty.diff(momentStartDuty, "hour");
        let overTimeOfHour = hour - maximumTime[workPattern.get(this.currentWorkPattern)];
        if (overTimeOfHour < 0) {
          overTimeOfHour = 0;
        }
        return (totalHours += overTimeOfHour);
      }, totalHours);
    },
    overtimePay() {
      //整個陣列丟進去
      //會判斷資料要套用哪一個規則
      //輪班 >10hr 10~12hr:1.34 、>12hr 1.67
      //非輪班 >8hr 8~10hr 1.34 10>hr 1.67
      //非輪班17hr，加班費是1437，輪班17hr，加班費是
      const workPattern = new Map([
        ["輪班", "shiftWork"],
        ["非輪班", "nonShiftWork"],
      ]);
      const currentWorkType = workPattern.get(this.currentWorkPattern);
      const overtimeRules = {
        shiftWork: {
          regularHours: 10,
          extraHours: 12,
        },
        nonShiftWork: {
          regularHours: 8,
          extraHours: 10,
        },
      };

      const regularHours = overtimeRules[currentWorkType].regularHours;
      const extraHours = overtimeRules[currentWorkType].extraHours;
      return this.caculateOverTimePay(this.currentMonthRecordingData, regularHours, extraHours);
    },
  },
};
</script>

<style lang="scss" scoped>
h3 {
  @extend %page-title;
  width: fit-content;
  margin: 0 auto;
}
.modal {
  background-color: #fff;
  margin: 40px 0 0;
  padding: 40px 0 0;

  @include breakpoint.tablet {
    width: 80%;
    max-width: 1094px;
    max-height: 600px;
    overflow-x: auto;
    overflow-y: scroll;
    margin: 40px auto 0;
    box-shadow: 3px 6px 14px rgba(255, 153, 0, 0.11);
    border-radius: 16px;
  }

  &-content {
    padding: 35px 0 0;
    @include breakpoint.tablet {
      padding: 35px 68px 58px;
    }
  }
}

.calendar-month-header {
  width: fit-content;
}

table {
  width: 100%;
}
.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border: 1px solid color.$gray;
}

.button-group {
  margin-top: 30px;

  @include breakpoint.tablet {
    display: flex;
    justify-content: center;
    gap: 45px;
  }

  @include breakpoint.desktop {
    margin-top: 50px;
  }

  a {
    display: block;
    width: fit-content;
    margin: 0 auto;

    @include breakpoint.tablet {
      margin: 0;
    }
  }

  .result {
    background-color: color.$primary-dark;
    margin-top: 15px;

    @include breakpoint.tablet {
      margin-top: 0;
    }
    &:hover {
      background-color: color.$brown;
    }
  }
}
</style>
