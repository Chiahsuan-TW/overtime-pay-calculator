<template>
  <div class="record-table">
    <p class="record-list">
      <span>當月出勤時數</span>
      <span>{{ workingHours }}小時</span>
    </p>
    <p class="record-list">
      <span>當月加班時數</span>
      <span>{{ overtimeHours }}小時</span>
    </p>
    <p class="record-list">
      <span>當月加班費</span>
      <span>{{ overtimePay }}NTD</span>
    </p>
    <p class="record-list">
      <span>當月積假</span>
      <span>{{ annualLeave }}天</span>
    </p>
    <p class="record-list">
      <span>積假轉換薪資</span>
      <span>{{ wagesForLeaveDays }} NTD</span>
    </p>
  </div>
</template>
<script>
export default {
  name: "MonthlyInfo",
  props: {
    workingHours: {
      type: Number,
      default: 0,
    },
    overtimeHours: {
      type: Number,
      default: 0,
    },
    overtimePay: {
      type: Number,
      default: 0,
    },
    annualLeave: {
      type: Number,
      default: 12,
    },
    wagesForLeaveDays: {
      type: Number,
      default: 0,
    },
  },
};
</script>
<style scoped lang="scss">
.record-table {
  margin-top: 32px;
  padding: 23px 19px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-color: color.$yellow;

  @include breakpoint.tablet {
    padding: 46px 39px;
    justify-content: space-between;
    background-color: color.$pale-yellow;
  }

  @include breakpoint.desktop {
    margin-top: 64px;
  }

  .record-list {
    padding: 8px 0;
    border-bottom: 1px solid color.$primary-dark;
    display: flex;
    justify-content: space-between;
    flex-basis: 80%;
    font-size: 0;

    @include breakpoint.tablet {
      flex-basis: 45%;
    }

    span {
      @extend %content-small;
    }

    span:first-child {
      @extend %content-small-bold;
    }
  }

  .record-list + .record-list {
    margin-top: 10px;

    @include breakpoint.tablet {
      margin-top: 0;
    }
  }

  @include breakpoint.tablet {
    .record-list:last-child {
      margin: 10px auto 0;
      flex-basis: 50%;
    }
  }
}
</style>
