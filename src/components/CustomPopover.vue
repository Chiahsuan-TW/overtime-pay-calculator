<template>
  <a-button type="primary" @click="showModal" class="complete-button"
    >輸出</a-button
  >
  <a-modal
    v-model:visible="isVisible"
    title="輸出選項"
    @ok="handleOk"
    :confirmLoading="isConfirmLoading"
  >
    <p @click="clickPDF">PDF</p>
    <p>E-mail</p>
  </a-modal>
</template>
<script>
import { ref } from "vue";
export default {
  emits: ["openPDF"],
  setup(_props, { emit }) {
    const isVisible = ref(false);
    const isConfirmLoading = ref(false);
    const showModal = () => {
      isVisible.value = true;
    };

    const handleOk = (_e) => {
      isConfirmLoading.value = true;
      setTimeout(() => {
        isVisible.value = false;
        isConfirmLoading.value = false;
      }, 1000);
    };
    const clickPDF = () => {
      isVisible.value = false;
      setTimeout(() => {
        emit("openPDF");
      }, 1000);
    };

    return {
      isConfirmLoading,
      isVisible,
      showModal,
      handleOk,
      clickPDF,
    };
  },
};
</script>
<style scoped lang="scss">
.complete-button {
  border: 0;
  font-size: 20px;
  font-weight: bold;

  vertical-align: bottom;
  height: 51px;
  width: 172px;
  background-color: color.$primary-dark;
  &:hover {
    background-color: color.$brown;
  }
}
</style>
