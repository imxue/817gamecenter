<template>
  <div class="server_container">
    <div class="item">
      <h3>BtServer</h3>
      <Table :columns="columns" :data="data0" border :loading="loading"></Table>
    </div>
    <div class="item">
      <h3>Tracker</h3>
      <Table :columns="columns" :data="data1" border :loading="loading"></Table>
    </div>
    <div class="item">
      <h3>{{ $t("Cluster") }}{{ $t("Server") }}</h3>
      <Table :columns="columns" :data="data2" border :loading="loading"></Table>
    </div>
    <div class="item">
      <h3>FTP{{ $t("Server") }}</h3>
      <Table :columns="columns" :data="data3" border :loading="loading"></Table>
    </div>
  </div>
</template>
<script>
import { getServerStatus } from "@/api/server.js";
export default {
  name: "ServerState",
  data() {
    return {
      loading: false,
      columns: [
        {
          key: "up_load",
          minWidth: 148,
          title: this.$t("Upstream") + this.$t("Bandwidth") + this.$t("Load")
        },
        {
          key: "down_load",
          minWidth: 180,
          title: this.$t("Downstream") + this.$t("Bandwidth") + this.$t("Load")
        },
        {
          key: "conn",
          minWidth: 148,
          title: this.$t("Connections") + this.$t("Load")
        },
        {
          key: "total",
          minWidth: 100,
          title: this.$t("All") + this.$t("Server")
        },
        {
          key: "offline",
          minWidth: 148,
          title: this.$t("Offline") + this.$t("Server"),
          align: "center",
          render: (h, param) => {
            if (param.row.offline.length > 0) {
              return h(
                "Button",
                {
                  props: {
                    type: "info",
                    ghost: true
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path:
                          "/EventMonitoring/ConditionMonitoring/ServerState/ServerDetails",
                        query: { data: param.row.offline, type: param.row.type }
                      });
                    }
                  }
                },
                param.row.offline.length
              );
            } else {
              return h("span", param.row.offline.length);
            }
          }
        },
        {
          key: "hight_load",
          minWidth: 148,
          title: this.$t("Height") + this.$t("Load") + this.$t("Server"),
          align: "center",
          render: (h, param) => {
            if (param.row.hight_load.length > 0) {
              return h(
                "Button",
                {
                  props: {
                    type: "info",
                    ghost: true
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path:
                          "/EventMonitoring/ConditionMonitoring/ServerState/Serverdetails",
                        query: {
                          data: param.row.hight_load,
                          type: param.row.type
                        }
                      });
                    }
                  }
                },
                param.row.hight_load.length
              );
            } else {
              return h("span", param.row.hight_load.length);
            }
          }
        },
        {
          key: "middle_load",
          minWidth: 148,
          title: this.$t("Middle") + this.$t("Load") + this.$t("Server"),
          align: "center",
          render: (h, param) => {
            if (param.row.middle_load.length > 0) {
              return h(
                "Button",
                {
                  props: {
                    type: "info",
                    ghost: true
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path:
                          "/EventMonitoring/ConditionMonitoring/ServerState/ServerDetails",
                        query: {
                          data: param.row.middle_load,
                          type: param.row.type
                        }
                      });
                    }
                  }
                },
                param.row.middle_load.length
              );
            } else {
              return h("span", param.row.middle_load.length);
            }
          }
        },
        {
          key: "low_load",
          minWidth: 148,
          align: "center",
          title: this.$t("Low") + this.$t("Load") + this.$t("Server"),
          render: (h, param) => {
            if (param.row.low_load.length > 0) {
              return h(
                "Button",
                {
                  props: {
                    type: "info",
                    ghost: true
                  },
                  on: {
                    click: () => {
                      // let type = param.row.type;
                      // param.row.low_load[0].type = type;
                      this.$router.push({
                        path:
                          "/EventMonitoring/ConditionMonitoring/ServerState/Serveretails",
                        query: {
                          data: param.row.low_load,
                          type: param.row.type
                        }
                      });
                    }
                  }
                },
                param.row.low_load.length
              );
            } else {
              return h("span", param.row.low_load.length);
            }
          }
        }
      ],
      alldata: [],
      data0: [],
      data1: [],
      data2: [],
      data3: []
    };
  },
  created() {
    this.HandleGetData();
  },
  methods: {
    async HandleGetData() {
      try {
        this.loading = true;
        let resp = await getServerStatus();
        this.alldata = resp.data.data;
        this.alldata.forEach(item => {
          switch (item.type) {
            case 0:
              this.data0 = [item];
              break;
            case 1:
              this.data1 = [item];
              break;
            case 2:
              this.data2 = [item];
              break;
            case 3:
              this.data3 = [item];
              break;
            default:
              break;
          }
        });
      } catch (error) {
        this.$Message.error(
          this.$t("Get") +
            this.$t("Server") +
            this.$t("Status") +
            this.$t("Failed")
        );
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
<style lang="scss">
.server_container {
  font-size: 12px;
  .ivu-table,
  .ivu-table-header {
    font-size: 12px !important;
  }
  .item {
    margin-bottom: 15px;
    h3 {
      color: #00ad6f;
      margin-bottom: 4px;
    }
  }
}
</style>
