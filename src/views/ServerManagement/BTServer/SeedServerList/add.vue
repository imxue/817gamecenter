<template>
  <div style="width:440px">
    <Form ref="form" :model="form" :rules="rule" :label-width="180">
      <FormItem label="IP" prop="ip">
        <Input v-model="form.ip" type="text"> </Input>
      </FormItem>
      <FormItem label="名称" prop="name">
        <Input v-model="form.name" type="text"> </Input>
      </FormItem>
      <FormItem label="是否允许做种" prop="enable">
        <Select v-model="form.enable">
          <Option :value="1">运行</Option>
          <Option :value="0">禁用</Option>
        </Select>
      </FormItem>
      <!-- <FormItem label="分组" prop="bt_server_group_id">
        <Select v-model="form.bt_server_group_id">
          <Option v-for="item in ServerGroup" :value="item.id" :key="item.id">{{
            item.name
          }}</Option>
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
      <FormItem label="最近心跳时间" prop="time">
            <Input v-model="form.ip" type="text"> </Input>
      </FormItem>
      <FormItem label="是否启用" prop="enable">
        <Select v-model="form.enable">
          <Option :value="1">启用</Option>
          <Option :value="0">禁用</Option>
        </Select>
      </FormItem>
      <FormItem label="异常数" prop="time">
            <Input v-model="form.ip" type="text"> </Input>
      </FormItem>
         <FormItem label="是否允许做种" prop="enable">
        <Select v-model="form.enable">
          <Option :value="1">运行</Option>
          <Option :value="0">禁用</Option>
        </Select>
      </FormItem> -->
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
  addDoSeedServer
} from "@/api/server";
export default {
  name: "SeedServerListadd",
  data() {
    return {
      loading: false,
      form: {
        ip: "",
        name: "",
        enable: "",
        area_code:1001
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

  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          try {
            this.loading = true;
            await addDoSeedServer(this.form);
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
