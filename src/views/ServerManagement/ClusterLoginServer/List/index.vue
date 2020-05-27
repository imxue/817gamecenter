<template>
  <div>
    <div style="display:flex;">
      <Select
        v-model="LineTypeId"
        @on-change="ChangeLineType"
        style="width:220px;marginRight:10px"
      >
        <Option v-for="item in LineType" :value="item.id" :key="item.id">{{
          item.name
        }}</Option>
      </Select>
      <Input
        search
        style="width:300px;"
        :enter-button="this.$t('Search')"
        :placeholder="this.$t('Input') + this.$t('IP') + this.$t('Search')"
        @on-search="HandleSearch"
      />
    </div>
    <div style="margin:10px 0;">
      <router-link
        to="/ServerManagement/ClusterLoginServer/add"
        style="marginRight:10px;"
      >
        <Button type="info">{{ $t("Add") }}</Button>
      </router-link>
      <Button type="info" @click="HandleEdit" :disabled="loading">{{
        $t("Edit")
      }}</Button>
    </div>

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
</template>
<script>
import { getClusterLginServer, getAllenabled } from "@/api/server";
import { parseTime } from "@/utils";
export default {
  name: "TrackerIndex",
  data() {
    return {
      loading: true,
      LineType: [],
      pageinfo: {
        page_index: 0,
        page_size: 1,
        count: 2
      },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: this.$t("Online") + this.$t("Status"),
          key: "is_online",
          minWidth: 90,
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
          title: this.$t("Server") + this.$t("Type"),
          key: "type",
          minWidth: 130,
          render: (h, params) => {
            let obj = {
              0: this.$t("Cluster") + this.$t("Login") + this.$t("Server"),
              1: this.$t("Cluster") + this.$t("Comm") + this.$t("Server"),
              3: this.$t("Pierced") + this.$t("Comm"),
              4: this.$t("Pierced") + this.$t("Login"),
              5: this.$t("Upload") + this.$t("Dispatch"),
              6: this.$t("Efficiency") + this.$t("Statistics"),
              7: this.$t("Port") + this.$t("Detection")
            };

            return h("span", obj[params.row.type]);
          }
        },
        {
          title: "IP",
          key: "server_ip",
          width: 140
        },
        {
          title: this.$t("Port"),
          key: "port",
          width: 90
        },
        {
          title: this.$t("Line") + this.$t("Type"),
          key: "line_type",
          width: 100
        },
        {
          title: this.$t("Program") + this.$t("Version"),
          key: "version",
          minWidth: 100
        },
        {
          title: this.$t("Available"),
          key: "status",
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
                  color: isOnline[params.row.status].color || "-"
                }
              },
              isOnline[params.row.status].title || "-"
            );
          }
        },
        {
          title: this.$t("Last") + this.$t("Heartbeat") + this.$t("Time"),
          key: "last_heart_time",
          width: 185,
          render: (h, params) => {
            return h("span", parseTime(params.row.last_heart_time));
          }
        },
        {
          title: this.$t("Operator"),
          key: "operator",
          minWidth: 100
        },
        {
          title: this.$t("LastOperationTime"),
          key: "update_time",
          minWidth: 170,
          render: (h, params) => {
            return h("span", parseTime(params.row.update_time));
          }
        }
      ],
      data: [],
      offset: 0,
      limit: 10,
      LineTypeId: 0,
      orderby: "",
      selectedItems: []
    };
  },
  created() {
    this.HandleGetData({ offset: this.offset, limit: this.limit });
    this.HandleGetLineType();
  },
  methods: {
    HandleChangePage(page) {
      this.HandleGetData({
        offset: page * this.limit - this.limit,
        limit: page * this.limit,
        order: this.orderby,
        type: this.type,
        linetypeid: this.lineTypeId
      });
    },
    HandleSearch(v) {
      this.ip = v + "";
      this.HandleGetData({
        offset: this.offset,
        limit: this.limit,
        ip: this.ip,
        order: this.orderby,
        linetypeid: this.lineTypeId
      });
    },
    async ChangeLineType(id) {
      this.LineTypeId = id;
      this.HandleGetData({
        offset: this.offset,
        limit: this.limit,
        order: this.orderby,
        linetypeid: this.LineTypeId,
        ip: this.ip
      });
    },
    async HandleGetData({ offset, limit, order, linetypeid, ip }) {
      this.loading = true;
      try {
        linetypeid = linetypeid === 0 ? "" : linetypeid;
        let resp = await getClusterLginServer({
          offset,
          limit,
          order,
          linetypeid,
          ip
        });
        this.data = resp.data.data.data;
        this.pageinfo = resp.data.data.pageino;
      } catch (error) {
        this.$Message.error(error);
      } finally {
        this.loading = false;
      }
    },
    async HandleGetLineType() {
      try {
        let resp = await getAllenabled();
        this.LineType = resp.data.data;
        this.LineType.unshift({
          id: 0,
          name: this.$t("All") + this.$t("Type")
        });
      } catch (error) {
        this.$Message.error(error);
      }
    },
    ChangeSelection(item) {
      this.selectedItems = item;
    },
    HandleEdit() {
      if (this.selectedItems.length === 1) {
        this.$router.push({
          path: "/ServerManagement/ClusterLoginServer/edit",
          query: this.selectedItems
        });
      } else {
        this.$Message.info(this.$t("PleaseSelectOneItem"));
      }
    }
  }
};
</script>
