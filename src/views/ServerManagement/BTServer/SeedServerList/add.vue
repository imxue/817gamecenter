<template>
  <div style="width:440px">
    <Form ref="form" :model="form" :rules="rule" :label-width="180" label-colon>
      <FormItem :label="this.$t('IP')" prop="ip">
        <Select v-model="form.ip" :disabled="loading">
          <Option v-for="item in BtServeIP" :value="item.ip" :key="item.id">{{
            item.ip
          }}</Option>
        </Select>
      </FormItem>
      <FormItem :label="this.$t('Group')" prop="bt_server_group_id">
        <Input v-model="BtServerInof.bt_server_group" type="text" disabled>
        </Input>
      </FormItem>
      <FormItem :label="this.$t('Region')" prop="area_code">
        <Input v-model="BtServerInof.area_name" type="text" disabled> </Input>
      </FormItem>
      <FormItem :label="this.$t('Line') + this.$t('Type')" prop="line_type">
        <Input v-model="BtServerInof.line_type" type="text" disabled> </Input>
      </FormItem>
      <FormItem :label="this.$t('Available')" prop="enable">
        <Select v-model="BtServerInof.enable" disabled>
          <Option :value="1">{{ $t("Enable") }}</Option>
          <Option :value="0">{{ $t("Disabled") }}</Option>
        </Select>
      </FormItem>
      <FormItem
        :label="this.$t('Last') + this.$t('Heartbeat') + this.$t('Time')"
        prop="time"
      >
        <Input v-model="BtServerInof.last_heart_time" type="text" disabled>
        </Input>
      </FormItem>

      <FormItem :label="this.$t('Exceptions')" prop="time">
        <Input v-model="BtServerInof.except_count" type="text" disabled>
        </Input>
      </FormItem>
      <FormItem :label="this.$t('Allow') + this.$t('Seeding')" prop="enable">
        <Select v-model="form.enable">
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
import { addDoSeedServer, getBTServer } from "@/api/server";
export default {
  name: "SeedServerListadd",
  data() {
    return {
      loading: false,
      form: {
        ip: "",
        name: "",
        enable: 1
      },
      rule: {
        ip: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ]
      },
      ServerGroup: [],
      LineType: [],
      Area: [],
      BtServe: "",
      BtServeIP: []
    };
  },
  computed: {
    BtServerInof: function() {
      if (this.BtServeIP.length > 0) {
        return this.BtServeIP.filter(item => {
          return item.ip === this.form.ip;
        })[0];
      } else {
        return {
          last_heart_time: "",
          except_count: "",
          line_type: "",
          bt_server_group: "",
          enable: "",
          area_name: ""
        };
      }
    }
  },
  created() {
    this.HandleGetBTServer({
      offset: 0,
      limit: 10000,
      type: "",
      groupid: "",
      linetypeid: "",
      ip: "",
      orderby: ""
    });
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          try {
            this.loading = true;
            await addDoSeedServer(this.form);
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

    async HandleGetBTServer({
      offset = 0,
      limit = 10000,
      type = "",
      groupid = "",
      linetypeid = "",
      ip = "",
      orderby = ""
    }) {
      this.loading = true;
      try {
        let resp = await getBTServer({
          offset,
          limit,
          type,
          groupid,
          linetypeid,
          ip,
          orderby
        });
        this.BtServe = resp.data.data.data;
        if (this.BtServe) {
          this.BtServe.forEach(item => {
            if (item.type === 0) {
              this.BtServeIP.push({
                id: item.id,
                ip: item.ip,
                last_heart_time: item.last_heart_time,
                except_count: item.except_count,
                line_type: item.line_type,
                bt_server_group: item.bt_server_group,
                enable: item.enable,
                area_name: item.area_name
              });
            }
          });
        }
      } catch (error) {
        this.$Message.error(
          this.$t("Get") +
            this.$t("Seeding") +
            this.$t("Server") +
            this.$t("Failed")
        );
      } finally {
        this.form.ip = this.BtServeIP[0].ip;
        this.loading = false;
      }
    },
    handleRetrun() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="sass" scoped></style>
