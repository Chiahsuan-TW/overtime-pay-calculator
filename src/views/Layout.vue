<template>
  <div class="content">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "layout",
  mounted() {
    const top = 50 + 60 + 40;
    const bottom = 230;
    const height = window.innerHeight - top - bottom;
    const modal = document.querySelector(".modal");
    modal.style.maxHeight = height + "px";
  },
};
</script>
<style scoped lang="scss">
p {
  margin-bottom: 50px;
}
.content {
  // height: 130vh;
  padding-top: 62px;
  background: no-repeat url("../assets/images/background.png");
  background-position: bottom left;
}
@media (min-width: 768px) {
  .content {
    height: 100vh;
    background-position: bottom;
  }
}
.content .modal {
  max-height: 200px;
}
</style>
