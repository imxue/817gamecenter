<template>
  <div style="width:400px;">
    <Form ref="form" :model="form" :rules="rule" :label-width="180" label-colon>
      <Row>
        <div>
          <FormItem prop="type" :label="this.$t('Strategy') + this.$t('Type')">
            <Select v-model="Servertype" disabled>
              <Option :value="1">{{ $t("Global") }}{{ $t("Strategy") }}</Option>
              <Option :value="2">{{ $t("Custom") }}{{ $t("Strategy") }}</Option>
            </Select>
          </FormItem>
          <FormItem
            prop="game_id"
            :label="this.$t('Game') + 'ID'"
            v-show="!NotShow"
          >
            <Row style="display:flex;">
              <Input type="text" v-model="form.game_center_id" disabled />
            </Row>
          </FormItem>
          <FormItem
            prop="game_name"
            :label="this.$t('Game') + this.$t('Name')"
            v-show="!NotShow"
          >
            <Input type="text" v-model="form.game_name" disabled />
          </FormItem>
          <FormItem prop="type_name" :label="this.$t('Type')" v-show="!NotShow">
            <Input type="text" v-model="form.type_name" disabled />
          </FormItem>
          <FormItem prop="load_count" :label="this.$t('LoadCount')">
            <Input
              type="text"
              v-model.number="form.load_count"
              :disabled="loadCountDisabled"
            >
              <span slot="append">%</span>
            </Input>
          </FormItem>
          <FormItem prop="select_type" :label="this.$t('SelectType')">
            <Select v-model="form.select_type">
              <Option :value="1">{{ $t("Half") }}</Option>
              <Option :value="0">{{ $t("Custom") }}</Option>
            </Select>
          </FormItem>
          <FormItem prop="enable" :label="this.$t('Available')">
            <Select v-model.number="form.enable" :disabled="enableDisable">
              <Option :value="1">{{ $t("Enable") }}</Option>
              <Option :value="0">{{ $t("Disabled") }}</Option>
            </Select>
          </FormItem>
        </div>
      </Row>
      <FormItem>
        <Button
          type="primary"
          @click="handleSubmit('form')"
          :disabled="loading"
          >{{ $t("Save") }}</Button
        >
        <Button
          style="marginLeft:10px;"
          type="primary"
          @click="HandleGoBack"
          :disabled="loading"
          >{{ $t("Back") }}</Button
        >
      </FormItem>
    </Form>
  </div>
</template>
<script>
import { editGameVersionconfig } from "@/api/server";
export default {
  name: "",
  data() {
    return {
      loading: false,
      enableDisable: false,
      form: {
        id: "",
        type: "",
        game_id: "",
        game_center_id: "",
        game_name: "",
        load_count: "",
        type_name: "",
        select_type: "",
        enable: ""
      },
      Servertype: "",
      typeOpt: {
        1: this.$t("Global"),
        2: this.$t("customize")
      },
      NotShow: false,
      typeNmae: {
        1: this.$t("Global") + this.$t("Strategy"),
        2: this.$t("customize") + this.$t("Strategy")
      },
      rule: {
        name: [
          {
            required: true,
            message: this.$t("fne"),
            trigger: "blur"
          }
        ],
        load_count: [
          {
            required: true,
            type: "number",
            message: this.$t("fne"),
            trigger: "blur"
          },
          {
            type: "number",
            min: 0,
            max: 100,
            message: "0-100% 之间",
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
        ]
      }
    };
  },
  watch: {
    Servertype: function(v) {
      if (v === 1) {
        this.enableDisable = true;
        this.NotShow = true;
      } else {
        this.NotShow = false;
        this.enableDisable = false;
      }
    },
    "form.select_type"(v) {
      if (v === 0) {
        this.loadCountDisabled = false;
      } else {
        this.loadCountDisabled = true;
        this.form.load_count = 50;
      }
    }
  },

  methods: {
    HandleGoBack() {
      this.$router.go(-1);
    },
    handleSubmit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          try {
            this.loading = true;
            this.form.name = this.typeNmae[this.Servertype];
            this.form.type = this.Servertype;
            await editGameVersionconfig(this.form);
            this.$Message.success(this.$t("Creeat") + this.$t("Success"));
            this.$router.go(-1);
          } catch (error) {
            this.$Message.success(this.$t("Creeat") + this.$t("Failed"));
          } finally {
            this.loading = false;
          }
        }
      });
    }
  },
  created() {
    let resp = this.$route.query;
    for (const key in this.form) {
      if (this.form.hasOwnProperty(key)) {
        this.form[key] = resp[0][key];
      }
    }
    this.Servertype = this.form.type;
    if (this.form.select_type === 1) {
      this.loadCountDisabled = true;
    }
  }
};
</script>
