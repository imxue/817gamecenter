<template>
  <div style="width:440px">
    <Form ref="form" :model="form" :rules="rule" :label-width="180">
      <FormItem label="ID" prop="id">
        <Input v-model="form.id" type="text" disabled></Input>
      </FormItem>

      <FormItem label="Tracker类型" prop="type">
        <Select v-model="form.type">
          <Option :value="1">1</Option>
          <Option :value="0">0</Option>
        </Select>
      </FormItem>
      <FormItem label="地区" prop="area_code">
        <Select v-model="form.area_code">
          <Option v-for="item in Area" :value="item.Id" :key="item.Id">{{
            item.Name
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="线路类型" prop="line_type_id">
        <Select v-model="form.line_type_id">
          <Option v-for="item in LineType" :value="item.id" :key="item.id">{{
            item.name
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="ip" prop="ip">
        <Input v-model="form.ip" type="text"> </Input>
      </FormItem>
      <FormItem label="外网域名/IP" prop="domain">
        <Input v-model="form.domain" type="text"> </Input>
      </FormItem>
      <FormItem label="版本" prop="version">
        <Input v-model="form.version" type="text"> </Input>
      </FormItem>
      <FormItem label="是否启用" prop="enable">
        <Select v-model="form.enable">
          <Option v-for="item in enableArray" :value="item.id" :key="item.id">{{
            item.name
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="机器信息" prop="machine_info">
        <Input
          v-model="form.machine_info"
          type="textarea"
          :rows="4"
          placeholder="Enter something..."
        />
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
          name: "启用"
        },
        {
          id: 0,
          name: "禁用"
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
          //   { type: 'number', message: 'Incorrect number format', trigger: 'blur',transform(value) {
          //       return Number(value)
          //   } }
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
    console.log(this.form);
    Promise.all([getLineType(), getBTServerGroup(), getarea()]).then(resp => {
      this.LineType = resp[0].data;
      this.ServerGroup = resp[1].data;
      this.Area = resp[2].data;
    });
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          try {
            this.loading = true;
            await editbtTracker(this.form);
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

<style lang="sass" scoped></style>
