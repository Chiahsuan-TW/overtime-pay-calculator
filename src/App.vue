<template>
  <router-view />
</template>
<script>
export default {
  mounted() {
    window.addEventListener("beforeunload", () => {
      localStorage.removeItem("usrInfo");
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
