<template>
  <div style="width:500px;">
    <Form ref="form" :model="form" :rules="rule" :label-width="180" label-colon>
      <Row>
        <FormItem prop="type" :label="this.$t('Strategy') + this.$t('Type')">
          <Select v-model="form.type" disabled>
            <Option :value="1">{{ $t("Global") }}{{ $t("Strategy") }}</Option>
            <Option :value="2">{{ $t("Custom") }}{{ $t("Strategy") }}</Option>
          </Select>
        </FormItem>

        <FormItem prop="game_id" :label="this.$t('Game') + 'ID'">
          <Row style="display:flex;">
            <Input type="text" v-model="form.game_id" :disabled="disabled" />
            <Button type="info" @click="HandleGetGameById()">{{
              $t("Search")
            }}</Button>
          </Row>
        </FormItem>
        <FormItem prop="game_name" :label="this.$t('Game') + this.$t('Name')">
          <Input type="text" v-model="form.game_name" disabled />
        </FormItem>
        <FormItem prop="type_name" :label="this.$t('Type')">
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
          <Select v-model.number="form.enable">
            <Option :value="1">{{ $t("Enable") }}</Option>
            <Option :value="0">{{ $t("Disabled") }}</Option>
          </Select>
        </FormItem>
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
import { addGameVersionconfig, getGameById } from "@/api/server";
export default {
  name: "",
  data() {
    return {
      loading: false,
      disabled: false,
      loadCountDisabled: true,
      form: {
        id: "",
        type: 2,
        game_id: "",
        type_name: "",
        game_name: "",
        load_count: 50,
        select_type: 1,
        enable: 1
      },
      type: {
        1: this.$t("Global") + this.$t("Strategy"),
        2: this.$t("Custom") + this.$t("Strategy")
      },
      globalStrategy: {
        type: 1,
        load_count: "",
        select_type: 1,
        enable: 1
      },
      rule: {
        game_id: [
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
            trigger: "change"
          },
          {
            type: "number",
            min: 0,
            max: 100,
            message: "0-100%",
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
    handleSubmit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          try {
            this.loading = true;
            let form = {
              type: this.form.type,
              name: this.type[this.form.type],
              game_id: this.form.id,
              game_name: this.form.game_name,
              select_type: this.form.select_type,
              load_count: this.form.load_count,
              enable: this.form.enable
            };
            await addGameVersionconfig(form);
            this.$Message.success(this.$t("Add") + this.$t("Success"));
            this.$router.go(-1);
          } catch (error) {
            this.$Message.success(this.$t("Add") + this.$t("Failed"));
          } finally {
            this.loading = false;
          }
        }
      });
    },
    async HandleGetGameById() {
      this.disabled = true;
      try {
        let resp = await getGameById(this.form.game_id);
        if (typeof resp.data.data === "string") {
          this.$Modal.confirm({
            title: this.$t("Message"),
            content: this.$t("StrategyINFO")
          });
        } else {
          this.form.game_name = resp.data.data.name;
          this.form.id = resp.data.data.id;
          this.form.type_name = resp.data.data.type_name;
        }
      } catch (error) {
        this.$Message.error(this.$t("Get") + this.$t("Failed"));
      } finally {
        this.disabled = false;
      }
    },
    HandleGoBack() {
      this.$router.go(-1);
    }
  }
};
</script>
