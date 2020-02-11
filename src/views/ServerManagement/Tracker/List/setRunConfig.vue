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
          <FormItem label="Tracker类型" prop="type">
            <Select v-model="form.type" disabled>
              <Option :value="1">主Bt</Option>
              <Option :value="0">Bt</Option>
            </Select>
          </FormItem>
          <FormItem label="线路类型" prop="line_type_id">
            <Select v-model="form.line_type_id" disabled>
              <Option
                v-for="item in LineType"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
          </FormItem>
          <FormItem label="IP" prop="ip">
            <Input v-model="form.ip" type="text" disabled> </Input>
          </FormItem>
          <FormItem label="外网域名/IP" prop="domain">
            <Input v-model="form.domain" type="text" disabled> </Input>
          </FormItem>
          <FormItem label="是否启用" prop="enable">
            <Select v-model="form.enable" disabled>
              <Option :value="1">启用</Option>
              <Option :value="0">禁用</Option>
            </Select>
          </FormItem>
          <FormItem label="机器信息" prop="machine_info">
            <Input v-model="form.machine_info" type="textarea" disabled>
            </Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="是否允许匿名登录" prop="allow_anoymous_login">
            <Select v-model="form.allow_anoymous_login">
              <Option :value= 1 >允许</Option>
              <Option :value= 0 >禁用</Option>
            </Select>
          </FormItem>
          <FormItem label="全局最大连接数" prop="global_max_peer">
            <Input v-model="form.global_max_peer" type="number"> </Input>
          </FormItem>
          <FormItem label="单个任务最大连接数" prop="per_mission_max_peer">
            <Input v-model="form.per_mission_max_peer" type="number"> </Input>
          </FormItem>
          <FormItem
            label="同步允许配置时间间隔"
            prop="sync_config_time_interval"
          >
            <Input v-model="form.sync_config_time_interval" type="number">
            </Input>
          </FormItem>
          <FormItem label="上次状态时间间隔" prop="upload_state_time_interval">
            <Input v-model="form.upload_state_time_interval" type="number">
            </Input>
          </FormItem>
          <FormItem label="单次请求返回的最大Peer数目" prop="enable">
            <Input v-model="form.ip" type="number"> </Input>
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
        server_id: "",
        ip: "",
        type: "",
        domain: "",
        enable: "",
        allow_anoymous_login: 1,
        global_max_peer: 0,
        per_mission_max_peer: 0,
        sync_config_time_interval: 0,
        upload_state_time_interval: 0,
        machine_info: ""
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
    for (let item in this.form) {
      this.form[item] = this.$route.query[0][item] || 1;
    }
    this.form.server_id = this.$route.query[0].id
    Promise.all([getLineType(), getBTServerGroup(), getarea()]).then(resp => {
      this.LineType = resp[0].data;
      this.form.line_type_id = this.LineType[0] && this.LineType[0].id;
      this.ServerGroup = resp[1].data;
      this.form.bt_server_group_id =
        this.ServerGroup[0] && this.ServerGroup[1].id;
      this.Area = resp[2].data;
    });
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          try {
            this.loading = true;
            await setRunConfig(this.form);
            this.$Message.success('设置成功');
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
