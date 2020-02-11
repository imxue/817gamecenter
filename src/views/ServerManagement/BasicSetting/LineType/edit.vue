<template>
  <div style="width:440px">
    <Form ref="form" :model="data" :rules="rule" :label-width="80">
     <FormItem label="Id" prop="id">
        <Input type="text" v-model="data.id"  disabled></Input>
      </FormItem>
      <FormItem label="线路名称" prop="name">
        <Input type="text" v-model="data.name" ></Input>
      </FormItem>
      <FormItem label="状态" prop="enable">
        <Select v-model="data.enable">
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
import { editLineType } from "@/api/server";
export default {
  name: "LineTypeEdit",
  data() {
    return {
      loading: false,
      data: {
        id:"",
        name: "",
        enable: ''
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
    };
  },
  created() {

      if (this.$route.query[0].id) {
          this.data= this.$route.query[0]
      } else {
        this.$router.go(-1)
      }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          try {
            this.loading = true;
            await editLineType(this.data)
            this.$Message.success("修改成功")
            this.$router.go(-1)
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
