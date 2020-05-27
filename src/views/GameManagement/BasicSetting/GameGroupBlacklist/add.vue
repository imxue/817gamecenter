<template>
  <div style="width:500px;">
    <Form ref="form" :model="form" :rules="rule" :label-width="120">
      <FormItem prop="is_console_display" label="游戏分组">
        <Select v-model="form.id">
          <Option :value="1" v-for="item in GameType" :key="item.id"
            >启用</Option
          >
        </Select>
      </FormItem>

      <FormItem prop="is_console_display" label="分组区域">
        <Select v-model="form.id">
          <Option :value="1" v-for="item in GameType" :key="item.id"
            >启用</Option
          >
        </Select>
      </FormItem>

      <FormItem>
        <Button type="primary" @click="handleSubmit('form')">保存</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import { addGameblacklist, getGameType } from "@/api/server";
export default {
  name: "",
  data() {
    return {
      form: {
        area_code: 1001,
        center_id: 100001,
        enable: 1,
        operator: "test"
      },
      GameType: [],
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
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          try {
            this.loading = true;
            await addGameblacklist(this.form);
          } catch (error) {
          } finally {
            this.loading = false;
          }
        }
      });
    },
    async HandleGetGameGroup() {
      try {
        let resp = await getGameType();
        this.GameType = resp.data;
      } catch (error) {
        this.$Message.error(error);
      }
    }
  }
};
</script>
