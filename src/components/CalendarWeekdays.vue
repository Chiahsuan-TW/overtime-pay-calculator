<template>
  <tr class="day-of-week">
    <td v-for="weekday in weekdays" :key="weekday">
      {{ weekday }}
    </td>
  </tr>
</template>

<script>
const WEEKDAYS = ["ㄧ", "二", "三", "四", "五", "六", "日"];

export default {
  name: "CalendarWeekdays",

  computed: {
    weekdays() {
      return WEEKDAYS;
    },
  },
};
</script>

<style lang="scss" scoped>
.day-of-week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin: 0;
  background-color: #fff9ec;

  td {
    padding: 8px;
    text-align: center;
    @extend %content-small;
  }
}

td:nth-child(6) {
  color: color.$primary-dark;
}

td:last-child {
  color: color.$primary-dark;
}
</style>
