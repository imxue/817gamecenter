<template>
  <div class="RunContainer">
    <Form
      ref="form"
      :model="form"
      :rules="rule"
      :label-width="200"
      label-colon
      label-position="right"
    >
      <Row :gutter="16">
        <Col span="12">
          <FormItem label="类型" prop="type">
            <Select v-model="form.type">
              <Option :value="1">主Bt</Option>
              <Option :value="0">Bt</Option>
            </Select>
          </FormItem>
              <FormItem label="线路类型" prop="type">
            <Select v-model="form.line_type_id">
              <Option v-for="item in LineType" :value="item.id" :key="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="外网域名/ip" prop="domain">
            <Input v-model="form.domain" type="text"> </Input>
          </FormItem>
          <FormItem label="端口" prop="port">
            <Input v-model.number="form.port" type="number"> </Input>
          </FormItem>
          <FormItem label="上传账号" prop="upload_account">
            <Input v-model="form.upload_account" type="text"> </Input>
          </FormItem>
          <FormItem label="上传密码" prop="upload_password">
            <Input v-model="form.upload_password" type="password"> </Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="下载账号" prop="download_account">
            <Input v-model="form.download_account" type="text"> </Input>
          </FormItem>
          <FormItem label="下载密码" prop="download_password">
            <Input v-model="form.download_password" type="password"> </Input>
          </FormItem>
          <FormItem label="种子文件存放路径" prop="seed_path">
            <Input v-model="form.seed_path" type="text"> </Input>
          </FormItem>
          <FormItem label="游戏配置文件存放路径" prop="game_path">
            <Input v-model="form.game_path" type="text"> </Input>
          </FormItem>
          <FormItem label="是否启用" prop="enable">
            <Select v-model="form.enable">
              <Option :value= 1>启用</Option>
              <Option :value= 0>禁用</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
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
import { addFtpServer,getLineType } from "@/api/server";
export default {
  name: "setRunConfig",
  data() {
    return {
      loading: false,
      form: {
        type: "",
        line_type_id: 0,
        domain: "",
        port: '',
        enable: 1,
        upload_account: "",
        upload_password: "",
        download_account: "",
        download_password: "",
        seed_path: "",
        game_path: ""
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
      LineType:[]
    };
  },
  created() {
    this.HandleGetLineType()
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          try {
            this.loading = true;
            await addFtpServer(this.form);
            this.$Message.success("设置成功");
            this.$router.go(-1);
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
    },
    async HandleGetLineType() {
      try {
      let resp = await getLineType()
      this.LineType = resp.data
      this.form.line_type_id = this.LineType[0].id
      } catch (error) {
        console.log(error)
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.RunContainer {
  max-width: 1000px;
  margin: 0 auto;
}
</style>
