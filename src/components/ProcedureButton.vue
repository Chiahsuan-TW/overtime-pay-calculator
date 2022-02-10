<template>
  <button>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "ProcedureButton",
};
</script>

<style lang="scss" scoped>
button {
  width: 208px;
  height: 51px;
  padding: 12px;
  background-color: color.$primary-light;
  color: #fff;
  border-radius: 4px;
  margin-top: 52px;
  font-weight: 800;
  font-size: 20px;
}

button:hover {
  background-color: color.$primary-dark;
  cursor: pointer;
}
</style>
