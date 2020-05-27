<template>
  <div>
    <Table :columns="columns" :data="data" border :loading="loading"></Table>
  </div>
</template>
<script>
import { getcurrentValidData } from "@/api/server.js";
import { parseTime } from "@/utils";
export default {
  name: "GameState",
  data() {
    return {
      columns: [
        {
          key: "save_path",
          title: this.$t("StoreRelativePath"),
          minWidth: 130
        },
        {
          key: "all_game_file",
          title: this.$t("FullGameFilename"),
          minWidth: 150,
          ellipsis: true,
          tooltip: true
        },
        {
          key: "all_game_md5",
          title: this.$t("FullGameFilename") + "MD5",
          minWidth: 130
        },
        {
          key: "update_time",
          title: this.$t("LastUpdated"),
          minWidth: 150,
          render: (h, params) => {
            return h("span", parseTime(params.row.update_time));
          }
        },
        {
          key: "action",
          title: this.$t("Operation"),
          minWidth: 90,
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: "primary",
                  size: "small"
                },
                on: {
                  click: () => {
                    this.HandledDownload(params.row.url);
                  }
                }
              },
              this.$t("Download")
            );
          }
        }
      ],
      data: [],
      loading: false
    };
  },
  methods: {
    async HandlegetcurrentValidData() {
      this.loading = true;
      try {
        let resp = await getcurrentValidData();
        this.data = resp.data.data;
      } catch (error) {
        this.$Message.error(this.$t("Get") + this.$t("Failed"));
      } finally {
        this.loading = false;
      }
    }
  },
  HandledDownload(url) {
    window.open(url);
  },
  created() {
    this.HandlegetcurrentValidData();
  }
};
</script>
