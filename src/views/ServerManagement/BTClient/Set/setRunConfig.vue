<template>
  <div class="RunClientContainer">
    <Form
      ref="form"
      :model="form"
      :rules="rule"
      :label-width="200"
      label-colon
      label-position="right"
    >
      <FormItem label="下载游戏列表时间间隔" prop="download_game_list_interval">
        <Input
          v-model="form.download_game_list_interval"
          placeholder="Enter something..."
        ></Input>
      </FormItem>
      <FormItem label="上报运行状态时间间隔" prop="upload_state_time_interval">
        <Input
          v-model="form.upload_state_time_interval"
          placeholder="Enter something..."
        ></Input>
      </FormItem>
      <FormItem
        label="同步运行配置状态时间间隔"
        prop="sync_config_time_interval"
      >
        <Input
          v-model="form.sync_config_time_interval"
          placeholder="Enter something..."
        ></Input>
      </FormItem>
      <FormItem label="运行匿名登录" prop="line_type_id">
        <Select v-model="form.allow_anoymous_login">
          <Option :value="1">运行</Option>
          <Option :value="0">禁止</Option>
        </Select>
      </FormItem>
      <FormItem>
        <div style="display:flex;">
          <Button
            :loading="loading"
            type="primary"
            @click="handleSubmit('form')"
            >保存</Button
          >
          <div style="marginLeft:40px;">
            <Button type="primary" :disabled="loading" @click="handleRetrun()"
              >返回</Button
            >
          </div>
        </div>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import {
  getLineType,
  getBTServerGroup,
  getarea,
  setRunConfig
} from "@/api/server";
export default {
  name: "setRunConfig",
  data() {
    return {
      loading: false,
      form: {
        download_game_list_interval: "",
        upload_state_time_interval: "",
        sync_config_time_interval: 1001,
        allow_anoymous_login: ""
      },
      rule: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ]
      },
      ServerGroup: [],
      LineType: [],
      Area: []
    };
  },
  created() {
    console.log(this.$route.query);
    Promise.all([getLineType(), getBTServerGroup(), getarea()]).then(resp => {
      this.LineType = resp[0].data;
      this.form.line_type_id = this.LineType[0] && this.LineType[0].id;
      this.ServerGroup = resp[1].data;
      this.form.bt_server_group_id =
        this.ServerGroup[0] && this.ServerGroup[1].id;
      this.Area = resp[2].data;
      console.log(this.Area);
    });
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          try {
            this.loading = true;
            await setRunConfig(this.form);
          } catch (error) {
            console.log(error);
          } finally {
            this.loading = false;
          }
        }
      });
    },
    handleRetrun() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.RunClientContainer {
  width: 500px;
  margin: 0 auto;
}
</style>
