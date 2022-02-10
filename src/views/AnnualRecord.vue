<template>
  <h3>每月出勤明細</h3>
  <div class="modal">
    <Stepper :currentStep="currentStep" />

    <div class="modal-content">
      <div class="modal-content-item">
        <h4>1月</h4>
        <div class="monthly-details">
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

      <div class="modal-content-item">
        <h4>2月</h4>
        <div class="monthly-details">
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

      <div class="modal-content-item">
        <h4>3月</h4>
        <div class="monthly-details">
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

    <div class="divider"></div>

    <div class="result">
      <div class="modal-content-item">
        <h4>年度統計</h4>
        <div class="monthly-details">
          <p class="working-hours">
            <span>當年度出勤時數</span>
            <span>60小時</span>
          </p>
          <p class="overtime-hours">
            <span>當年度加班時數</span>
            <span>6小時</span>
          </p>
          <p class="overtime-hours">
            <span>當年度加班費</span>
            <span>6000 NTD</span>
          </p>
        </div>
      </div>
    </div>

    <ProcedureButton class="complete-button">完成</ProcedureButton>
  </div>
</template>
<script>
import Stepper from "@/components/Stepper.vue";
import ProcedureButton from "@/components/ProcedureButton.vue";

export default {
  name: "AnnualRecord",
  components: {
    Stepper,
    ProcedureButton,
  },
  data() {
    return {
      currentStep: 3,
    };
  },
};
</script>
<style lang="scss" scoped>
h3 {
  @extend %page-title;
  margin: 45px auto 0;
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

  &-content {
    width: 100%;
    padding: 30px;

    @include breakpoint.tablet {
      padding: 68px;
    }
  }

  &-content-item {
    background-color: color.$pale-yellow;
    padding: 20px;

    @include breakpoint.desktop {
      padding: 42px 62px;
    }

    h4 {
      @extend %content-title;

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
      // min-width: 100%;
      width: 220px;
      margin: 0 auto;
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
      // margin-left: 56px;
    }
  }

  &-content-item + &-content-item {
    margin-top: 40px;
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

::-webkit-scrollbar {
  width: 6px;
  height: 0px;
}

::-webkit-scrollbar-track {
  background: #fff;
}

::-webkit-scrollbar-thumb {
  background: color.$primary;
  border-radius: 5px;
  height: 10px;
}
</style>
