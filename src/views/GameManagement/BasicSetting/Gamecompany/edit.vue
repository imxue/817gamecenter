<template>
  <Form name="form" ref="form" :model="form" :rules="rule" label-colon>
    <FormItem
      prop="name"
      :label="this.$t('Game') + this.$t('Company') + this.$t('Name')"
    >
      <Input type="text" v-model="form.name" size="large" />
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
      <Button
        type="primary"
        @click="handleSubmit('form')"
        :disabled="disabled"
        >{{ $t("Save") }}</Button
      >
    </FormItem>
  </Form>
</template>
<script>
import { editGameCmpany, verifyGameCompanyUnique } from "@/api/server";
import { mapState } from "vuex";
export default {
  name: "",
  props: {
    oldGameCompany: Array
  },
  data() {
    const validateGameName = async (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("fne")));
      } else {
        try {
          if (this.OldName === value) {
            callback();
          }
          await verifyGameCompanyUnique(value);
          callback();
        } catch (error) {
          callback(new Error(this.$t("Tfax")));
        }
      }
    };
    return {
      disabled: false,
      OldName: "",
      form: {
        id: this.oldGameCompany[0].id,
        name: this.oldGameCompany[0].name,
        description: this.oldGameCompany[0].description,
        status: this.oldGameCompany[0].status
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
  created() {
    this.OldName = this.oldGameCompany[0].name;
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          try {
            this.disabled = true;
            await editGameCmpany(this.form);
            this.$Message.success(
              this.$t("Edit") +
                this.$t("Game") +
                this.$t("Company") +
                this.$t("Success")
            );
            this.form = {};
            this.$emit("GameCompanyResult", true);
          } catch (error) {
            this.$Message.error(
              this.$t("Edit") +
                this.$t("Game") +
                this.$t("Company") +
                this.$t("Failed")
            );
          } finally {
            this.disabled = true;
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
