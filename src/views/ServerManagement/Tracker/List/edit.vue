<template>
  <div style="width:440px">
    <Form ref="form" :model="form" :rules="rule" :label-width="180">
      <FormItem label="ID" prop="id">
        <Input v-model="form.id" type="text" disabled></Input>
      </FormItem>

      <FormItem :label="this.$t('Tracker') + this.$t('Type')" prop="type">
        <Select v-model.number="form.type">
          <Option :value="0">{{ this.$t("BTServer") }}</Option>
          <Option :value="1">{{ this.$t("BTClient") }}</Option>
        </Select>
      </FormItem>
      <FormItem :label="this.$t('Line') + this.$t('Type')" prop="line_type_id">
        <Select v-model="form.line_type_id" :disabled="disable">
          <Option v-for="item in LineType" :value="item.id" :key="item.id">{{
            item.name
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="ip" prop="ip">
        <Input v-model="form.ip" type="text" />
      </FormItem>
      <FormItem
        :label="this.$t('ExtranetDom') + '/' + this.$t('IP')"
        prop="domain"
      >
        <Input v-model="form.domain" type="text" />
      </FormItem>
      <FormItem :label="this.$t('Available')" prop="enable">
        <Select v-model="form.enable">
          <Option v-for="item in enableArray" :value="item.id" :key="item.id">{{
            item.name
          }}</Option>
        </Select>
      </FormItem>
      <FormItem
        :label="this.$t('Machine') + this.$t('Message')"
        prop="machine_info"
      >
        <Input
          v-model="form.machine_info"
          type="textarea"
          :rows="10"
          placeholder="请输入"
        />
      </FormItem>
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
  getAllenabled,
  getAllBtServerGroupenabled,
  editbtTracker
} from "@/api/server";
export default {
  name: "ListIndexadd",
  data() {
    return {
      loading: false,
      form: {
        id: "",
        type: "",
        line_type_id: "",
        area_code: "",
        bt_server_group_id: "",
        ip: "",
        enable: "",
        machine_info: "",
        version: "",
        domain: ""
      },
      enableArray: [
        {
          id: 1,
          name: this.$t("Enable")
        },
        {
          id: 0,
          name: this.$t("Disabled")
        }
      ],
      rule: {
        id: [
          {
            required: true,
            message: this.$t("fne"),
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            type: "number",
            message: this.$t("fne"),
            trigger: "blur"
          }
        ],
        line_type_id: [
          {
            required: true,
            message: this.$t("fne"),
            trigger: "blur"
          }
        ],
        bt_server_group_id: [
          {
            required: true,
            message: this.$t("fne"),
            trigger: "blur"
          }
        ],
        ip: [
          {
            required: true,
            message: this.$t("fne"),
            trigger: "blur"
          }
        ],
        port: [
          {
            required: true,
            type: "number",
            message: this.$t("fne"),
            trigger: "blur"
          }
        ],
        enable: [
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
      disable: false
    };
  },
  created() {
    this.disable = true;
    for (let item in this.form) {
      this.form[item] = this.$route.query[0][item];
    }
    this.form.enable = Number(this.form.enable);
    Promise.all([getAllenabled(), getAllBtServerGroupenabled()]).then(
      resp => {
        this.LineType = resp[0].data.data;
        this.ServerGroup = resp[1].data.data;
        this.disable = false;
      },
      () => {
        this.disable = false;
      }
    );
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          try {
            this.loading = true;
            await editbtTracker(this.form);
            this.$Message.success(this.$t("Edit") + this.$t("Success"));
            this.$router.go(-1);
          } catch (error) {
            this.$Message.error(this.$t("Edit") + this.$t("Failed"));
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
