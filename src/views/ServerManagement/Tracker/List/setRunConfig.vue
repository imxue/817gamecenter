<template>
  <div class="RunContainer">
    <Form
      ref="form"
      :model="form"
      :rules="rule"
      :label-width="220"
      label-colon
      label-position="right"
    >
      <Row :gutter="16">
        <Col span="12">
          <FormItem :label="this.$t('Tracker') + this.$t('Type')" prop="type">
            <Select v-model="form.type" disabled>
              <Option :value="0">{{ this.$t("BTServer") }}</Option>
              <Option :value="1">{{ this.$t("BTClient") }}</Option>
            </Select>
          </FormItem>
          <FormItem
            :label="this.$t('Line') + this.$t('Type')"
            prop="line_type_id"
          >
            <!-- <Select v-model="form.line_type" disabled>
              <Option
                v-for="item in LineType"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select> -->
            <Input v-model="form.line_type" type="text" disabled> </Input>
          </FormItem>
          <FormItem label="IP" prop="ip">
            <Input v-model="form.ip" type="text" disabled> </Input>
          </FormItem>
          <FormItem
            :label="this.$t('ExtranetDom') + '/' + this.$t('IP')"
            prop="domain"
          >
            <Input v-model="form.domain" type="text" disabled> </Input>
          </FormItem>
          <FormItem :label="this.$t('Available')" prop="enable">
            <Select v-model="form.enable" disabled>
              <Option :value="1">{{ this.$t("Enable") }}</Option>
              <Option :value="0">{{ this.$t("Disabled") }}</Option>
            </Select>
          </FormItem>
          <FormItem
            :label="this.$t('Machine') + this.$t('Message')"
            prop="machine_info"
          >
            <Input v-model="form.machine_info" type="textarea" disabled>
            </Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem
            :label="this.$t('Allow') + this.$t('Anonymous') + this.$t('Login')"
            prop="allow_anoymous_login"
          >
            <Select
              v-model.number="form.allow_anoymous_login"
              :disabled="disabled"
            >
              <Option :value="1">{{ $t("Allow") }}</Option>
              <Option :value="0">{{ $t("Disabled") }}</Option>
            </Select>
          </FormItem>
          <FormItem
            :label="this.$t('Global') + this.$t('Max') + this.$t('Connections')"
            prop="global_max_peer"
          >
            <Input
              v-model.number="form.global_max_peer"
              type="text"
              :disabled="disabled"
            >
            </Input>
          </FormItem>
          <FormItem
            :label="this.$t('Per') + this.$t('Task') + this.$t('Connections')"
            prop="per_mission_max_peer"
          >
            <Input
              v-model.number="form.per_mission_max_peer"
              type="text"
              :disabled="disabled"
            >
            </Input>
          </FormItem>
          <FormItem
            :label="
              this.$t('Per') +
                this.$t('Request') +
                this.$t('Max') +
                this.$t('Connections')
            "
            prop="per_req_return_peer"
          >
            <Input
              v-model.number="form.per_req_return_peer"
              type="text"
              :disabled="disabled"
            />
          </FormItem>
          <FormItem
            :label="
              this.$t('Sync') +
                this.$t('Allow') +
                this.$t('Config') +
                this.$t('interval')
            "
            prop="sync_config_time_interval"
          >
            <Input
              v-model.number="form.sync_config_time_interval"
              type="text"
              :disabled="disabled"
            >
              <span slot="append">{{ $t("Sec") }}</span>
            </Input>
          </FormItem>
          <FormItem
            :label="this.$t('Last') + this.$t('Status') + this.$t('interval')"
            prop="upload_state_time_interval"
          >
            <Input
              v-model.number="form.upload_state_time_interval"
              type="text"
              :disabled="disabled"
            >
              <span slot="append">{{ $t("Sec") }}</span>
            </Input>
          </FormItem>
        </Col>
      </Row>

      <FormItem>
        <div style="display:flex;">
          <Button
            :loading="loading"
            type="primary"
            @click="handleSubmit('form')"
            >{{ $t("Save") }}</Button
          >
          <div style="marginLeft:40px;">
            <Button
              type="primary"
              :disabled="loading"
              @click="handleRetrun()"
              >{{ $t("Back") }}</Button
            >
          </div>
        </div>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { setBtTrickRunConfig, getBtTrackerRunConfig } from "@/api/server";
export default {
  name: "setRunConfig",
  data() {
    return {
      loading: false,
      disabled: false,
      form: {
        server_id: "",
        line_type: "",
        ip: "",
        type: "",
        domain: "",
        enable: "",
        allow_anoymous_login: "",
        global_max_peer: "",
        per_mission_max_peer: "",
        per_req_return_peer: "",
        sync_config_time_interval: "",
        upload_state_time_interval: "",
        machine_info: ""
      },
      rule: {
        allow_anoymous_login: [
          {
            required: true,
            type: "number",
            message: this.$t("fne"),
            trigger: "blur"
          }
        ],
        global_max_peer: [
          {
            required: true,
            type: "number",
            message: this.$t("fne"),
            trigger: "blur"
          }
        ],
        per_mission_max_peer: [
          {
            required: true,
            type: "number",
            message: this.$t("fne"),
            trigger: "blur"
          }
        ],
        per_req_return_peer: [
          {
            required: true,
            type: "number",
            message: this.$t("fne"),
            trigger: "blur"
          }
        ],
        sync_config_time_interval: [
          {
            required: true,
            type: "number",
            message: this.$t("fne"),
            trigger: "blur"
          }
        ],
        upload_state_time_interval: [
          {
            required: true,
            type: "number",
            message: this.$t("fne"),
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
      this.form[item] = this.$route.query[0][item];
    }
    this.handleGetData(this.$route.query[0].id);
    this.form.server_id = this.$route.query[0].id;
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          try {
            this.loading = true;
            await setBtTrickRunConfig(this.form);
            this.$Message.success(this.$t("Set") + this.$t("Success"));
            this.$router.go(-1);
          } catch (error) {
            this.$Message.success(this.$t("Set") + this.$t("Failed"));
          } finally {
            this.loading = false;
          }
        }
      });
    },
    async handleGetData(id) {
      let idx = id;
      this.disabled = true;
      try {
        let resp = await getBtTrackerRunConfig(id);
        this.form.global_max_peer = resp.data.data.global_max_peer;
        this.form.per_mission_max_peer = resp.data.data.per_mission_max_peer;
        this.form.per_req_return_peer = resp.data.data.per_req_return_peer;
        this.form.allow_anoymous_login = resp.data.data.allow_anoymous_login;
        this.form.sync_config_time_interval =
          resp.data.data.sync_config_time_interval;
        this.form.upload_state_time_interval =
          resp.data.data.upload_state_time_interval;
      } catch (error) {
        this.$Modal.confirm({
          title: this.$t("Message"),
          content: `${this.$t("Initialization")} ID:${idx} ${this.$t(
            "Server"
          )} ${this.$t("RunConfig")}`,
          onOk: () => {
            this.disabled = false;
          },
          onCancel: () => {
            this.$router.go(-1);
          }
        });
      } finally {
        this.disabled = false;
      }
    },
    handleRetrun() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.RunContainer {
  margin-left: 20px;
}
</style>
