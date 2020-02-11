<template>
  <div style="width:440px">
    <Form ref="form" :model="form" :rules="rule" :label-width="80">
      <FormItem label="线路名称" prop="name">
        <Input type="text" v-model="form.name" > </Input>
      </FormItem>
      <FormItem label="状态" prop="enable">
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
            <Button
              type="primary"
              :disabled="loading"
              @click="handleRetrun()"
              >返回</Button
            >
          </div>
        </div>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { addLineType } from "@/api/server";
export default {
  name: "LineTypeadd",
  data() {
    return {
      loading: false,
      form: {
        name: "",
        enable: 1
      },
      rule: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          try {
            this.loading = true;
            await addLineType(this.form);
          } catch (error) {
            console.log(error);
          } finally {
            this.loading = false;
          }
        }
      });
    },
    handleRetrun() {
        this.$router.go(-1)
    }
  }
};
</script>

<style lang="sass" scoped></style>
