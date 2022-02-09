<template>
  <div class="dropdown-title">
    <div class="img-frame">
      <img src="../assets/images/star.png" alt="star icon" />
    </div>
    <p v-if="selectedWrokType">{{ selectedWrokType }}</p>
    <p v-else><slot></slot></p>
    <button class="triangle" @click="this.$emit('clickDropdown')"></button>
  </div>
</template>

<script>
export default {
  name: "DropdownTitle",
  props: {
    selectedWrokType: {
      type: String,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.dropdown {
  &-title {
    display: flex;
    align-items: center;
    padding: 8px 8px 8px 0;
    border-bottom: 1px solid color.$gray;
  }

  .img-frame {
    width: 24px;
    height: 24px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  p {
    margin-left: 16px;
    font-weight: bold;
    font-size: 20px;
  }
  .triangle {
    width: 0;
    height: 0;
    border: 8px solid;
    margin-left: auto;
    margin-top: 10px;
    border-color: color.$black #fff #fff #fff;
  }
}
</style>
