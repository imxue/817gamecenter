<template>
  <div>
    <div style="margin-bottom:40px;">
      <Table
        border
        :columns="Gamecolumns"
        :data="Gamedata"
        size="small"
      ></Table>
    </div>
    <Table border :columns="columns" :data="data" size="small"></Table>
  </div>
</template>

<script>
import { parseTime } from "@/utils";
export default {
  name: "GameDtails",
  data() {
    return {
      data: "",
      Gamedata: [],
      //   state: 999,
      sysncStat: [
        {
          id: 999,
          title: this.$t("All") + this.$t("Status")
        },
        {
          id: 0,
          title: this.$t("UnSync")
        },
        {
          id: 1,
          title: this.$t("Synching")
        },
        {
          id: 2,
          title: this.$t("Done")
        }
      ],
      Gamecolumns: [
        {
          title: this.$t("Game") + this.$t("Center") + "ID",
          key: "game_center_id",
          ellipsis: true,
          tooltip: true,
          minWidth: 120
        },
        {
          title: this.$t("Game") + this.$t("Name"),
          key: "game_name",
          minWidth: 150
        },
        {
          title: this.$t("Game") + this.$t("Category"),
          key: "game_type_name",
          minWidth: 150
        },
        {
          title: this.$t("Normal") + this.$t("Game") + this.$t("Version"),
          key: "official_version",
          minWidth: 190
        },
        {
          title: this.$t("Latest") + this.$t("Doseed") + this.$t("Version"),
          key: "latest_doseed_version",
          width: 180
        },
        {
          title: this.$t("Updated") + this.$t("Server"),
          key: "allocate_server_count",
          width: 160
        },
        {
          title: this.$t("PercentageUpdated"),
          key: "sync_completion_rate",
          width: 140
        }
      ],
      columns: [
        {
          title: this.$t("Server") + this.$t("Status"),
          key: "is_online",
          minWidth: 100,
          render: (h, params) => {
            let opt = {
              1: this.$t("Online"),
              0: this.$t("Offline")
            };
            return h("span", opt[params.row.is_online]);
          }
        },
        {
          title: this.$t("Server") + "IP",
          key: "ip",
          minWidth: 160
        },
        {
          title: this.$t("Server") + this.$t("Group"),
          key: "bt_server_group_name",
          minWidth: 160
        },
        {
          title: this.$t("Server") + this.$t("Game") + this.$t("Version"),
          key: "version_code",
          minWidth: 160
        },
        {
          title: this.$t("Latest") + this.$t("Sample") + this.$t("Time"),
          key: "sample_time",
          minWidth: 190,
          render: (h, params) => {
            return h("span", parseTime(params.row.sample_time));
          }
        },
        {
          title: this.$t("Sync") + this.$t("Status"),
          key: "state",
          minWidth: 160,
          render: (h, params) => {
            let opt = {
              0: this.$t("UnSync"),
              1: this.$t("Synching"),
              2: this.$t("Done")
            };
            return h("span", opt[params.row.state]);
          }
        },
        {
          title: this.$t("ErrorCode"),
          key: "error_code",
          minWidth: 100
        }
      ]
    };
  },
  created() {
    this.data = this.$route.query.allocate_server;
    this.Gamedata = [
      {
        ...this.$route.query
      }
    ];
  },
  methods: {
    //       async HandelsysncStat(name) {
    //   this.state = name;
    //   this.HandleGetData({
    //     offset: this.offset,
    //     limit: this.limit,
    //     orderby: this.orderby,
    //     state: this.state,
    //     typeid: this.typeid,
    //     firstletter: this.firstletter
    //   });
    // },
    //     async HandleGetData({
    //   offset,
    //   limit,
    //   orderby,
    //   state,
    //   typeid,
    //   firstletter
    // }) {
    //   try {
    //     this.loading = true;
    //     let resp = await getGameStatus({
    //       offset,
    //       limit,
    //       orderby,
    //       state,
    //       typeid,
    //       firstletter
    //     });
    //     this.data = resp.data.data.data;
    //     this.pageinfo = resp.data.data.pageino;
    //   } catch (error) {
    //     this.$Message.error("获取游戏状态失败");
    //   } finally {
    //     this.loading = false;
    //   }
    // },
  }
};
</script>
