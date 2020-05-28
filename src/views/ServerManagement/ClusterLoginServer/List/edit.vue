<template>
  <div style="width:440px">
    <Form ref="form" :model="form" :rules="rule" :label-width="80">
      <FormItem :label="this.$t('Type')" prop="type">
        <Select v-model.number="form.type">
          <Option :value="0"
            >{{ this.$t("Cluster") }}{{ this.$t("Login")
            }}{{ this.$t("Server") }}</Option
          >
          <Option :value="1"
            >{{ this.$t("Cluster") }}{{ this.$t("Comm")
            }}{{ this.$t("Server") }}</Option
          >
          <Option :value="3"
            >{{ this.$t("Pierced") }}{{ this.$t("Comm") }}</Option
          >
          <Option :value="4"
            >{{ this.$t("Pierced") }}{{ this.$t("Login") }}</Option
          >
          <Option :value="5"
            >{{ this.$t("Upload") }}{{ this.$t("Dispatch") }}</Option
          >
          <Option :value="6"
            >{{ this.$t("Efficiency") }}{{ this.$t("Statistics") }}</Option
          >
          <Option :value="7"
            >{{ this.$t("Port") }}{{ this.$t("Detection") }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="IP" prop="server_ip">
        <Input type="text" v-model="form.server_ip"> </Input>
      </FormItem>
      <FormItem :label="this.$t('Port')" prop="port">
        <Input type="text" v-model.number="form.port"> </Input>
      </FormItem>
      <FormItem :label="this.$t('Line') + this.$t('Type')" prop="line_type_id">
        <Select v-model="form.line_type_id" :disabled="LineTypeable">
          <Option v-for="item in LineType" :value="item.id" :key="item.id">{{
            item.name
          }}</Option>
        </Select>
      </FormItem>
      <FormItem :label="this.$t('Available')" prop="status">
        <Select v-model.number="form.status">
          <Option :value="1">{{ $t("Enable") }}</Option>
          <Option :value="0">{{ $t("Disabled") }}</Option>
        </Select>
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
import { editClusterLginServer, getAllenabled } from "@/api/server";
export default {
  name: "addClusterLginServer",
  data() {
    return {
      LineTypeable: false,
      loading: false,
      form: {
        id: "",
        type: "",
        server_ip: "",
        port: "",
        line_type_id: "",
        status: ""
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
        server_ip: [
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
        line_type_id: [
          {
            required: true,
            message: this.$t("fne"),
            trigger: "blur"
          }
        ],
        status: [
          {
            required: true,
            type: "number",
            message: this.$t("fne"),
            trigger: "blur"
          }
        ]
      },
      LineType: []
    };
  },
  created() {
    for (let key in this.form) {
      this.form[key] = this.$route.query[0][key];
    }
    this.HandleGetLineType();
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          try {
            this.loading = true;
            await editClusterLginServer(this.form);
            this.$Message.success(this.$t("Edit") + this.$t("Success"));
            this.$router.go(-1);
          } catch (error) {
            this.$Message.success(this.$t("Edit") + this.$t("Failed"));
          } finally {
            this.loading = false;
          }
        }
      });
    },
    async HandleGetLineType() {
      this.LineTypeable = true;
      try {
        let resp = await getAllenabled();
        this.LineType = resp.data.data;
      } catch (error) {
        this.$Message.success(
          this.$t("Get") + this.$t("Line") + this.$t("Type") + this.$t("Failed")
        );
      } finally {
        this.LineTypeable = false;
      }
    },
    handleRetrun() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="sass" scoped></style>
