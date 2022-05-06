<template>
  <router-view />
</template>
<script>
export default {
  mounted() {
    window.addEventListener("beforeunload", () => {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("company1");
      localStorage.removeItem("company2");
      localStorage.removeItem("company3");
      localStorage.removeItem("company4");
    });
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #fff9ed;
}
</style>
