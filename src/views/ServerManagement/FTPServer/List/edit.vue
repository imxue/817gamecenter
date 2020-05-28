<template>
  <div class="RunContainer">
    <Form
      ref="form"
      :model="form"
      :rules="rule"
      :label-width="200"
      label-colon
      label-position="right"
    >
      <Row :gutter="16">
        <Col span="12">
          <FormItem :label="this.$t('Type')" prop="type">
            <Select v-model="form.type">
              <Option :value="1"
                >{{ this.$t("Sync") }}{{ this.$t("Source")
                }}{{ this.$t("Server") }}</Option
              >
              <Option :value="0"
                >{{ this.$t("Passive") }}{{ this.$t("Source")
                }}{{ this.$t("Server") }}</Option
              >
            </Select>
          </FormItem>
          <FormItem
            :label="this.$t('ExtranetDom') + '/' + this.$t('IP')"
            prop="domain"
          >
            <Input v-model="form.domain" type="text"> </Input>
          </FormItem>
          <FormItem :label="this.$t('Port')" prop="port">
            <Input v-model.number="form.port" type="text"> </Input>
          </FormItem>
          <FormItem
            :label="this.$t('Upload') + this.$t('Account')"
            prop="upload_account"
          >
            <Input v-model="form.upload_account" type="text"> </Input>
          </FormItem>
          <FormItem
            :label="this.$t('Upload') + this.$t('Password')"
            prop="upload_password"
          >
            <Input v-model="form.upload_password" type="password" password>
            </Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem
            :label="this.$t('Download') + this.$t('Account')"
            prop="download_account"
          >
            <Input v-model="form.download_account" type="text"> </Input>
          </FormItem>
          <FormItem
            :label="this.$t('Download') + this.$t('Password')"
            prop="download_password"
          >
            <Input v-model="form.download_password" type="password" password>
            </Input>
          </FormItem>
          <FormItem
            :label="
              this.$t('Seed') +
                this.$t('File') +
                this.$t('Save') +
                this.$t('Path')
            "
            prop="seed_path"
          >
            <Input v-model="form.seed_path" type="text"> </Input>
          </FormItem>
          <FormItem
            :label="
              this.$t('Game') +
                this.$t('Config') +
                this.$t('File') +
                this.$t('Save') +
                this.$t('Path')
            "
            prop="game_path"
          >
            <Input v-model="form.game_path" type="text"> </Input>
          </FormItem>
          <FormItem :label="this.$t('Available')" prop="enable">
            <Select v-model="form.enable">
              <Option :value="1">{{ $t("Enable") }}</Option>
              <Option :value="0">{{ $t("Disabled") }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
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
import { editFtpServer } from "@/api/server";
export default {
  name: "editFtp",
  data() {
    return {
      loading: false,
      LineTypeSelect: false,
      form: {
        id: "",
        type: "",
        line_type_id: 0,
        domain: "",
        port: "",
        enable: 1,
        upload_account: "",
        upload_password: "",
        download_account: "",
        download_password: "",
        seed_path: "",
        game_path: ""
      },
      rule: {
        domain: [
          {
            required: true,
            message: this.$t("fne"),
            trigger: "blur"
          }
        ],
        port: [
          {
            required: true,
            type: "number",
            message: this.$t("fne"),
            trigger: "blur"
          }
        ],
        game_path: [
          {
            required: true,
            message: this.$t("fne"),
            trigger: "blur"
          }
        ],
        upload_account: [
          {
            required: true,
            message: this.$t("fne"),
            trigger: "blur"
          }
        ],
        upload_password: [
          {
            required: true,
            message: this.$t("fne"),
            trigger: "blur"
          }
        ],
        download_account: [
          {
            required: true,
            message: this.$t("fne"),
            trigger: "blur"
          }
        ],
        download_password: [
          {
            required: true,
            message: this.$t("fne"),
            trigger: "blur"
          }
        ],
        seed_path: [
          {
            required: true,
            message: this.$t("fne"),
            trigger: "blur"
          }
        ]
      },
      LineType: []
    };
  },
  created() {
    for (let key in this.form) {
      this.form[key] = this.$route.query[0][key];
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          try {
            this.loading = true;
            await editFtpServer(this.form);
            this.$Message.success(this.$t("Set") + this.$t("Success"));
            this.$router.go(-1);
          } catch (error) {
            this.$Message.error(this.$t("Set") + this.$t("Failed"));
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
.RunContainer {
  max-width: 1000px;
}
</style>
