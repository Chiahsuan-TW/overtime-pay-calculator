<template>
  <div class="modal-content-item">
    <h4>{{ month }}月</h4>
    <div class="monthly-details">
      <p class="working-hours">
        <span>當月出勤時數</span>
        <span>{{ workingHour }}小時</span>
      </p>
      <p class="overtime-hours">
        <span>當月加班時數</span>
        <span>{{ overtimeHour }}小時</span>
      </p>
      <p class="overtime-hours">
        <span>當月加班費</span>
        <span>{{ overtimePay }} NTD</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MonthlyList",
  props: {
    month: {
      type: [Number, String],
      required: true,
    },
    workingHour: {
      type: [Number, String],
      required: true,
    },
    overtimeHour: {
      type: [Number, String],
      required: true,
    },
    overtimePay: {
      type: [Number, String],
      required: true,
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
      border-bottom: 1px solid color.$gray;

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
