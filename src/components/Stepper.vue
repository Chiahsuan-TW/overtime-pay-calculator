<template>
  <div class="stepper">
    <div class="step active">1</div>
    <div :class="['step', { active: currentStep >= 2 }]">2</div>
    <div :class="['step', { active: currentStep === 3 }]">3</div>
  </div>
</template>

<script>
export default {
  name: "Stepper",
  props: {
    currentStep: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.stepper {
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;

  > div {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 3px solid color.$primary-dark;
    display: flex;
    justify-content: center;
    align-items: center;
    color: color.$primary-dark;
    font-size: 25px;
    font-weight: bold;
    position: relative;
    z-index: 6;

    & + div {
      margin-left: 130px;
      background-color: #fff;
    }
  }

  .active {
    color: #fff;
    background-color: color.$primary;
    border: 3px solid color.$primary;
  }
}

.stepper::after {
  display: block;
  content: "";
  width: 100%;
  border-bottom: 2px dashed color.$primary;
  position: absolute;
  top: 50%;
  z-index: 3;
}
</style>
