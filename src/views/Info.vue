<template>
  <h3>基本資料</h3>
  <!-- <button @click="close">點關閉</button> -->
  <div class="modal">
    <nav class="loading" v-if="isLoading">
      <a href="">loading</a>
    </nav>
    <nav v-else>
      <a
        v-for="(company, index) in collectionUserCompany"
        :key="index"
        @click="currentIndex = index"
        :class="{ currentTab: index === currentIndex ? true : false }"
        >{{ company }}</a
      >
    </nav>
    <Stepper :currentStep="currentStep" />
    <div class="loading_content" v-if="isLoading"></div>
    <div class="modal-content" v-else>
      <p>{{ editingCompanies }}</p>
      <div class="modal-content-item companyName">
        <span>公司名稱:</span>
        <input type="text" :value="editingCompanies[currentIndex].companyName" @input="updateCompanyName" />
      </div>
      <div class="modal-content-item">
        <Dropdown :optionList="workTypeList" v-model:TypeValue="editingCompanies[currentIndex].workType"
          >工作類型</Dropdown
        >
      </div>
      <div class="modal-content-item">
        <Dropdown :optionList="workPatternList" v-model:TypeValue="editingCompanies[currentIndex].workPattern"
          >工作型態</Dropdown
        >
      </div>
      <div class="modal-content-item">
        <div class="dropdown-title">
          <div class="img-frame">
            <img src="../assets/images/star.png" alt="star icon" />
          </div>
          <input
            id="salary"
            type="number"
            :placeholder="`薪資: ${minimumWage}`"
            v-model="editingCompanies[currentIndex].wage"
          />
          <label for="salary" class="pen" @click="toggleDropdown">
            <img src="../assets/images/pen.png" alt="pen" />
          </label>
        </div>
      </div>
      <div class="modal-content-item">
        <div class="dropdown-title">
          <div class="img-frame">
            <img src="../assets/images/calendar.png" alt="calendar icon" />
          </div>
          <p>工作起始日</p>
        </div>
        <a-date-picker
          :allowClear="false"
          v-model:value="editingCompanies[currentIndex].firstDayOfWork"
          dropdownClassName="custom-calendar"
          class="custom-datepicker"
          :placeholder="placeholderDate"
        >
        </a-date-picker>
      </div>
      <div class="modal-content-item">
        <div class="dropdown-title">
          <div class="img-frame">
            <img src="../assets/images/calendar.png" alt="calendar icon" />
          </div>
          <p>工作結束日</p>
        </div>
        <a-date-picker
          :allowClear="false"
          v-model:value="editingCompanies[currentIndex].lastDayOfWork"
          dropdownClassName="custom-calendar"
          class="custom-datepicker"
          :placeholder="placeholderDate"
        >
        </a-date-picker>
      </div>
      <router-link
        :to="{
          name: 'MonthlyRecord',
          query: {
            companyID: $store.getters['recordingData/currentCompanyID'],
          },
        }"
      >
        <ProcedureButton @click="postDataBase">下一步</ProcedureButton>
      </router-link>
    </div>
  </div>
</template>

<script>
import Stepper from "../components/Stepper.vue";
import Dropdown from "../components/Dropdown.vue";
import ProcedureButton from "../components/ProcedureButton.vue";
import moment from "moment";
// import { mapGetters, mapState } from "vuex";
// import axios from "axios";

