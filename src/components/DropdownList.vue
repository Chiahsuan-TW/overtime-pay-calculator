<template>
  <li @click="this.$emit('clickOption', option)">
    {{ option }}
  </li>
</template>

<script>
export default {
  name: "DropdownList",
  props: {
    option: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.dropdown-menu {
  li {
    padding: 12px 0;
    width: 100%;
    border: 1px solid color.$gray;
    background-color: #fff;
    color: color.$gray;
    font-weight: 500;
    font-size: 20px;
  }

  li:not(:first-child) {
    border-top: 0;
  }

  li:hover {
    color: color.$primary;
    cursor: pointer;
  }
}
</style>
