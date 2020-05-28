<template>
  <div style="width:440px">
    <Form ref="form" :model="form" :rules="rule" :label-width="180">
      <FormItem
        :label="this.$t('BT') + this.$t('Server') + this.$t('Type')"
        prop="type"
      >
        <Select v-model.number="form.type">
          <Option :value="1"
            >{{ $t("Not") }}{{ $t("Seeding") }}{{ $t("Server") }}</Option
          >
          <Option :value="0">{{ $t("Seeding") }}{{ $t("Server") }}</Option>
        </Select>
      </FormItem>
      <FormItem :label="this.$t('Group')" prop="bt_server_group_id">
        <Select v-model="form.bt_server_group_id" :disabled="disabled">
          <Option v-for="item in ServerGroup" :value="item.id" :key="item.id">{{
            item.name
          }}</Option>
        </Select>
      </FormItem>
      <FormItem :label="this.$t('Region')" prop="area_code">
        <Select v-model="form.area_code" :disabled="disabled">
          <Option v-for="item in Area" :value="item.Id" :key="item.Id">{{
            item.Name
          }}</Option>
        </Select>
      </FormItem>
      <FormItem :label="this.$t('Line') + this.$t('Type')" prop="line_type_id">
        <Select v-model="form.line_type_id" :disabled="disabled">
          <Option v-for="item in LineType" :value="item.id" :key="item.id">{{
            item.name
          }}</Option>
        </Select>
      </FormItem>
      <FormItem :label="this.$t('IP')" prop="ip">
        <Row>
          <Col span="17">
            <Input v-model="form.ip" placeholder="ip" type="text" />
          </Col>
          <Col span="7">
            <Input v-model.number="form.port" type="text" />
          </Col>
        </Row>
      </FormItem>
      <FormItem :label="this.$t('Available')" prop="enable">
        <Select v-model.number="form.enable">
          <Option :value="1">{{ $t("Enable") }}</Option>
          <Option :value="0">{{ $t("Disabled") }}</Option>
        </Select>
      </FormItem>
      <FormItem :label="this.$t('Remarks')" prop="comments">
        <Input
          v-model="form.comments"
          type="textarea"
          :rows="4"
          :placeholder="this.$t('addComment')"
        />
      </FormItem>
      <FormItem>
        <div style="display:flex;">
          <Button
            :loading="loading"
            type="primary"
            @click="handleSubmit('form')"
            >{{ this.$t("Save") }}</Button
          >
          <div style="marginLeft:40px;">
            <Button
              type="primary"
              :disabled="loading"
              @click="handleRetrun()"
              >{{ this.$t("Back") }}</Button
            >
          </div>
        </div>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import {
  getAllenabled,
  getAllBtServerGroupenabled,
  addBTServer,
  getarea
} from "@/api/server";
export default {
  name: "ListIndexadd",
  data() {
    return {
      loading: false,
      form: {
        type: 0,
        line_type_id: "",
        area_code: "",
        bt_server_group_id: "",
        ip: "",
        port: 80,
        enable: 1,
        comments: ""
      },
      rule: {
        ip: [
          {
            required: true,
            message: this.$t("Ipnb"),
            trigger: "blur"
          }
        ],
        bt_server_group_id: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        area_code: [
          {
            required: true,
            type: "number",
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        line_type_id: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            type: "number",
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ]
      },
      ServerGroup: [],
      LineType: [],
      Area: [],
      disabled: false
    };
  },
  created() {
    this.disabled = true;
    Promise.all([
      getAllenabled(),
      getAllBtServerGroupenabled(),
      getarea()
    ]).then(resp => {
      this.LineType = resp[0].data.data;
      this.form.line_type_id = this.LineType[0] && this.LineType[0].id;
      this.ServerGroup = resp[1].data.data;
      this.form.bt_server_group_id =
        this.ServerGroup[0] && this.ServerGroup[0].id;
      this.Area = resp[2].data.data;
      this.form.area_code = this.Area[0].Id;
      this.disabled = false;
    });
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          try {
            this.loading = true;
            await addBTServer(this.form);
            this.$router.go(-1);
            this.$Message.success(this.$t("Creeat") + this.$t("Success"));
          } catch (error) {
            this.$Message.success(this.$t("Creeat") + this.$t("Failed"));
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

<style lang="sass" scoped></style>
