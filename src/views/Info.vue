<template>
  <div class="modal">
    <div class="modal-content">
      <div class="dropdown">
        <DropdownTitle
          @clickDropdown="toggleDropdown"
          :selectedWrokType="selectedWrokType"
          >工作類型</DropdownTitle
        >
        <ul :class="['dropdown-menu', { unfolded: unfolded }]">
          <DropdownList
            v-for="(option, index) in workTypeList"
            :key="index"
            :option="option"
            @clickOption="selectWorkType"
          ></DropdownList>
        </ul>
      </div>
    </div>
  </div>
  <!-- <router-link :to="{ name: 'MonthlyRecord' }">下一步</router-link> -->
</template>

<script>
import DropdownTitle from "../components/DropdownTitle.vue";
import DropdownList from "../components/DropdownList.vue";
export default {
  name: "Info",
  components: {
    DropdownTitle,
    DropdownList,
  },
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
}

.dropdown-menu.unfolded {
  width: 100%;
  opacity: 1;
  max-height: fit-content;
  pointer-events: auto;
}
</style>
