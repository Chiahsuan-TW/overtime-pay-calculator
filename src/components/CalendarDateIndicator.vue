<template>
  <div class="date-indicator">
    <span @click="selectPreviousYear" class="select">«</span>
    <span @click="selectPreviousMonth" class="select">‹</span>
    <span class="calendar-date">{{ selectedMonth }}</span>
    <span @click="selectNextMonth" class="select">›</span>
    <span @click="selectNextYear" class="select">»</span>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  props: {
    selectedDate: {
      type: Object,
      required: true,
    },
    // currentDate: {
    //   type: String,
    //   required: true,
    // },
  },
  methods: {
    selectPreviousYear() {
      let newSelectedDate = dayjs(this.selectedDate).subtract(1, "year");
      this.$emit("dateSelected", newSelectedDate);
    },
    selectPreviousMonth() {
      let newSelectedDate = dayjs(this.selectedDate).subtract(1, "month");
      this.$emit("dateSelected", newSelectedDate);
    },
    selectNextYear() {
      let newSelectedDate = dayjs(this.selectedDate).add(1, "year");
      this.$emit("dateSelected", newSelectedDate);
    },
    selectNextMonth() {
      let newSelectedDate = dayjs(this.selectedDate).add(1, "month");
      this.$emit("dateSelected", newSelectedDate);
    },
  },
  computed: {
    selectedMonth() {
      return this.selectedDate.format("MMMM YYYY");
    },
  },
};
</script>

<style lang="scss" scoped>
.date-indicator {
  text-align: center;
  padding: 10px 5px;
}
.select {
  font-size: 25px;
}
.select:hover {
  cursor: pointer;
  color: color.$primary-dark;
}

.calendar-date {
  @extend %content-title;
  padding: 0 10px;
  display: inline-block;
  width: 220px;
}
</style>
