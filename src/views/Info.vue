<template>
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
            type="text"
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
    </div>
  </div>
</template>

<script>
import Dropdown from "../components/Dropdown.vue";
import Stepper from "../components/Stepper.vue";

export default {
  name: "Info",
  components: {
    Dropdown,
    Stepper,
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
.modal {
  max-width: 1000px;
  background-color: #fff;
  box-shadow: 3px 6px 14px rgba(255, 153, 0, 0.11);
  border-radius: 16px;
  margin: 0 auto;
  padding: 40px 0;

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
    font-weight: normal;
    font-size: 20px;
  }

  input:focus {
    outline: none;
  }
  ::placeholder {
    font-weight: normal;
    font-size: 20px;
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
    font-weight: bold;
    font-size: 20px;
  }
}
</style>
