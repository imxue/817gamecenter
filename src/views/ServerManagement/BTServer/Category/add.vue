<template>
  <div style="width:440px">
    <Form ref="form" :model="form" :rules="rule" :label-width="180">
      <FormItem label="BtServer类型" prop="type">
        <Select v-model="form.type">
          <Option :value="1">主Bt</Option>
          <Option :value="0">Bt</Option>
        </Select>
      </FormItem>
      <FormItem label="分组" prop="bt_server_group_id">
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
      <FormItem label="ip" prop="ip">
        <Row>
          <Col span="17">
            <Input v-model="form.ip" type="text"> </Input>
          </Col>
          <Col span="7">
            <Input v-model="form.port" type="text"> </Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="是否启用" prop="enable">
        <Select v-model="form.enable">
          <Option :value="1">启用</Option>
          <Option :value="0">禁用</Option>
        </Select>
      </FormItem>
      <FormItem label="备注" prop="comments">
        <Input
          v-model="form.comments"
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
  addBTServer,
  getarea
} from "@/api/server";
export default {
  name: "ListIndexadd",
  data() {
    return {
      loading: false,
      form: {
        type: "",
        line_type_id: "",
        area_code: 1001,
        bt_server_group_id: "",
        ip: "",
        port: 8080,
        enable: 1,
        comments: ""
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
    Promise.all([getLineType(), getBTServerGroup(), getarea()]).then(resp => {
      this.LineType = resp[0].data;
      this.form.line_type_id = this.LineType[0] && this.LineType[0].id;
      this.ServerGroup = resp[1].data;
      this.form.bt_server_group_id =
        this.ServerGroup[0] && this.ServerGroup[1].id;
      this.Area = resp[2].data;
      console.log(this.Area);
    });
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          try {
            this.loading = true;
            await addBTServer(this.form);
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
