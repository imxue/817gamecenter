<template>
  <div style="width:450px">
    <Form ref="form" :model="form" :rules="rule" :label-width="150" label-colon>
      <FormItem :label="this.$t('ISP') + this.$t('Name')" prop="name">
        <Input type="text" v-model="form.name" />
      </FormItem>
      <FormItem :label="this.$t('DefaultLine')" prop="is_default">
        <Select v-model="form.is_default">
          <Option :value="1">{{ $t("Enable") }}</Option>
          <Option :value="0">{{ $t("Disabled") }}</Option>
        </Select>
      </FormItem>
      <FormItem :label="this.$t('Available')" prop="enable">
        <Select v-model="form.enable" :disabled="disabled">
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
import {
  addLineType,
  verifyNameUnique,
  verifyDefaultUnique
} from "@/api/server";
import { mapState } from "vuex";
export default {
  name: "LineTypeadd",
  data() {
    const validateLineName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("Tgcncbe")));
      } else {
        verifyNameUnique(value).then(
          () => {
            callback();
          },
          () => {
            callback(new Error(this.$t("TLax")));
          }
        );
      }
    };
    return {
      loading: false,
      disabled: false,
      form: {
        name: "",
        enable: 1,
        is_default: 0
      },
      rule: {
        name: [
          {
            required: true,
            validator: validateLineName,
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      LineType: state => state.LineType,
      IsDefaultLine: state => state.IsDefaultLine
    })
  },
  watch: {
    "form.is_default"(value) {
      if (value === 1) {
        this.form.enable = 1;
        verifyDefaultUnique().then(
          () => {},
          () => {
            this.$Modal.info({
              title: this.$t("opttip"),
              content: this.$t("tip"),
              onOk: () => {
                this.form.is_default = 0;
              }
            });
          }
        );
        this.disabled = true;
      } else if (value === 0) {
        this.disabled = false;
      }
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          try {
            this.loading = true;
            await addLineType(this.form);
            this.$Message.success(this.$t("Add") + this.$t("Success"));
            this.$router.go(-1);
          } catch (error) {
            this.$Message.error(this.$t("Add") + this.$t("Failed"));
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
