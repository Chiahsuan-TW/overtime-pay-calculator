<template>
  <h3>基本資料</h3>
  <div class="modal">
    <nav>
      <a
        v-for="(company, index) in collectionUserCompany"
        :key="index"
        @click="switchTab(index)"
        :class="{ currentTab: index === companyIndex ? true : false }"
        >{{ company }}</a
      >
    </nav>
    <Stepper :currentStep="currentStep" />
    <div class="modal-content">
      <div class="companyName">
        <span>公司名字:</span>
        <input type="text" :value="companyName" @input="updateCompanyName" />
      </div>

      <div class="modal-content-item">
        <Dropdown :optionList="workTypeList" @selectTypeValue="selectWorkType" :selectedType="currentUserData.workType"
          >工作類型</Dropdown
        >
      </div>

      <div class="modal-content-item">
        <Dropdown
          :optionList="workPatternList"
          @selectTypeValue="selectWorkPattern"
          :selectedType="currentUserData.workPattern"
          >工作型態</Dropdown
        >
      </div>

      <div class="modal-content-item">
        <div class="dropdown-title">
          <div class="img-frame">
            <img src="../assets/images/star.png" alt="star icon" />
          </div>
          <input id="salary" type="number" :placeholder="`薪資: ${minimumWage}`" v-model="currentUserData.wage" />
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
          v-model:value="currentUserData.firstDayOfWork"
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
          v-model:value="currentUserData.lastDayOfWork"
          dropdownClassName="custom-calendar"
          class="custom-datepicker"
          :placeholder="placeholderDate"
        >
        </a-date-picker>
      </div>
      <router-link :to="{ name: 'MonthlyRecord' }">
        <ProcedureButton @click="saveToDatabase">下一步</ProcedureButton>
      </router-link>
    </div>
  </div>
</template>

<script>
import Dropdown from "../components/Dropdown.vue";
import Stepper from "../components/Stepper.vue";
import ProcedureButton from "../components/ProcedureButton.vue";
import { Moment } from "moment";
import { mapState } from "vuex";

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
      workPatternList: ["週休二日", "非週休二日"],
      minimumWage: "25250",
      currentStep: 1,
      placeholderDate: new Date().toISOString().split("T")[0],
      currentUserData: {},
      companyIndex: 0,
    };
  },
  created() {
    this.getVuexData();
  },

  methods: {
    getVuexData() {
      this.currentUserData = this.$store.state.allUserInfo[this.companyIndex];
    },

    switchTab(index) {
      //改變index
      this.companyIndex = index;
      //tab切換把basic_info資料更換
      this.currentUserData = this.$store.state.allUserInfo[this.companyIndex];
    },
    updateCompanyName(e) {
      this.$store.commit("updateCompanyName", {
        value: e.target.value || ` 公司${this.companyIndex + 1}`,
        index: this.companyIndex,
      });
    },
    selectWorkType(value) {
      this.currentUserData.workType = value;
    },
    selectWorkPattern(value) {
      this.currentUserData.workPattern = value;
    },
  },
  computed: {
    collectionUserCompany() {
      return this.$store.getters.collectionUserCompany;
    },
    ...mapState({
      companyName: function (state) {
        return state.allUserInfo[this.companyIndex].companyName;
      },
    }),
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
</style>
