<template>
  <div style="width:440px">
    <Form ref="form" :model="form" :rules="rule" :label-width="180">
      <FormItem label="ID" prop="id">
        <Input v-model="form.id" type="text" disabled></Input>
      </FormItem>
      <FormItem
        :label="this.$t('BT') + this.$t('Server') + this.$t('Type')"
        prop="type"
      >
        <Select v-model="form.type">
          <Option :value="1"
            >{{ $t("Not") }}{{ $t("Seeding") }}{{ $t("Server") }}</Option
          >
          <Option :value="0">{{ $t("Seeding") }}{{ $t("Server") }}</Option>
        </Select>
      </FormItem>
      <FormItem :label="this.$t('Group')" prop="bt_server_group_id">
        <Select v-model="form.bt_server_group_id">
          <Option v-for="item in ServerGroup" :value="item.id" :key="item.id">{{
            item.name
          }}</Option>
        </Select>
      </FormItem>
      <FormItem :label="this.$t('Region')" prop="area_code">
        <Select v-model="form.area_code">
          <Option v-for="item in Area" :value="item.Id" :key="item.Id">{{
            item.Name
          }}</Option>
        </Select>
      </FormItem>
      <FormItem :label="this.$t('Line') + this.$t('Type')" prop="line_type_id">
        <Select v-model="form.line_type_id">
          <Option v-for="item in LineType" :value="item.id" :key="item.id">{{
            item.name
          }}</Option>
        </Select>
      </FormItem>
      <FormItem :label="this.$t('IP')" prop="ip">
        <Row>
          <Col span="17">
            <Input v-model="form.ip" type="text"> </Input>
          </Col>
          <Col span="7">
            <Input v-model.number="form.port" type="text"> </Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem :label="this.$t('Available')" prop="enable">
        <Select v-model="form.enable">
          <Option v-for="item in enableArray" :value="item.id" :key="item.id">{{
            item.name
          }}</Option>
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
            >{{ this.$t("Save") }}
          </Button>
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
  editBTServer,
  getarea
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
        port: "",
        enable: "",
        comments: ""
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
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            type: "number",
            message: "The type cannot be empty",
            trigger: "blur"
          }
        ],
        line_type_id: [
          {
            required: true,
            message: "The line_type_id cannot be empty",
            trigger: "blur"
          }
        ],
        area_code: [
          {
            required: true,
            type: "number",
            message: "The area_code cannot be empty",
            trigger: "blur"
          }
        ],
        bt_server_group_id: [
          {
            required: true,
            message: "The bt_server_group_id cannot be empty",
            trigger: "blur"
          }
        ],
        ip: [
          {
            required: true,
            message: "The ip cannot be empty",
            trigger: "blur"
          }
        ],
        port: [
          {
            required: true,
            type: "number",
            message: "The port cannot be empty",
            trigger: "blur"
          }
        ],
        enable: [
          {
            required: true,
            type: "number",
            message: "The enable cannot be empty",
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
    this.form.enable = Number(this.form.enable);
    Promise.all([
      getAllenabled(),
      getAllBtServerGroupenabled(),
      getarea()
    ]).then(resp => {
      this.LineType = resp[0].data.data;
      this.ServerGroup = resp[1].data.data;
      this.Area = resp[2].data.data;
    });
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          try {
            this.loading = true;
            await editBTServer(this.form);
            this.$router.go(-1);
          } catch (error) {
            this.$Message.success(this.$t("Edit") + this.$t("Success"));
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
