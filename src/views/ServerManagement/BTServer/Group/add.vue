<template>
  <div style="width:450px">
    <Form ref="form" :model="form" :rules="rule" :label-width="160">
      <FormItem :label="this.$t('Group') + this.$t('Name')" prop="name">
        <Input type="text" v-model.trim="form.name"> </Input>
      </FormItem>
      <FormItem :label="this.$t('Available')" prop="enable">
        <Select v-model="form.enable">
          <Option :value="1">{{ $t("Enable") }}</Option>
          <Option :value="0">{{ $t("Disabled") }}</Option>
        </Select>
      </FormItem>
      <FormItem>
        <div style="display:flex;">
          <Button
            :loading="loading"
            type="primary"
            @click="handleSubmit('form')"
            >{{ $t("Save") }}</Button
          >
          <div style="marginLeft:40px;">
            <Button
              type="primary"
              :disabled="loading"
              @click="handleRetrun()"
              >{{ $t("Back") }}</Button
            >
          </div>
        </div>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { addBTServerGroup, verifyBtServerNameUnique } from "@/api/server";
import { mapState } from "vuex";
export default {
  name: "Groupadd",
  data() {
    const validateGameName = async (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("fne")));
      } else {
        try {
          await verifyBtServerNameUnique(value);
          callback();
        } catch (error) {
          callback(new Error(this.$t("该分组已经存在")));
        }
      }
    };
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
            validator: validateGameName,
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      GameGroupName: state => state.GameGroupName
    })
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          try {
            this.loading = true;
            await addBTServerGroup(this.form);
            this.$router.go(-1);
          } catch (error) {
            this.$Message.error(
              this.$t("Add") + this.$t("ServerGroup") + this.$t("Failed")
            );
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
