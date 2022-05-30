<template>
  <main>
    <section>
      <div class="auth-form">
        <h1>被偷走的移工薪資</h1>
        <!-- <p>使用者{{ $store.state.userID }}</p> -->
        <p>選擇登入方式</p>
        <!-- isLogin:{{ $store.getters.isLogIn }} -->
        <!-- <router-link :to="{ name: 'Info' }"> -->
        <!-- <LoginButton @click="logInGoogle">
          <template #logoImg><img src="@/assets/images/google-logo.png" alt="google-logo" /></template>
          <template #logoName>Google</template>
        </LoginButton> -->
        <!-- </router-link> -->
        <!-- <LoginButton @click="logInFacebook">
          <template #logoImg><img src="@/assets/images/facebook-logo.png" alt="facebook-logo" /></template>
          <template #logoName>FaceBook</template>
        </LoginButton> -->
        <LoginButton @click="loginGuest">
          <template #logoImg><img src="@/assets/images/avatar.png" alt="guest-logo" /></template>
          <template #logoName>訪客登入</template>
        </LoginButton>
      </div>
    </section>
    <section>
      <div class="wrap_img">
        <img src="../assets/images/home-illustration.svg" alt="login" />
      </div>
    </section>
  </main>
</template>
<script>
import LoginButton from "../components/LoginButton.vue";
export default {
  name: "Login",
  components: { LoginButton },
  data() {
    return {};
  },
  created() {},
  computed: {
    isLogin() {
      return this.$store.state.islogIn;
    },
  },
  methods: {
    async logInFacebook() {
      //非同步 是promise物件
      // console.log(this.$store.dispatch("logInFacebook"));
      await this.$store.dispatch("logInFacebook");
      if (this.$store.state.islogIn) {
        console.log("前往下一頁");
        this.$router.push({ name: "Info" });
      } else {
        console.log("停留在此頁");
      }
    },
    loginGuest() {
      this.$router.push({ name: "Info" });
    },
    logInGoogle() {
      this.$router.push({ name: "Info" });
    },
  },
};
</script>
<style scoped lang="scss">
// * {
//   outline: 1px solid red;
// }
h1 {
  margin-bottom: 60px;
  @extend %home-title;
}

main {
  height: 100vh;
  @include breakpoint.tablet {
    display: flex;
    section {
      flex: 0 1 50%;
    }
  }
  section:first-child {
    padding-top: 10%;
  }
  section:nth-child(2) {
    display: flex;
    background: color.$background;
    .wrap_img {
      align-self: flex-end;
      flex-grow: 1;
    }
  }
}

img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  vertical-align: top;
}
.auth-form {
  width: fit-content;
  margin: 0 auto;
  a {
    display: block;
    margin: 0 auto 24px auto;
    width: fit-content;
  }
  > p {
    color: color.$gray;
    font-weight: 900;
    margin-bottom: 60px;
    @extend %home-subtitle;
  }
}
</style>
