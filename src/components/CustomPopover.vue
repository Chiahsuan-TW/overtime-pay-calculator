<template>
  <a-button type="primary" @click="showModal" class="complete-button"
    >輸入</a-button
  >
  <a-modal
    v-model:visible="isVisible"
    title="輸出選項"
    @ok="handleOk"
    :confirmLoading="isConfirmLoading"
  >
    <p>PDF</p>
    <p>E-mail</p>
  </a-modal>
</template>
<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
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
      }, "1000");
    };

    return {
      isConfirmLoading,
      isVisible,
      showModal,
      handleOk,
    };
  },
});
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
