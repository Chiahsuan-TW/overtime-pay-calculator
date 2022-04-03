<template>
  <td
    @click="toggleModal"
    class="calendar-day"
    :class="{
      'calendar-day--not-current': !isCurrentMonth,
      'calendar-day--today': isToday,
    }"
  >
    <span>{{ label }}</span>
    <!-- <p class="overtime-indicator">加班2hr</p> -->
  </td>
  <!-- <Teleport to="body">
    <CalendarModal v-if="isModalOpen" @close="toggleModal" />
  </Teleport> -->
  <CalendarModal v-if="isModalOpen" @close="toggleModal" :day="day" />
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
    currentDayData: {
      type: Object,
    },
  },
  data() {
    return {
      isModalOpen: false,
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
</style>
