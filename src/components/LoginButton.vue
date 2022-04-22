<template>
  <button class="LoginButton">
    <div class="log_img">
      <slot name="logoImg"></slot>
    </div>
    <p><slot name="logoName"> </slot></p>
  </button>
</template>

<script>
export default {
  name: "LoginButton",
};
</script>

<style scoped lang="scss">
// * {
//   outline: 1px solid red;
// }
.LoginButton {
  width: 100%;
  background: color.$primary-dark;
  color: #fff;
  font-weight: 900;
  padding: 17px;
  display: flex;
  margin-bottom: 24px;
  border-radius: 4px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;

  &:hover {
    background: color.$primary-light;
  }
  @include breakpoint.tablet {
    width: 331px;
    padding: 17px 0px 17px 88px;
  }
  @extend %content-title;
}
.log_img {
  width: 38px;
  height: 38px;
  margin-right: 10px;
}
</style>
