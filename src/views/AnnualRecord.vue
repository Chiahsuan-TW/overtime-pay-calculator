<template>
  <h3>每月出勤明細</h3>
  <div class="modal">
    <Stepper :currentStep="currentStep" />

    <div class="modal-content">
      <div class="modal-content-item">
        <h4>1月</h4>
        <p class="working-hours">
          <span>當月出勤時數</span>
          <span>20小時</span>
        </p>
        <p class="overtime-hours">
          <span>當月加班時數</span>
          <span>2小時</span>
        </p>
        <p class="overtime-hours">
          <span>當月加班費</span>
          <span>2000 NTD</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import Stepper from "@/components/Stepper.vue";

export default {
  name: "AnnualRecord",
  components: {
    Stepper,
  },
  data() {
    return {
      currentStep: 3,
    };
  },
};
</script>
<style lang="scss" scoped>
.modal {
  max-width: 1000px;
  background-color: #fff;
  box-shadow: 3px 6px 14px rgba(255, 153, 0, 0.11);
  border-radius: 16px;
  margin: 40px auto 0;
  padding: 40px 0;

  &-content {
    width: 100%;
    padding: 68px;
  }

  &-content-item {
    background-color: color.$pale-yellow;
    display: flex;
    flex-direction: column;
    align-items: left;
    font-size: 0;
  }

  .monthly-details {
    span {
      @extend %content-large;
    }
  }
}
</style>
