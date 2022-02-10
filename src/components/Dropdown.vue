<template>
  <div class="dropdown-title">
    <div class="img-frame">
      <img src="../assets/images/star.png" alt="star icon" />
    </div>
    <p v-if="selectedWrokType">{{ selectedWrokType }}</p>
    <p v-else><slot></slot></p>
    <button class="triangle" @click="toggleDropdown"></button>
  </div>

  <ul :class="['dropdown-menu', { unfolded: unfolded }]">
    <li
      v-for="(option, index) in optionList"
      :key="index"
      :option="option"
      @click="selectWorkType(option)"
    >
      {{ option }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "Dropdown",
  props: {
    optionList: {
      type: Array,
    },
  },
  data() {
    return {
      unfolded: false,
      selectedWrokType: "",
    };
  },
  methods: {
    toggleDropdown() {
      this.unfolded = !this.unfolded;
    },
    selectWorkType(workType) {
      this.selectedWrokType = workType;
      this.toggleDropdown();
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-content-item {
  .dropdown-title {
    display: flex;
    align-items: center;
    padding: 8px 8px 8px 0;
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

  .triangle:hover {
    cursor: pointer;
  }
}

.dropdown-menu {
  width: 100%;
  margin: 13px 0 0;
  padding: 0;
  opacity: 0;
  max-height: 0;
  transition: 500ms opacity ease-in-out, 1.5s max-height;
  pointer-events: none;
  position: absolute;
  top: 100%;
  z-index: 99;

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

.dropdown-menu.unfolded {
  width: 100%;
  opacity: 1;
  max-height: fit-content;
  pointer-events: auto;
}
</style>
