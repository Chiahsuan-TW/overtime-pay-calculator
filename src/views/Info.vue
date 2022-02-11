<template>
  <h3>基本資料</h3>
  <div class="modal">
    <Stepper :currentStep="currentStep" />

    <div class="modal-content">
      <div class="modal-content-item">
        <Dropdown :optionList="workTypeList">工作類型</Dropdown>
      </div>

      <div class="modal-content-item">
        <Dropdown :optionList="workPatternList">工作型態</Dropdown>
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
        <input id="date" type="date" />
      </div>

      <router-link :to="{ name: 'MonthlyRecord' }">
        <ProcedureButton>下一步</ProcedureButton>
      </router-link>
    </div>
  </div>
</template>

<script>
import Dropdown from "../components/Dropdown.vue";
import Stepper from "../components/Stepper.vue";
import ProcedureButton from "../components/ProcedureButton.vue";

export default {
  name: "Info",
  components: {
    Dropdown,
    Stepper,
    ProcedureButton,
  },
  data() {
    return {
      workTypeList: ["廠工", "建築工", "看護", "漁工"],
      workPatternList: ["週休二日", "非週休二日"],
      minimumWage: "25250",
      wage: "",
      currentStep: 1,
    };
  },
  methods: {},
};
</script>

<style scoped lang="scss">
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
  }

  &-content {
    max-width: 330px;
    margin: 60px auto 0;
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
</style>
