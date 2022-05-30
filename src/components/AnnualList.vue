<template>
  <div class="modal-content-item">
    <h4>{{ year }}年度統計</h4>
    <!-- <p>{{ calculateAnnualOfYear }}</p> -->
    <div class="monthly-details">
      <p class="working-hours">
        <span>當年度出勤時數</span>
        <span>{{ workingHourOfYear ? workingHourOfYear : 0 }}小時</span>
      </p>
      <p class="overtime-hours">
        <span>當年度加班時數</span>
        <span>{{ overtimeHourOfYear ? overtimeHourOfYear : 0 }}小時</span>
      </p>
      <p class="overtime-hours">
        <span>當年度加班費</span>
        <span>{{ overtimePayOfYear ? overtimePayOfYear : 0 }}NTD</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AnnualList",
  props: ["year", "calculateAnnualOfYear"],
  computed: {
    workingHourOfYear() {
      const { workingHour } = { ...this.calculateAnnualOfYear };
      return workingHour;
    },
    overtimeHourOfYear() {
      const { overtimeHour } = { ...this.calculateAnnualOfYear };
      return overtimeHour;
    },
    overtimePayOfYear() {
      const { overtimePay } = { ...this.calculateAnnualOfYear };
      return overtimePay;
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  &-content-item {
    background-color: color.$pale-yellow;
    padding: 20px;

    @include breakpoint.desktop {
      padding: 42px 62px;
    }

    h4 {
      @extend %content-title;
      text-align: center;

      @include breakpoint.desktop {
        text-align: left;
      }
    }

    .monthly-details {
      margin-top: 27px;

      @include breakpoint.desktop {
        display: flex;
        justify-content: space-between;
      }
    }

    p {
      width: 220px;
      margin: 0 auto;
      padding: 8px 0;
      display: flex;
      justify-content: space-between;

      @include breakpoint.desktop {
        margin: 0;
      }
    }

    span:first-child {
      @extend %content-large;
    }

    span:last-child {
      @extend %content-large-bold;
    }
  }

  &-content-item + &-content-item {
    margin-top: 40px;
  }
}
</style>
