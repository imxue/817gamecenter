<template>
  <div style="width:440px">
    <Form ref="form" :model="data" :rules="rule" :label-width="150">
      <FormItem label="Id" prop="id">
        <Input type="text" v-model="data.id" disabled></Input>
      </FormItem>
      <FormItem :label="this.$t('Group') + this.$t('Name')" prop="name">
        <Input type="text" v-model.trim="data.name"></Input>
      </FormItem>
      <FormItem :label="this.$t('Available')" prop="enable">
        <Select v-model="data.enable">
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
import { editBTServerGroup, verifyBtServerNameUnique } from "@/api/server";
import { mapState } from "vuex";
export default {
  name: "Groupedit",
  data() {
    const validateGroupName = async (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("fne")));
      } else {
        try {
          if (this.OldName === value) {
            callback();
          } else {
            await verifyBtServerNameUnique(value);
            callback();
          }
        } catch (error) {
          callback(new Error(this.$t("该分组已经存在")));
        }
      }
    };
    return {
      loading: false,
      data: {
        id: "",
        name: "",
        enable: ""
      },
      OldName: "",
      rule: {
        name: [
          {
            required: true,
            validator: validateGroupName,
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
  created() {
    if (this.$route.query[0].id) {
      this.data = this.$route.query[0];
      this.OldName = this.data.name;
    } else {
      this.$router.go(-1);
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          try {
            this.loading = true;
            await editBTServerGroup(this.data);
            this.$Message.success(this.$t("Edit") + this.$t("Success"));
            this.$router.go(-1);
          } catch (error) {
            this.$Message.error(
              this.$t("Edit") + this.$t("ServerGroup") + this.$t("Failed")
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
