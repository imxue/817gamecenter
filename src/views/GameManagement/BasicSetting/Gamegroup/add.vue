<template>
  <div style="max-width:500px;">
    <Form ref="form" :model="form" :rules="rule" :label-width="180" label-colon>
      <FormItem prop="subtype_id" :label="this.$t('Subcategories')">
        <Select v-model.number="form.subtype_id">
          <Option :value="0"
            >{{ $t("General") }}{{ $t("Game") }}{{ $t("Category") }}</Option
          >
          <Option :value="1"
            >{{ $t("Popular") }}{{ $t("Game") }}{{ $t("Category") }}</Option
          >
          <Option :value="2"
            >{{ $t("System") }}{{ $t("Tool") }}{{ $t("Category") }}</Option
          >
        </Select>
      </FormItem>
      <FormItem prop="name" :label="this.$t('Category') + this.$t('Name')">
        <Input type="text" v-model.trim="form.name" />
      </FormItem>
      <FormItem
        prop="display_name"
        :label="this.$t('Display') + this.$t('Name')"
      >
        <Input type="text" v-model="form.display_name" />
      </FormItem>
      <FormItem
        prop="default_download_dir"
        :label="this.$t('Default') + this.$t('Download') + this.$t('Path')"
      >
        <Input type="text" v-model.trim="form.default_download_dir" />
      </FormItem>
      <FormItem
        prop="is_console_display"
        :label="this.$t('Console') + this.$t('Display')"
      >
        <Select v-model.number="form.is_console_display">
          <Option :value="1">{{ $t("Enable") }}</Option>
          <Option :value="0">{{ $t("Disabled") }}</Option>
        </Select>
      </FormItem>

      <FormItem prop="enable" :label="this.$t('Available')">
        <Select v-model.number="form.enable">
          <Option :value="1">{{ $t("Enable") }}</Option>
          <Option :value="0">{{ $t("Disabled") }}</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Button
          type="primary"
          @click="handleSubmit('form')"
          :disabled="loading"
          >{{ $t("Save") }}</Button
        >
      </FormItem>
    </Form>
  </div>
</template>
<script>
import {
  addGameType,
  verifyGameCompanyGroupUnique,
  verifyGameCompanyGroupDisplalyUnique
} from "@/api/server";
import { mapState } from "vuex";
export default {
  name: "",
  data() {
    const validateGameType = async (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("fne")));
      } else {
        try {
          await verifyGameCompanyGroupUnique(value);
          callback();
        } catch (error) {
          callback(new Error(this.$t("TGax")));
        }
      }
    };
    const validateGameTypeDisplay = async (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("fne")));
      } else {
        try {
          await verifyGameCompanyGroupDisplalyUnique(value);
          callback();
        } catch (error) {
          callback(new Error(this.$t("displayNameE")));
        }
      }
    };
    return {
      loading: false,
      form: {
        subtype_id: 0,
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
            message: this.$t("fne"),
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            validator: validateGameType,
            trigger: "blur"
          }
        ],
        default_download_dir: [
          {
            required: true,
            message: this.$t("fne"),
            trigger: "blur"
          }
        ],
        display_name: [
          {
            required: true,
            validator: validateGameTypeDisplay,
            trigger: "blur"
          }
        ],
        is_console_display: [
          {
            required: true,
            type: "number",
            message: this.$t("fne"),
            trigger: "blur"
          }
        ],
        enable: [
          {
            required: true,
            type: "number",
            message: this.$t("fne"),
            trigger: "blur"
          }
        ],
        description: [
          {
            required: true,
            message: this.$t("fne"),
            trigger: "blur"
          }
        ],
        status: [
          {
            required: true,
            message: this.$t("fne"),
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      GameType: state => state.GameType
    })
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          try {
            this.loading = true;
            await addGameType(this.form);
            this.$Message.success(this.$t("Add") + this.$t("Success"));
            this.$router.go(-1);
          } catch (error) {
            this.$Message.error(this.$t("Add") + this.$t("Failed"));
          } finally {
            this.loading = false;
          }
        }
      });
    }
  }
};
</script>
