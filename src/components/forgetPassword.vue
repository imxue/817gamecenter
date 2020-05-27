<template>
  <div>
    <Form ref="form" :model="form" :rules="rules">
      <FormItem prop="user">
        <Input
          type="text"
          v-model="form.account"
          placeholder="用户名"
          size="large"
        >
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button size="large" long type="primary" @click="handleSubmit('form')"
          >登录</Button
        >
      </FormItem>
    </Form>

    <div class="tip">
      <router-link to="login">
        返回登录？
      </router-link>
      <p>
        尚未拥有账户？ <router-link to="/User/regist"> 去注册 </router-link>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "forgetPassword",
  data() {
    return {
      form: {
        account: " "
      },
      rules: {
        account: [
          {
            required: true,
            message: "Please fill in the user name",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Please fill in the password.",
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
  }
};
</script>

<style lang="scss" scoped>
.tip {
  text-align: center;
  margin: 32px 0 16px;
}
</style>
