<template>
  <div class="modal">
    <div class="modal-content">
      <div class="dropdown">
        <div class="dropdown-title">
          <div class="img-frame">
            <img src="../assets/images/star.png" alt="star icon" />
          </div>
          <p v-if="selectedWrokType">{{ selectedWrokType }}</p>
          <p v-else>工作類型</p>
          <button class="triangle" @click="toggleDropdown"></button>
        </div>
        <ul :class="['dropdown-menu', { unfolded: unfolded }]">
          <li
            v-for="(workType, index) in workTypeList"
            :key="index"
            @click="selectWorkType(workType)"
          >
            {{ workType }}
          </li>
        </ul>
      </div>
    </div>
  </div>
  <!-- <router-link :to="{ name: 'MonthlyRecord' }">下一步</router-link> -->
</template>

<script>
export default {
  name: "Info",
  data() {
    return {
      workTypeList: ["廠工", "建築工", "看護", "漁工"],
      selectedWrokType: "",
      unfolded: false,
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

<style scoped lang="scss">
.modal {
  max-width: 1000px;
  background-color: #fff;

  &-content {
    max-width: 330px;
    margin: 0 auto;
  }
}

.dropdown {
  position: relative;

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
    margin-left: 20px;
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

.dropdown-menu {
  width: 100%;
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
  }
}

.dropdown-menu.unfolded {
  width: 100%;
  opacity: 1;
  max-height: fit-content;
  pointer-events: auto;
}
</style>
