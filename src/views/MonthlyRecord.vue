<template>
  <h3>工時及休假紀錄</h3>
  <div class="modal">
    <p>是會員嗎{{ isLogIn }}</p>
    <pre>目前哪一個companyID:{{ currentCompanyID }}</pre>
    <pre>{{ monthlyRecordData }}</pre>
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
      <MonthlyInfo :overtimeHours="overtimeHours"></MonthlyInfo>
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
    overtimeHours() {
      let totalHour = 0;
      this.monthlyRecordData.forEach((element) => {
        const momentStartDuty = moment(element.date + " " + element.onDuty);
        const momentOffDuty = moment(element.date + " " + element.offDuty);
        const hour = momentOffDuty.diff(momentStartDuty, "hour");
        totalHour += hour;
      });
      return totalHour;
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
