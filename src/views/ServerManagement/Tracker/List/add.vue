<template>
  <div style="width:440px">
    <Form ref="form" :model="form" :rules="rule" :label-width="180">
      <FormItem :label="this.$t('Tracker') + this.$t('Type')" prop="type">
        <Select v-model.number="form.type">
          <Option :value="0">{{ this.$t("BTServer"), }}</Option>
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
      <FormItem label="IP" prop="ip">
        <Input v-model.trim="form.ip" @on-change="ipChange" />
      </FormItem>
      <FormItem
        :label="this.$t('ExtranetDom') + '/' + this.$t('IP')"
        prop="domain"
      >
        <Input v-model="form.domain" />
      </FormItem>
      <FormItem :label="this.$t('Region')" prop="area_code">
        <Select v-model.number="form.area_code" :disabled="disable">
          <Option v-for="item in Area" :value="item.Id" :key="item.Id">{{
            item.Name
          }}</Option>
        </Select>
      </FormItem>
      <FormItem :label="this.$t('Available')" prop="enable">
        <Select v-model.number="form.enable">
          <Option :value="1">{{ $t("Enable") }}</Option>
          <Option :value="0">{{ $t("Disabled") }}</Option>
        </Select>
      </FormItem>
      <FormItem
        :label="this.$t('Machine') + this.$t('Message')"
        prop="machine_info"
      >
        <Input
          v-model="form.machine_info"
          type="textarea"
          :rows="4"
          placeholder="请输入。。。"
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
import { getAllenabled, addbtTracker, getarea } from "@/api/server";
export default {
  name: "Trackeradd",
  data() {
    return {
      loading: false,
      form: {
        type: 1,
        line_type_id: "",
        ip: "",
        domain: "",
        area_code: "",
        enable: 1,
        machine_info: ""
      },
      rule: {
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
        domain: [
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
        area_code: [
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
      LineType: [],
      Area: [],
      disable: false
    };
  },
  created() {
    this.disable = true;
    Promise.all([getAllenabled(), getarea(0)]).then(
      resp => {
        this.LineType = resp[0].data.data;
        this.form.line_type_id = this.LineType[0] && this.LineType[0].id;
        this.Area = resp[1].data.data;
        this.form.area_code = this.Area[0] && this.Area[0].Id;
        this.disable = false;
      },
      () => {
        this.disable = false;
      }
    );
  },
  methods: {
    ipChange(e) {
      this.form.ip = e.target.value.replace(/(^\s*)|(\s*$)/g, "");
    },
    handleSubmit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          try {
            this.loading = true;
            await addbtTracker(this.form);
            this.$Message.success(this.$t("Add") + this.$t("Success"));
            this.$router.go(-1);
          } catch (error) {
            this.$Message.success(this.$t("Add") + this.$t("Failed"));
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
