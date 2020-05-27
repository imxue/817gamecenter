<template>
  <div class="RunClientContainer">
    <Form
      ref="form"
      :model="form"
      :rules="rule"
      :label-width="350"
      label-colon
      label-position="right"
    >
      <FormItem
        :label="
          this.$t('Download') +
            this.$t('Game') +
            this.$t('List') +
            this.$t('interval')
        "
        prop="download_game_list_interval"
      >
        <Input
          v-model.number="form.download_game_list_interval"
          :placeholder="
            this.$t('Download') +
              this.$t('Game') +
              this.$t('List') +
              this.$t('interval')
          "
        >
          <span slot="append">{{ $t("Sec") }}</span></Input
        >
      </FormItem>
      <FormItem
        :label="
          this.$t('Reporting') +
            this.$t('Runing') +
            this.$t('Status') +
            this.$t('interval')
        "
        prop="upload_state_time_interval"
      >
        <Input
          v-model.number="form.upload_state_time_interval"
          :placeholder="
            this.$t('Reporting') +
              this.$t('Runing') +
              this.$t('Status') +
              this.$t('interval')
          "
        >
          <span slot="append">{{ $t("Sec") }}</span></Input
        >
      </FormItem>
      <FormItem
        :label="
          this.$t('Sync') +
            this.$t('RunConfig') +
            this.$t('Status') +
            this.$t('interval')
        "
        prop="sync_config_time_interval"
      >
        <Input
          v-model.number="form.sync_config_time_interval"
          :placeholder="
            this.$t('Sync') +
              this.$t('RunConfig') +
              this.$t('Status') +
              this.$t('interval')
          "
          ><span slot="append">{{ $t("Sec") }}</span></Input
        >
      </FormItem>
      <FormItem
        :label="this.$t('Anonymous') + this.$t('Login')"
        prop="allow_anoymous_login"
      >
        <Select v-model.number="form.allow_anoymous_login">
          <Option :value="1">{{ $t("Allow") }}</Option>
          <Option :value="0">{{ $t("Prohibit") }}</Option>
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
  setbtClientConfig
  // getbtClientConfig
} from "@/api/server";
export default {
  name: "setRunConfig",
  data() {
    return {
      loading: false,
      form: {
        download_game_list_interval: "",
        upload_state_time_interval: "",
        sync_config_time_interval: "",
        allow_anoymous_login: ""
      },
      rule: {
        download_game_list_interval: [
          {
            required: true,
            type: "number",
            message: this.$t("fne"),
            trigger: "blur"
          }
        ],
        upload_state_time_interval: [
          {
            required: true,
            type: "number",
            message: this.$t("fne"),
            trigger: "blur"
          }
        ],
        sync_config_time_interval: [
          {
            required: true,
            type: "number",
            message: this.$t("fne"),
            trigger: "blur"
          }
        ],
        allow_anoymous_login: [
          {
            required: true,
            type: "number",
            message: this.$t("fne"),
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
    for (const key in this.form) {
      if (this.form.hasOwnProperty(key)) {
        this.form[key] = this.$route.query[0][key];
      }
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          try {
            this.loading = true;
            await setbtClientConfig(this.form);
            this.$Message.info(this.$t("Set") + this.$t("Success"));
            this.$router.go(-1);
          } catch (error) {
            this.$Message.info(this.$t("Set") + this.$t("Failed"));
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

<style lang="scss" scoped>
.RunClientContainer {
  width: 700px;
}
</style>
