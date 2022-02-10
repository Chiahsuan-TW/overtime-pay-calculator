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



</style>
