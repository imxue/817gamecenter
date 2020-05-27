<template>
  <!-- <div> -->
  <Form name="form" ref="form" :model="form" :rules="rule" label-colon>
    <FormItem
      prop="name"
      :label="this.$t('Game') + this.$t('Company') + this.$t('Name')"
    >
      <Input type="text" v-model.trim="form.name" size="large" />
    </FormItem>
    <FormItem prop="status" :label="this.$t('Status')">
      <Select v-model.number="form.status" size="large">
        <Option :value="1">{{ $t("Enable") }}</Option>
        <Option :value="0">{{ $t("Disabled") }}</Option>
      </Select>
    </FormItem>
    <FormItem prop="description" :label="this.$t('Remarks')">
      <Input type="textarea" v-model="form.description" size="large" />
    </FormItem>
    <FormItem>
      <Button type="primary" size="large" @click="handleSubmit('form')">{{
        $t("Save")
      }}</Button>
    </FormItem>
  </Form>
  <!-- </div> -->
</template>
<script>
import { addGameCmpany, verifyGameCompanyUnique } from "@/api/server";
import { mapState } from "vuex";
export default {
  name: "",
  data() {
    const validateGameName = async (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("fne")));
      } else {
        try {
          await verifyGameCompanyUnique(value);
          callback();
        } catch (error) {
          callback(new Error(this.$t("Tfax")));
        }
      }
    };
    return {
      form: {
        name: "",
        description: "",
        status: 1
      },
      rule: {
        name: [
          {
            required: true,
            validator: validateGameName,
            trigger: "blur"
          }
        ],
        status: [
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
  computed: {
    ...mapState({
      GameCompany: state => state.GameCompany
    })
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          try {
            await addGameCmpany(this.form);
            this.$Message.success(
              this.$t("Add") +
                this.$t("Game") +
                this.$t("Company") +
                this.$t("Success")
            );
            this.$emit("GameCompanyResult", true);
          } catch (error) {
            this.$Message.error(
              this.$t("Add") +
                this.$t("Game") +
                this.$t("Company") +
                this.$t("Failed")
            );
          }
        }
      });
    },
    handleReset() {
      this.$refs["form"].resetFields();
    }
  }
};
</script>
