<template>
  <div>
    <Button
      type="info"
      style="marginBottom:10px;"
      @click="HandleGoSet"
      :disabled="loading"
      >{{ $t("Set") }}{{ $t("RunConfig") }}</Button
    >
    <Table
      size="small"
      :columns="columns"
      :data="data"
      border
      :loading="loading"
    ></Table>
  </div>
</template>
<script>
import { getbtClientConfig } from "@/api/server";
import { parseTime } from "@/utils";
export default {
  name: "BTClientSet",
  data() {
    return {
      loading: false,
      columns: [
        {
          title:
            this.$t("Download") +
            this.$t("Game") +
            this.$t("List") +
            this.$t("interval") +
            " (" +
            this.$t("Sec") +
            ")",
          key: "download_game_list_interval",
          minWidth: 210,
          maxWidth: 395
        },
        {
          title:
            this.$t("Reporting") +
            this.$t("Runing") +
            this.$t("Status") +
            this.$t("interval") +
            " (" +
            this.$t("Sec") +
            ")",
          key: "upload_state_time_interval",
          minWidth: 208,
          maxWidth: 395
        },
        {
          title:
            this.$t("Sync") +
            this.$t("RunConfig") +
            this.$t("Status") +
            this.$t("interval") +
            " (" +
            this.$t("Sec") +
            ")",
          key: "sync_config_time_interval",
          // minWidth: 248,
          minWidth: 208,
          maxWidth: 395
        },
        {
          title: this.$t("Anonymous") + this.$t("Login"),
          key: "allow_anoymous_login",
          minWidth: 100,
          maxWidth: 100,
          render: (h, params) => {
            let isOnline = {
              1: {
                title: this.$t("Allow"),
                color: "#52c41a"
              },
              0: {
                title: this.$t("Prohibit"),
                color: "#ffa39e"
              }
            };
            return h(
              "span",
              {
                style: {
                  color: isOnline[params.row.allow_anoymous_login].color || "-"
                }
              },
              isOnline[params.row.allow_anoymous_login].title || "-"
            );
          }
        },
        {
          title: this.$t("Operator"),
          key: "operator",
          minWidth: 100,
          maxWidth: 200
        },
        {
          title: this.$t("LastOperationTime"),
          key: "update_time",
          minWidth: 200,
          render: (h, params) => {
            return h("span", parseTime(params.row.update_time));
          }
        }
      ],
      data: []
    };
  },
  created() {
    this.HandleGetData();
  },
  methods: {
    async HandleGetData() {
      this.loading = true;
      try {
        let resp = await getbtClientConfig();
        this.data = resp.data.data;
      } catch (error) {
        this.$Message.error(
          this.$t("Get") + this.$t("BT") + this.$t("Client") + this.$t("Failed")
        );
      } finally {
        this.loading = false;
      }
    },
    HandleGoSet() {
      if (this.data) {
        this.$router.push({
          path: "/ServerManagement/BTClient/setRunConfig",
          query: this.data
        });
      } else {
        this.$Message.info(this.$t("Get") + this.$t("Failed"));
      }
    }
  }
};
</script>
