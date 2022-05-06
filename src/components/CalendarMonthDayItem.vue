<template>
  <td
    @click="toggleModal(label)"
    class="calendar-day"
    :class="{
      'calendar-day--not-current': !isCurrentMonth,
      'calendar-day--today': isToday,
      isExistingData: this.monthlyRecordData.find((item) => item.date === this.day.date) ? true : false,
    }"
  >
    <span>{{ label }}</span>
    <!-- <p class="overtime-indicator">加班2hr</p> -->
  </td>
  <!-- <Teleport to="body">
    <CalendarModal v-if="isModalOpen" @close="toggleModal" />
  </Teleport> -->
  <CalendarModal v-if="isModalOpen" @close="toggleModal" :day="day" :currentDayData="currentDayData" />
</template>

<script>
import dayjs from "dayjs";
import CalendarModal from "@/components/CalendarModal.vue";

export default {
  name: "CalendarMonthDayItem",
  components: {
    CalendarModal,
  },
  props: {
    day: {
      type: Object,
      required: true,
    },

    isCurrentMonth: {
      type: Boolean,
      default: false,
    },

    isToday: {
      type: Boolean,
      default: false,
    },
    days: {
      type: Array,
    },
    monthlyRecordData: {
      type: Object,
    },
  },
  data() {
    return {
      isModalOpen: false,
      // isExistingData: this.monthlyRecordData.find((item) => item.date === this.day.date) ? true : false,
    };
  },
  methods: {
    toggleModal() {
      if (this.isCurrentMonth) {
        this.isModalOpen = !this.isModalOpen;
      }
    },
  },
  computed: {
    label() {
      return dayjs(this.day.date).format("D");
    },
    currentDayData() {
      return (
        this.monthlyRecordData.find((item) => item.date === this.day.date) || {
          userID: this.$store.state.userID,
          companyID: this.$route.query.companyID,
          date: this.day.date,
          onDuty: "",
          offDuty: "",
          isDayOff: "",
          leaveType: "",
          workingHours: "",
          overtimeHours: "",
          overtimePay: "",
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.calendar-day {
  padding: 10px 10px;
  border: 1px solid color.$gray;

  @extend %content-small-bold;
  text-align: center;

  @include breakpoint.desktop {
    padding: 16px 35px;
  }
}

.calendar-day:hover {
  cursor: pointer;
}

.calendar-day--not-current {
  color: color.$gray;
}

.calendar-day--today {
  color: color.$primary-dark;
}

.overtime-indicator {
  color: color.$primary-dark;
  font-size: 12px;
}
.isExistingData {
  background: #d8e7fd;
}
</style>
