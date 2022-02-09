<template>
  <main>
    <section>
      <div class="auth-form">
        <h1>被偷走的移工薪資</h1>
        <p>選擇登入方式</p>
        <router-link :to="{ name: 'Layout' }">
          <div class="logo">
            <img src="../assets/images/google-logo.png" alt="google-logo" />
          </div>

          <p>Google</p>
        </router-link>
        <a
          ><div class="logo">
            <img src="../assets/images/facebook-logo.png" alt="google-logo" />
          </div>
          <p>Facebook</p></a
        >
        <a
          ><div class="logo">
            <img src="../assets/images/avatar.png" alt="guest -logo" />
          </div>
          <p>訪客登入</p></a
        >
      </div>
    </section>
    <section>
      <div class="wrap_img">
        <img src="../assets/images/home-illustration.svg" alt="login" />
      </div>
    </section>
  </main>
</template>
<script></script>
<style scoped lang="scss">
* {
  // outline: 1px solid red;
}
h1 {
  margin-bottom: 60px;
  font-size: 30px;
  @include breakpoint.tablet {
    font-size: 45px;
  }
  @include breakpoint.desktop {
    font-size: 60px;
  }
}

main {
  height: 100vh;
  @include breakpoint.tablet {
    display: flex;
    section {
      flex: 0 1 50%;
    }
  }
}
main section:first-child {
  padding-top: 10%;
}
main section:nth-child(2) {
  display: flex;
  background: color.$background;
  .wrap_img {
    align-self: flex-end;
    flex-grow: 1;
  }
}

a {
  display: block;
  width: 200px;
  background: color.$primary-dark;
  color: #fff;
  font-weight: 900;
  padding: 17px;
  display: flex;
  gap: 11px;
  margin-bottom: 24px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  &:hover {
    background: color.$primary-light;
  }
  @include breakpoint.tablet {
    width: 331px;
  }
}
img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.auth-form {
  width: fit-content;
  margin: 0 auto;
  > p {
    color: color.$gray;
    font-weight: 900;
    margin-bottom: 60px;
    font-size: 24px;
    @include breakpoint.desktop {
      font-size: 32pxpx;
    }
  }
}
.logo {
  width: 38px;
  height: 38px;
  img {
    width: 100%;
  }
}
</style>
