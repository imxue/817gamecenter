<template>
  <div style="width:440px">
    <Form ref="form" :model="data" :rules="rule" :label-width="100" label-colon>
      <FormItem label="ID" prop="id">
        <Input type="text" v-model="data.id" disabled></Input>
      </FormItem>
      <FormItem :label="this.$t('ISP') + this.$t('Name')" prop="name">
        <Input type="text" v-model="data.name"></Input>
      </FormItem>
      <FormItem :label="this.$t('DefaultLine')" prop="is_default">
        <Select v-model="data.is_default">
          <Option :value="1">{{ $t("Enable") }}</Option>
          <Option :value="0">{{ $t("Disabled") }}</Option>
        </Select>
      </FormItem>
      <FormItem :label="this.$t('Available')" prop="enable">
        <Select v-model="data.enable" :disabled="disabled">
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
import { editLineType, verifyDefaultUnique } from "@/api/server";
import { mapState } from "vuex";
export default {
  name: "LineTypeEdit",
  data() {
    const validateLineName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("Tgcncbe")));
      } else if (this.LineType.some(item => item === value)) {
        if (value === this.OldName) {
          callback();
        } else {
          callback(new Error(this.$t("TLax")));
        }
      } else {
        callback();
      }
    };
    return {
      loading: false,
      OldName: "",
      disabled: false,
      data: {
        id: "",
        name: "",
        is_default: "",
        enable: ""
      },
      selfDefault: 0,
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
  created() {
    if (this.$route.query[0].id) {
      this.data = this.$route.query[0];

      this.srcdata = JSON.parse(JSON.stringify(this.$route.query[0]));
      this.OldName = this.data.name;
      this.selfDefault = this.data.is_default;
    } else {
      this.$router.go(-1);
    }
  },
  watch: {
    "data.is_default"(value) {
      if (value === 1) {
        this.data.enable = 1;
        this.disabled = true;
        if (this.selfDefault === 0) {
          verifyDefaultUnique().then(
            () => {},
            () => {
              this.$Modal.info({
                title: this.$t("opttip"),
                content: this.$t("opttip"),
                onOk: () => {
                  this.data.is_default = 0;
                }
              });
            }
          );
        }
      } else if (value === 0) {
        if (this.IsDefaultLine.name) {
          if (this.IsDefaultLine.name === this.data.name) {
            this.$Modal.confirm({
              title: this.$t("opttip"),
              content: this.$t("tip2"),
              cancelText: this.$t("closed")
            });
          }
        }
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
            let params = {};
            if (
              this.srcdata.is_default === this.data.is_default &&
              this.srcdata.name === this.data.name &&
              this.srcdata.enable === this.data.enable
            ) {
              this.$Message.success(this.$t("Save") + this.$t("Success"));
              this.$router.go(-1);
              return;
            }
            if (this.srcdata.is_default === this.data.is_default) {
              params = {
                enable: this.data.enable,
                id: this.data.id,
                name: this.data.name
              };
            } else {
              params = this.data;
            }
            await editLineType(params);
            this.$Message.success(this.$t("Edit") + this.$t("Success"));
            this.$router.go(-1);
          } catch (error) {
            this.$Message.error(this.$t("Edit") + this.$t("Failed"));
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
