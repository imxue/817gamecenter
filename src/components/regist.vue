<template>
  <div>
    111111111111111

    <div class="tip">
      <router-link to="login">
        返回登录？
      </router-link>
      <p>忘记密码<router-link to="forgetPassword"> 去找回 </router-link></p>
    </div>
  </div>
</template>
<script>
export default {
  name: "forgetPassword"
};
</script>

<style lang="scss" scoped>
.tip {
  text-align: center;
  margin: 32px 0 16px;
}
</style>
