<template>
  <div class="modal-background">
    <div class="modal">
      <span class="close" @click="$emit('close')">&#x2715;</span>
      <div class="modal-content">
        <div class="modal-title">
          <span>{{ formateDate }}</span>
          <span>{{ weekday }}</span>
        </div>
        <div class="on-duty">
          <span>上班時間</span>
          <a-time-picker
            @change="getOnDutyTime"
            class="custom-timepicker"
            :allowClear="false"
            :default-value="onDuty"
            format="HH:mm"
            :disabled="isEnabled"
          />
        </div>
        <div class="off-duty">
          <span>下班時間</span>
          <a-time-picker
            @change="getOffDutyTime"
            class="custom-timepicker"
            :allowClear="false"
            :default-value="offDuty"
            format="HH:mm"
            :disabled="isEnabled"
          />
        </div>
        <div class="day-off">
          <div>
            <input type="checkbox" id="day-off" v-model="isEnabled" />
            <label for="day-off">請假</label>
          </div>
          <div>
            <select name="day-off" id="day-off-select" :disabled="!isEnabled" v-model="leaveType">
              <option value="">請選擇假別</option>
              <option value="personal leave">事假</option>
              <option value="annual leave">特休</option>
              <option value="sick leave">病假</option>
            </select>
          </div>
        </div>
        <div class="button-group">
          <ProcedureButton @click="$emit('close')" class="cancel">取消</ProcedureButton>
          <ProcedureButton @click="clickConfirm" class="confirm">確認</ProcedureButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import ProcedureButton from "./ProcedureButton.vue";

export default {
  props: {
    day: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      onDuty: moment("00:00", "HH:mm"),
      offDuty: moment("17:00", "HH:mm"),
      isEnabled: false,
      leaveType: "",
    };
  },
  components: { ProcedureButton },
  methods: {
    moment,
    getOnDutyTime(value) {
      this.onDuty = value;
    },
    getOffDutyTime(value) {
      this.offDuty = value;
    },
    clickConfirm() {
      let data = {
        date: this.day.date,
        onDuty: this.onDuty.format("HH:mm"),
        offDuty: this.offDuty.format("HH:mm"),
        isDayOff: this.isEnabled,
        leaveType: this.leaveType,
        workType: "漁工", //在別頁
        workPattern: "", //在別頁
        firstDay: "2016-10-1", //在別頁
        // workingHours: "",
        // overtimeHours: 10,
        // overtimePay: 2000,
      };
      this.$store.commit("saveRecordingData", data);
    },
  },
  computed: {
    weekday() {
      const index = this.day.weekday;
      const dayList = {
        0: "星期日",
        1: "星期一",
        2: "星期二",
        3: "星期三",
        4: "星期四",
        5: "星期五",
        6: "星期六",
      };
      return dayList[index];
    },
    formateDate() {
      const dateList = this.day.date.split("-");
      const year = dateList[0];
      const month = dateList[1];
      const day = dateList[2];
      return `${year} ${month}月${day}日`;
    },
  },
  watch: {
    isEnabled: function () {
      if (this.isEnabled) {
        this.onDuty = moment("00:00", "HH:mm");
        this.offDuty = moment("00:00", "HH:mm");
        // console.log("moment object", this.onDuty, "format", this.onDuty.format("HH:mm"));
        // console.log("moment object", this.offDuty, "format", this.offDuty.format("HH:mm"));
      }
      this.leaveType = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-background {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 10;
}

.modal {
  padding: 19px 30px;
  width: 90%;
  max-width: 544px;
  background-color: #fff;
  margin: 0 auto;

  @include breakpoint.tablet {
    padding: 37px 48px 77px;
  }

  .close {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    margin-left: auto;
    border-radius: 50%;
    background-color: color.$gray;
    color: #fff;
  }

  .close:hover {
    cursor: pointer;
  }

  &-content {
    max-width: 336px;
    margin: 10px auto 0;
  }

  &-title {
    color: color.$primary-dark;
    @extend %content-title;
    width: fit-content;
    margin: 0 auto;
  }

  .day-off {
    label {
      margin-left: 16px;
      @extend %content-large;
    }

    input[type="checkbox"] {
      transform: scale(1.5);
    }

    select {
      @extend %content-small;
      width: 150px;

      @include breakpoint.tablet {
        width: 184px;
      }
    }
  }

  &-title ~ div {
    display: flex;
    align-items: center;
    margin-top: 24px;

    @include breakpoint.tablet {
      margin-top: 48px;
    }
  }

  &-title ~ div[class*="duty"] {
    border-bottom: 1px solid color.$gray;
  }

  &-title ~ div:not(.button-group) {
    justify-content: space-between;

    span {
      @extend %content-large-bold;
    }
  }

  .button-group {
    justify-content: center;
    gap: 28px;

    > * {
      width: 154px;
      height: 51px;
    }

    .confirm {
      background-color: color.$primary-dark;
    }

    .confirm:hover {
      background-color: color.$brown;
    }
  }
}
</style>
