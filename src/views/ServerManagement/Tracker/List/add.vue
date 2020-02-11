<template>
  <div style="width:440px">
    <Form ref="form" :model="form" :rules="rule" :label-width="180">
      <FormItem label="Tracker类型" prop="type">
        <Select v-model="form.type">
          <Option :value="1">主Bt</Option>
          <Option :value="0">Bt</Option>
        </Select>
      </FormItem>
      <FormItem label="线路类型" prop="line_type_id">
        <Select v-model="form.line_type_id">
          <Option v-for="item in LineType" :value="item.id" :key="item.id">{{
            item.name
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="IP" prop="ip">
        <Input v-model="form.ip" />
      </FormItem>
      <FormItem label="外网域名/IP" prop="domain">
        <Input v-model="form.domain" />
      </FormItem>
           <FormItem label="地区" prop="area_code">
        <Select v-model="form.area_code">
          <Option v-for="item in Area" :value="item.Id" :key="item.Id">{{
            item.Name
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="是否启用" prop="enable">
        <Select v-model="form.enable">
          <Option :value="1">启用</Option>
          <Option :value="0">禁用</Option>
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
import { getLineType, addbtTracker,getarea } from "@/api/server";
export default {
  name: "Trackeradd",
  data() {
    return {
      loading: false,
      form: {
        type: "",
        line_type_id: "",
        ip: "",
        domain: "",
        area_code:"",
        enable: 1,
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
      LineType: [],
      Area:[]
    };
  },
  created() {
    Promise.all([getLineType(),getarea(0)]).then(resp => {
      this.LineType = resp[0].data;
      this.form.line_type_id = this.LineType[0] && this.LineType[0].id;
      this.Area = resp[1].data;
      this.form.area_code = this.Area[0] && this.Area[0].Id;
    });
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          try {
            this.loading = true;
            await addbtTracker(this.form);
             this.$Message.success('创建成功');
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
