<template>
  <div style="width:440px">
    <Form ref="form" :model="form" :rules="rule" :label-width="80">
      <FormItem label="类型" prop="type">
       <Select v-model.number="form.type">
          <Option :value=1>1</Option>
          <Option :value=0>0</Option>
        </Select>
      </FormItem>
      <FormItem label="IP" prop="server_ip">
        <Input type="text" v-model="form.server_ip"> </Input>
      </FormItem>
      <FormItem label="端口" prop="port">
        <Input type="text" v-model.number="form.port"> </Input>
      </FormItem>
      <FormItem label="线路类型" prop="line_type_id">
        <Select v-model="form.line_type_id">
          <Option v-for="item in LineType" :value="item.id" :key="item.id">{{
            item.name
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="是否启用" prop="enable">
        <Select v-model="form.enable">
          <Option :value="1">启用</Option>
          <Option :value="0">禁用</Option>
        </Select>
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
import { addClusterLginServer, getLineType } from "@/api/server";
export default {
  name: "addClusterLginServer",
  data() {
    return {
      loading: false,
      form: {
        type: "",
        server_ip: "",
        port: "",
        line_type_id: "",
        enable: ""
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
      LineType: []
    };
  },
  created() {
    this.HandleGetLineType();
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          try {
            this.loading = true;
            await addClusterLginServer(this.form);
          } catch (error) {
            console.log(error);
          } finally {
            this.loading = false;
          }
        }
      });
    },
    async HandleGetLineType() {
      try {
        let resp = await getLineType();
        this.LineType = resp.data;
      } catch (error) {
        console.log(error);
      }
    },
    handleRetrun() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="sass" scoped></style>
