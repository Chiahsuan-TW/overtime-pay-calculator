<template>
  <h3>2021每月出勤明細</h3>
  <div class="modal">
    <Stepper :currentStep="currentStep" />

    <div class="modal-content">
      <MonthlyList
        v-for="(record, index) in monthlyRecords"
        :key="index"
        v-bind="record"
      />
    </div>

    <div class="divider"></div>

    <div class="result">
      <AnnualList />
    </div>

    <ProcedureButton class="complete-button">完成</ProcedureButton>
  </div>
</template>
<script>
import Stepper from "@/components/Stepper.vue";
import ProcedureButton from "@/components/ProcedureButton.vue";
import MonthlyList from "../components/MonthlyList.vue";
import AnnualList from "../components/AnnualList.vue";

export default {
  name: "AnnualRecord",
  components: {
    Stepper,
    ProcedureButton,
    MonthlyList,
    AnnualList,
  },
  data() {
    return {
      currentStep: 3,
      monthlyRecords: [
        { month: "1月", workingHours: 20, overtimeHours: 2, overtimePay: 2000 },
        { month: "2月", workingHours: 20, overtimeHours: 2, overtimePay: 2000 },
        { month: "3月", workingHours: 20, overtimeHours: 2, overtimePay: 2000 },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
h3 {
  @extend %page-title;
  margin: 0 auto;
  width: fit-content;
}

.modal {
  max-width: 1000px;
  background-color: #fff;
  box-shadow: 3px 6px 14px rgba(255, 153, 0, 0.11);
  border-radius: 16px;
  margin: 40px auto 0;
  padding: 40px 0;
  height: fit-content;
  max-height: 1000px;
  overflow-y: scroll;
  overflow-x: auto;

  @include breakpoint.tablet {
    width: 80%;
    height: 600px;
  }

  &-content {
    width: 100%;
    padding: 30px;

    @include breakpoint.tablet {
      padding: 68px;
    }
  }
}

.divider {
  width: 100%;
  border-bottom: 1px solid color.$primary;
}

.result {
  padding: 30px 30px 0;

  @include breakpoint.tablet {
    padding: 63px 68px 0;
  }
  .modal-content-item {
    background-color: color.$yellow;
  }
}

.complete-button {
  width: 172px;
  background-color: color.$primary-dark;

  &:hover {
    background-color: color.$brown;
  }
}
</style>
