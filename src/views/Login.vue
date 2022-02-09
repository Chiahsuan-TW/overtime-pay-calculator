<template>
  <main>
    <section>
      <div class="auth-form">
        <h1>被偷走的移工薪資</h1>
        <p>選擇登入方式</p>
        <router-link :to="{ name: 'Layout' }">Google</router-link>
        <a>FaceBook</a>
        <a>訪客登入</a>
      </div>
    </section>
    <section>
      <img src="../assets/images/home-illustration.svg" alt="" />
    </section>
  </main>
</template>
<script></script>
<style scoped lang="scss">
* {
  outline: 1px solid red;
}
main {
  display: flex;
  section {
    flex: 0 1 50%;
  }
}
main section:first-child {
  padding-top: 10%;
}
main p:nth-child(2) {
  font-weight: 900;
  color: color.$gray;
}
a {
  display: block;
  width: 331px;
  background: color.$primary-dark;
  color: #fff;
  font-weight: 900;
  &:hover {
    background: color.$primary-light;
  }
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.auth-form {
  width: fit-content;
  margin: 0 auto;
}
</style>
