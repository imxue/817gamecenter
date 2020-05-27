<template>
  <div style="max-width:900px">
    <Form
      ref="form"
      :model="form"
      :rules="rule"
      label-colon
      label-position="right"
    >
      <Row :gutter="24">
        <Col span="12">
          <FormItem
            :label="this.$t('BT') + this.$t('Server') + this.$t('Type')"
            prop="type"
          >
            <Input v-model="form2.type" type="text" disabled />
          </FormItem>
          <FormItem :label="this.$t('Group')" prop="bt_server_group">
            <Input v-model="form2.bt_server_group" type="text" disabled />
          </FormItem>
          <FormItem :label="this.$t('Region')" prop="area_name">
            <Input v-model="form2.area_name" type="text" disabled />
          </FormItem>
          <FormItem :label="this.$t('Line') + this.$t('Type')" prop="line_type">
            <Input v-model="form2.line_type" type="text" disabled />
          </FormItem>
          <FormItem :label="this.$t('IP')" prop="ip">
            <Input v-model="form2.ip" type="text" disabled>
              <span slot="append">{{ form2.port }}</span>
            </Input>
          </FormItem>
          <FormItem :label="this.$t('Available')" prop="enable">
            <Select v-model="form2.enable" disabled>
              <Option :value="1">{{ this.$t("Enable") }}</Option>
              <Option :value="0">{{ this.$t("Disable") }}</Option>
            </Select>
          </FormItem>
          <FormItem
            :label="
              this.$t('Lately') + this.$t('Exceptions') + this.$t('Message')
            "
            prop="last_heart_time"
          >
            <Input v-model="form2.last_heart_time" type="text" disabled />
          </FormItem>
          <FormItem :label="this.$t('Exceptions')" prop="except_count">
            <Input v-model="form2.except_count" type="text" disabled />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem
            :label="this.$t('Anonymous') + this.$t('Login')"
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
              :disabled="disabled"
              v-model.number="form.global_max_peer"
              :placeholder="
                this.$t('Global') + this.$t('Max') + this.$t('Connections')
              "
            />
          </FormItem>
          <FormItem
            :label="this.$t('Per') + this.$t('Task') + this.$t('Connections')"
            prop="per_mission_max_peer"
          >
            <Input
              :disabled="disabled"
              v-model.number="form.per_mission_max_peer"
              :placeholder="
                this.$t('Per') + this.$t('Task') + this.$t('Connections')
              "
            />
          </FormItem>
          <FormItem
            :label="
              this.$t('Global') +
                this.$t('Max') +
                this.$t('Download') +
                this.$t('Speed')
            "
            prop="global_max_dl_speed"
          >
            <Input
              :disabled="disabled"
              v-model.number="form.global_max_dl_speed"
              :placeholder="
                this.$t('Global') +
                  this.$t('Max') +
                  this.$t('Download') +
                  this.$t('Speed')
              "
            >
              <span slot="append">Kb/s</span>
            </Input>
          </FormItem>
          <FormItem
            :label="
              this.$t('Global') +
                this.$t('Max') +
                this.$t('Upstream') +
                this.$t('Speed')
            "
            prop="global_max_up_speed"
          >
            <Input
              :disabled="disabled"
              v-model.number="form.global_max_up_speed"
              :placeholder="
                this.$t('Global') +
                  this.$t('Max') +
                  this.$t('Upstream') +
                  this.$t('Speed')
              "
            >
              <span slot="append">Kb/s</span>
            </Input>
          </FormItem>
          <FormItem
            :label="
              this.$t('Sync') +
                this.$t('Game') +
                this.$t('Status') +
                this.$t('interval')
            "
            prop="sync_game_time_interval"
          >
            <Input
              :disabled="disabled"
              v-model.number="form.sync_game_time_interval"
              :placeholder="
                this.$t('Sync') +
                  this.$t('Game') +
                  this.$t('Status') +
                  this.$t('interval')
              "
            >
              <span slot="append">{{ $t("Sec") }}</span>
            </Input>
          </FormItem>
          <FormItem
            :label="
              this.$t('Sync') + this.$t('RunConfig') + this.$t('interval')
            "
            prop="sync_config_time_interval"
          >
            <Input
              :disabled="disabled"
              v-model.number="form.sync_config_time_interval"
              :placeholder="
                this.$t('Sync') + this.$t('RunConfig') + this.$t('interval')
              "
            >
              <span slot="append">{{ $t("Sec") }}</span>
            </Input>
          </FormItem>
          <FormItem
            :label="
              this.$t('Reporting') + this.$t('Status') + this.$t('interval')
            "
            prop="upload_state_time_interval"
          >
            <Input
              :disabled="disabled"
              v-model.number="form.upload_state_time_interval"
              :placeholder="
                this.$t('Reporting') + this.$t('Status') + this.$t('interval')
              "
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
import {
  getLineType,
  getBTServerGroup,
  getarea,
  setRunConfig,
  getbtServerRunConfig
} from "@/api/server";
import { parseTime } from "@/utils";
export default {
  name: "setRunConfig",
  data() {
    return {
      loading: false,
      disabled: false,
      form: {
        server_id: "",
        per_mission_max_peer: "",
        allow_anoymous_login: 1,
        global_max_peer: "",
        sync_game_time_interval: 120,
        sync_config_time_interval: 120,
        upload_state_time_interval: 60,
        global_max_dl_speed: "",
        global_max_up_speed: "",
        user_id: ""
      },
      form2: {
        type: 1,
        line_type: "",
        area_name: "",
        bt_server_group: "",
        ip: "",
        port: "",
        enable: "",
        last_heart_time: "",
        except_count: ""
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
        per_mission_max_peer: [
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
        global_max_dl_speed: [
          {
            required: true,
            type: "number",
            message: this.$t("fne"),
            trigger: "blur"
          }
        ],
        global_max_up_speed: [
          {
            required: true,
            type: "number",
            message: this.$t("fne"),
            trigger: "blur"
          }
        ],
        sync_game_time_interval: [
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
    let serverType = {
      0: this.$t("Seeding") + this.$t("Server"),
      1: this.$t("Not") + this.$t("Seeding") + this.$t("Server")
    };
    if (this.$route.query[0].id) {
      this.form.server_id = this.$route.query[0].id;
      this.handleGetData(this.$route.query[0].id);
    }
    for (const key in this.form2) {
      if (this.form2.hasOwnProperty(key)) {
        this.form2[key] = this.$route.query[0][key];
        this.form2.type = serverType[this.$route.query[0]["type"]];
        this.form2.last_heart_time = parseTime(
          this.$route.query[0]["last_heart_time"]
        );
      }
    }
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
      this.disabled = true;
      let idx = id;
      try {
        let resp = await getbtServerRunConfig(id);
        for (const key in this.form) {
          if (this.form.hasOwnProperty(key)) {
            this.form[key] = resp.data.data[key];
          }
        }
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
  // max-width: 1000px;
  // margin: 0 auto;
}
</style>
