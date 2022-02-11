<template>
  <div class="content">
    <router-view></router-view>
  </div>
</template>
<script></script>
<style scoped lang="scss">
.content {
  height: 130vh;
  background: no-repeat url("../assets/images/background.png");
  background-position: bottom;
}
@media (min-width: 768px) {
  .content {
    height: 100vh;
  }
}
p {
  margin-bottom: 50px;
}
</style>
