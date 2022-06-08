<template>
  <h3>出勤明細</h3>
  <div class="modal">
    <Stepper :currentStep="currentStep" />
    <div class="modal-content custom-dropdown">
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
          <div class="wrap_img">
            <img src="../assets/images/calendar.png" alt="calendar icon" />
          </div>
          <span class="display_text">{{
            selectedYear ? selectedYear : "選擇年份"
          }}</span>
          <DownOutlined />
        </a>
        <template #overlay>
          <a-menu @click="clickYear">
            <a-menu-item v-for="year in years" :key="year">{{
              year
            }}</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <div class="modal-content" v-if="!isClickYear">
      <h2>請點選年份</h2>
    </div>

    <div class="modal-content" v-else>
      <MonthlyList
        v-for="(data, index) in showData"
        :key="index"
        :year="data.year"
        :month="data.month"
        :workingHour="data.workingHour"
        :overtimeHour="data.overtimeHour"
        :overtimePay="data.overtimePay"
      />
    </div>

    <div class="divider"></div>

    <div class="result">
      <AnnualList
        :year="selectedYear"
        :calculateAnnualOfYear="calculateAnnualOfYear"
      />
    </div>
    <div class="bottom">
      <ProcedureButton class="previous-button" @click="previousButton"
        >上一步</ProcedureButton
      >

      <CustomPopover @openPDF="openPDF"></CustomPopover>
    </div>
  </div>
</template>
<script>
import Stepper from "@/components/Stepper.vue";
import ProcedureButton from "@/components/ProcedureButton.vue";
import MonthlyList from "../components/MonthlyList.vue";
import AnnualList from "../components/AnnualList.vue";
import { DownOutlined } from "@ant-design/icons-vue";
import CustomPopover from "@/components/CustomPopover.vue";

export default {
  name: "AnnualRecord",
  components: {
    Stepper,
    ProcedureButton,
    MonthlyList,
    AnnualList,
    DownOutlined,
    CustomPopover,
  },
  data() {
    return {
      currentStep: 3,
      selectedYear: "2022",
      monthlyRecords: [],
      isClickYear: false,
    };
  },
  methods: {
    previousButton() {
      this.$router.back();
    },
    clickYear(e) {
      this.selectedYear = e.key;
      this.isClickYear = true;
    },
    openPDF() {
      const newPage = window.open("", "", "width=1000,height=500");
      const content = document.querySelectorAll(".modal-content");
      const result = document.querySelector(".result").innerHTML;
      content.forEach((item) => {
        newPage.document.body.innerHTML += item.innerHTML;
      });
      newPage.document.body.innerHTML += `<hr></hr>${result}`;
      newPage.document.body.style =
        "width:500px;margin:0 auto;text-align:center";
      newPage.print();
    },
  },
  computed: {
    workingHours() {
      return this.$store.getters["recordingData/workingHours"] || [];
    },
    overtimeHours() {
      return this.$store.getters["recordingData/overtimeHours"] || [];
    },
    overtimePays() {
      return this.$store.getters["recordingData/overtimePays"] || [];
    },
    formattedData() {
      const data = [];
      for (let workingHour in this.workingHours) {
        const formattedObject = {};
        const yearLength = workingHour.length - 2;
        formattedObject["year"] = workingHour.slice(0, yearLength);
        formattedObject["month"] = workingHour.slice(-2);
        formattedObject["workingHour"] = this.workingHours[workingHour];
        formattedObject["overtimeHour"] = this.overtimeHours[workingHour];
        formattedObject["overtimePay"] = this.overtimePays[workingHour];
        data.push(formattedObject);
      }
      return data;
    },
    years() {
      return this.formattedData.reduce((previousData, currentData) => {
        const findResult = previousData.findIndex(
          (item) => item === currentData.year
        );
        if (findResult === -1) {
          previousData.push(currentData.year);
        }
        return previousData;
      }, []);
    },
    showData() {
      return this.formattedData.filter(
        (item) => item.year === this.selectedYear
      );
    },
    calculateAnnualOfYear() {
      return this.showData.reduce((previousData, currentData) => {
        previousData["workingHour"] =
          (previousData["workingHour"] ?? 0) + currentData.workingHour;
        previousData["overtimeHour"] =
          (previousData["overtimeHour"] ?? 0) + currentData.overtimeHour;
        previousData["overtimePay"] =
          (previousData["overtimePay"] ?? 0) + currentData.overtimePay;
        return previousData;
      }, {});
    },
  },
};
</script>
<style lang="scss" scoped>
* {
  // outline: 1px solid red;
}
h3 {
  @extend %page-title;
  margin: 0 auto;
  width: fit-content;
}

.modal {
  max-width: 1000px;
  background-color: #fff;
  box-shadow: 3px 6px 14px rgba(255, 153, 0, 0.11);
  border-radius: 16px;
  margin: 40px auto 0;
  padding: 40px 0;
  height: fit-content;
  max-height: 1000px;
  overflow-y: scroll;
  overflow-x: auto;

  @include breakpoint.tablet {
    width: 80%;
    height: 600px;
  }

  &-content {
    width: 100%;
    padding: 30px;

    @include breakpoint.tablet {
      padding: 68px;
    }
  }
}

.divider {
  width: 100%;
  border-bottom: 1px solid color.$primary;
}

.result {
  padding: 30px 30px 0;

  @include breakpoint.tablet {
    padding: 63px 68px 0;
  }
  .modal-content-item {
    background-color: color.$yellow;
  }
}

.bottom {
  width: fit-content;
  margin: 50px auto 0;
}
.previous-button {
  width: 172px;
  margin-right: 20px;
  &:hover {
    background-color: color.$brown;
  }
}
.complete-button {
  width: 172px;
  background-color: color.$primary-dark;
  &:hover {
    background-color: color.$brown;
  }
}
</style>
