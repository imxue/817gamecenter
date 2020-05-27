<template>
  <div style="width:500px;">
    <Form ref="form" :model="form" :rules="rule" :label-width="120">
      <FormItem prop="subtype_id" label="子分类">
        <Input type="text" v-model.number="form.subtype_id" />
      </FormItem>
      <FormItem prop="name" label="分类名称">
        <Input type="text" v-model="form.name" />
      </FormItem>
      <FormItem prop="default_download_dir" label="默认下载路径">
        <Input type="text" v-model="form.default_download_dir" />
      </FormItem>
      <FormItem prop="is_console_display" label="在控制台显示">
        <Select v-model="form.is_console_display">
          <Option :value="1">启用</Option>
          <Option :value="0">禁用</Option>
        </Select>
      </FormItem>
      <FormItem prop="display_name" label="显示名称">
        <Input type="text" v-model="form.display_name" />
      </FormItem>
      <FormItem prop="enable" label="是否启用">
        <Select v-model="form.enable">
          <Option :value="1">启用</Option>
          <Option :value="0">禁用</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('form')">保存</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import { editGameType } from "@/api/server";
export default {
  name: "",
  data() {
    return {
      form: {
        id: "",
        subtype_id: "",
        name: "",
        default_download_dir: "",
        is_console_display: 1,
        display_name: "",
        enable: 1
      },
      rule: {
        subtype_id: [
          {
            required: true,
            type: "number",
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        description: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        status: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    for (let item in this.form) {
      this.form[item] = this.$route.query[0][item] || "";
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          try {
            this.loading = true;
            await editGameType(this.form);
          } catch (error) {
            this.$Message.error(error);
          } finally {
            this.loading = false;
          }
        }
      });
    }
  }
};
</script>