export default {
  name: "Info",
  components: {
    Stepper,
    Dropdown,
    ProcedureButton,
  },

  data() {
    return {
      workTypeList: ["廠工", "建築工", "看護", "漁工"],
      workPatternList: ["輪班", "非輪班"],
      minimumWage: "25250",
      currentStep: 1,
      placeholderDate: new Date().toISOString().split("T")[0],
      editingCompanies: [...Array(4)].map((x) => {
        return {};
      }),
      isLoading: true,
    };
  },
  async created() {
    // 非會員

    // if (this.$store.state.userID !== "guest") {
    // await this.$store.dispatch("getDataBase");
    // this.editingCompanies = this.currentUserInfoData;
    this.isLoading = false;
    // return;
    // }
    // await this.$store.dispatch("getDataBase");
    // this.editingCompanies = this.currentUserInfoData;
    //訪客登入
    //不發get api
    // this.editingCompanies = this.currentUserInfoData;
  },

  methods: {
    updateCompanyName(e) {
      this.editingCompanies[this.currentIndex].companyName = e.target.value;
      this.$store.commit("updateCompanyName", {
        value: e.target.value || ` 公司${this.currentIndex + 1}`,
        index: this.currentIndex,
      });
    },
    async postDataBase() {
      //日期轉乘字串
      const formattedData = this.editingCompanies.map((item, index) => {
        return {
          ...item,
          firstDayOfWork: item.firstDayOfWork.format("YYYY-MM-DD"),
          lastDayOfWork: item.lastDayOfWork.format("YYYY-MM-DD"),
        };
      });
      this.$store.commit("updateUserInfoData", formattedData);
      await this.$store.dispatch("postDataBase", {
        params: this.currentIndex,
        data: JSON.stringify(formattedData),
      });
    },
    close() {
      this.isLoading = !this.isLoading;
    },
  },
  computed: {
    collectionUserCompany: {
      get() {
        return this.$store.getters.collectionUserCompany;
      },
    },
    currentUserInfoData() {
      return this.$store.getters.currentUserInfoData;
    },

    currentIndex: {
      get() {
        return this.$store.getters.currentIndex;
      },
      set(newIndex) {
        return this.$store.commit("updateCurrentIndex", newIndex);
      },
    },
  },
};
</script>

<style scoped lang="scss">
* {
  // outline: 1px solid red;
}
h3 {
  @extend %page-title;
  width: fit-content;
  margin: 0 auto;
}

.modal {
  max-width: 1000px;
  background-color: #fff;
  box-shadow: 3px 6px 14px rgba(255, 153, 0, 0.11);
  border-radius: 16px;
  margin: 40px auto 0;
  padding: 40px 0;

  @include breakpoint.tablet {
    width: 80%;
    max-width: 1094px;
    max-height: 600px;
    overflow-x: auto;
    overflow-y: scroll;
    margin: 40px auto 0;
    box-shadow: 3px 6px 14px rgba(255, 153, 0, 0.11);
    border-radius: 16px;
  }

  &-content {
    max-width: 330px;
    margin: 60px auto 0;
  }
}
.modal nav {
  display: flex;
  vertical-align: center;
  font-size: 20px;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
  & > a {
    vertical-align: middle;
    text-align: center;
    color: color.$gray;
    border-radius: 10px 10px 0px 0px;
    font-weight: 600;
    width: 145px;
    line-height: 45px;
    margin: 0;
    overflow: hidden;
    white-space: nowrap;
  }
  .currentTab {
    color: #fff;
    background: color.$primary-light;
  }
}

.modal-content-item {
  position: relative;
  border-bottom: 1px solid color.$gray;

  & + .modal-content-item {
    margin-top: 30px;
  }
}

.dropdown-title {
  display: flex;
  align-items: center;
  padding: 8px 8px 8px 0;

  & + input {
    border: 0;
    display: block;
  }

  & + input:focus {
    outline: none;
  }

  .img-frame {
    width: 24px;
    height: 24px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  input {
    border: 0;
    margin-left: 16px;
    @extend %content-large;
  }

  input:focus {
    outline: none;
  }
  ::placeholder {
    @extend %content-large;
  }
  .pen {
    margin-left: auto;
    width: 19px;
    height: 19px;
    background-color: #fff;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  p {
    margin-left: 16px;
    @extend %content-large-bold;
  }
}

a {
  display: block;
  width: fit-content;
  margin: 52px auto 0;
}
.companyName {
  @extend %content-large;
  font-weight: bold;
  > span {
    margin-right: 16px;
  }
  > input {
    border: 1px;
  }
  margin-bottom: 30px;
}

%loading {
  opacity: 0.7;
  width: 580px;
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  animation: skeleton-loading 3s linear infinite reverse;
}
.modal {
  .loading {
    a {
      @extend %loading;
    }
  }
  .loading_content {
    margin: 60px auto 0;
    height: 400px;
    @extend %loading;
  }
}
@keyframes skeleton-loading {
  0% {
    background-position: -468px 0;
    color: #cfc7c7;
  }

  100% {
    background-position: 468px 0;
    color: #4c4545;
  }
}
</style>
