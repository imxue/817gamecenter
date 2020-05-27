<template>
  <div>
    <div style="display:flex">
      <Select
        style="width:200px;margin-right:20px;"
        v-model.number="id"
        @on-change="HandleLineTypeId"
        :disabled="LineTypeDisable"
      >
        <Option v-for="item in LineType" :value="item.id" :key="item.id">{{
          item.name
        }}</Option>
      </Select>
      <Input
        search
        style="width:300px"
        :enter-button="this.$t('Search')"
        :placeholder="this.$t('Input') + this.$t('IP') + this.$t('Search')"
        @on-search="HandleSearch"
      />
    </div>

    <div style="margin-top:10px;margin-bottom:10px;">
      <router-link
        to="/ServerManagement/BtServer/SeedServerList/add"
        style="margin-right:10px"
      >
        <Button type="success">
          {{ $t("Add") }}
        </Button>
      </router-link>
      <Button type="info" @click="HandleStart" style="margin-right:10px">
        {{ $t("Enable") }}
      </Button>
      <Button type="info" @click="Handledisable">
        {{ $t("Disabled") }}
      </Button>
    </div>
    <div>
      <Table
        size="small"
        :columns="columns"
        :data="data"
        border
        :loading="loading"
        @on-selection-change="ChangeSelection"
      ></Table>
      <Page
        show-total
        :total="pageinfo.count"
        :page-size="limit"
        style="margin-top:10px;float:right;"
        @on-change="HandleChangePage"
      />
    </div>
  </div>
</template>

<script>
import {
  getDoSeedServer,
  getAllenabled,
  enableDoSeedServer,
  disenableDoSeedServer
} from "@/api/server.js";
import { parseTime } from "@/utils";
export default {
  name: "SeedServerListIndex",
  data() {
    return {
      model1: "",
      loading: false,
      LineTypeDisable: false,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: this.$t("Online") + this.$t("Status"),
          key: "is_online",
          minWidth: 125,
          render: (h, params) => {
            let isOnline = {
              1: {
                title: this.$t("Online"),
                color: "#52c41a"
              },
              0: {
                title: this.$t("Offline"),
                color: "#ffa39e"
              }
            };
            return h(
              "span",
              {
                style: {
                  color: isOnline[params.row.is_online].color || "-"
                }
              },
              isOnline[params.row.is_online].title || "-"
            );
          }
        },
        {
          title: this.$t("Region"),
          key: "area_name",
          minWidth: 110
        },
        {
          title: this.$t("Line") + this.$t("Type"),
          key: "line_type",
          minWidth: 120
        },
        {
          title: this.$t("IP") + this.$t("Address"),
          key: "ip",
          sortable: true,
          minWidth: 140
        },

        {
          title: this.$t("Available"),
          key: "enable",
          minWidth: 100,
          render: (h, params) => {
            let isOnline = {
              1: {
                title: this.$t("Enable"),
                color: "#52c41a"
              },
              0: {
                title: this.$t("Disabled"),
                color: "#ffa39e"
              }
            };
            return h(
              "span",
              {
                style: {
                  color: isOnline[params.row.enable].color || "-"
                }
              },
              isOnline[params.row.enable].title || "-"
            );
          }
        },
        {
          title: this.$t("Operator"),
          minWidth: 120,
          key: "operator"
        },
        {
          title: this.$t("Last") + this.$t("Heartbeat") + this.$t("Time"),
          key: "last_heart_time",
          minWidth: 168,
          render: (h, params) => {
            return h("span", parseTime(params.row.last_heart_time));
          }
        }
      ],
      data: [],
      offset: 0,
      limit: 10,
      order: "",
      id: 0,
      ip: "",
      LineType: [],
      selectedItems: [],
      pageinfo: {
        page_index: 0,
        page_size: 1,
        count: 2
      }
    };
  },
  methods: {
    HandleChangePage(page) {
      this.HandleGetData({
        offset: page * this.limit - this.limit,
        limit: page * this.limit || "",
        ServerGroupId: this.ServerGroupId || "",
        LineTypeId: this.LineTypeId || ""
      });
    },
    HandleSearch(v) {
      this.ip = v;
      this.HandleGetData({
        offset: 0,
        limit: this.limit,
        ServerGroupId: this.ServerGroupId || "",
        LineTypeId: this.LineTypeId || "",
        ip: this.ip || ""
      });
    },
    ChangeSelection(item) {
      this.selectedItems = item;
    },
    async HandleGetData({ offset, limit, order, linetypeid, ip }) {
      this.loading = true;
      try {
        let resp = await getDoSeedServer({
          offset,
          limit,
          order,
          linetypeid,
          ip
        });
        this.data = resp.data.data.data;
        this.pageinfo = resp.data.data.pageino;
      } catch (error) {
        this.$Message.error(
          this.$t("Get") +
            this.$t("Seeding") +
            this.$t("Server") +
            this.$t("Failed")
        );
      } finally {
        this.loading = false;
      }
    },
    async HandleGetLineType() {
      this.LineTypeDisable = true;
      try {
        let resp = await getAllenabled();
        this.LineType = resp.data.data;
        this.LineType.unshift({
          id: 0,
          name: this.$t("All") + this.$t("Type")
        });
      } catch (error) {
        this.$Message.error(
          this.$t("Get") + this.$t("Line") + this.$t("Type") + this.$t("Failed")
        );
      } finally {
        this.LineTypeDisable = false;
      }
    },
    HandleLineTypeId(id) {
      this.id = id;
      this.HandleGetData({
        offset: this.offset,
        limit: this.limit,
        order: this.order || "",
        linetypeid: this.id || "",
        ip: this.ip || ""
      });
    },
    async HandleStart() {
      if (this.selectedItems.length > 0) {
        let str = [];
        this.selectedItems.forEach(item => {
          str.push(item.ip);
        });
        try {
          await enableDoSeedServer({
            ips: str.join(",")
          });
          this.$Message.success(this.$t("Enable") + this.$t("Success"));
        } catch (error) {
          this.$Message.error(this.$t("Enable") + this.$t("Failed"));
        } finally {
          this.HandleGetData({
            offset: this.offset,
            limit: this.limit,
            order: this.order || "",
            linetypeid: this.id || "",
            ip: this.ip || ""
          });
        }
      } else {
        this.$Message.info(this.$t("PleaseSelectOneItem"));
      }
    },
    async Handledisable() {
      if (this.selectedItems.length > 0) {
        let str = [];
        this.selectedItems.forEach(item => {
          str.push(item.ip);
        });
        try {
          await disenableDoSeedServer({
            ips: str.join(",")
          });
          this.$Message.success(this.$t("Disabled") + this.$t("Success"));
        } catch (error) {
          this.$Message.error(this.$t("Disabled") + this.$t("Failed"));
        } finally {
          this.HandleGetData({
            offset: this.offset,
            limit: this.limit,
            order: this.order || "",
            linetypeid: this.id || "",
            ip: this.ip || ""
          });
        }
      } else {
        this.$Message.info(this.$t("PleaseSelectOneItem"));
      }
    }
  },
  mounted() {
    this.HandleGetData({
      offset: this.offset,
      limit: this.limit,
      order: this.order || "",
      linetypeid: this.id || "",
      ip: this.ip || ""
    });
    this.HandleGetLineType();
  }
};
</script>
<style lang="scss" scoped>
a {
  color: white;
}
.search_bar {
  display: flex;
}
</style>
