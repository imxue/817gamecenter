<template>
  <div>
    <Form ref="form" :model="form" :rules="rules">
      <FormItem prop="account" :label="this.$t('Account')">
        <Input
          type="text"
          v-model="form.account"
          :placeholder="this.$t('Account')"
          size="large"
          @on-enter="handleSubmit('form')"
        >
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password" :label="this.$t('PassWord')">
        <Input
          size="large"
          type="password"
          v-model="form.password"
          :placeholder="this.$t('PassWord')"
          @on-enter="handleSubmit('form')"
        >
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button
          size="large"
          long
          type="primary"
          @click="handleSubmit('form')"
          >{{ $t("Login") }}</Button
        >
      </FormItem>
    </Form>
    <!-- <div class="tip">
      <router-link to="forgetPassword">
        忘记密码？
      </router-link>
      <p>尚未拥有账户？<router-link to="/User/regist"> 去注册 </router-link></p>
    </div> -->
  </div>
</template>

<script>
import { login } from "@/api/user";
import md5 from "blueimp-md5";
export default {
  data() {
    return {
      form: {
        account: "",
        password: ""
      },
      rules: {
        account: [
          {
            required: true,
            message: this.$t("fne"),
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: this.$t("fne"),
            trigger: "blur"
          },
          {
            type: "string",
            message: "The password length cannot be less than 6 bits",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          try {
            this.form.password = md5(this.form.password);
            let resp = await login(this.form);
            localStorage.setItem("gamecenterToken", resp.data.token);
            this.$router.push("/");
          } catch (error) {
            this.$Message.error("登录失败，请检查账号或密码");
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.tip {
  text-align: center;
  margin: 32px 0 16px;
}
</style>
