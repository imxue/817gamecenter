<template>
  <div>
    <div>
      <Input
        search
        style="width:300px"
        :enter-button="this.$t('Search')"
        :placeholder="this.$t('Input') + this.$t('IP') + this.$t('Search')"
        @on-search="HandleSearch"
      />
    </div>
    <div style="margin:10px 0;">
      <router-link
        to="/ServerManagement/FTPServer/add"
        style="marginRight:10px;"
      >
        <Button type="info">{{ $t("Add") }}</Button>
      </router-link>
      <Button type="info" @click="HandleEdit">{{ $t("Edit") }}</Button>
    </div>

    <Table
      size="small"
      :columns="columns"
      :data="data"
      :loading="loading"
      border
      @on-selection-change="ChangeSelection"
    ></Table>
    <Page
      :total="pageinfo.count"
      :page-size="limit"
      style="margin-top:10px;float:right;"
      @on-change="HandleChangePage"
    />
  </div>
</template>
<script>
import { getFtpServer, getLineType } from "@/api/server.js";
import { parseTime } from "@/utils";
export default {
  name: "TrackerIndex",
  data() {
    return {
      loading: false,
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
          title: this.$t("ExtranetDom") + "/" + this.$t("IP"),
          key: "domain",
          minWidth: 210
        },
        {
          title: this.$t("Port"),
          key: "port",
          minWidth: 90
        },
        {
          title: this.$t("Type"),
          key: "type",
          minWidth: 200,
          render: (h, params) => {
            let a = "";
            switch (params.row.type) {
              case 1:
                a = h(
                  "span",
                  this.$t("Sync") + this.$t("Source") + this.$t("Server")
                );
                break;
              case 0:
                a = h(
                  "span",
                  this.$t("Passive") + this.$t("Source") + this.$t("Server")
                );
                break;
              default:
                a = h("span", params.row.type);
                break;
            }
            return a;
          }
        },
        {
          title: this.$t("Available"),
          key: "enable",
          width: 120,
          render: (h, params) => {
            let isOnline = {
              1: {
                title: this.$t("Enable"),
                color: "#52c41a"
              },
              0: {
                title: this.$t("Disable"),
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
          key: "operator",
          width: 120
        },
        {
          title: this.$t("LastOperationTime"),
          key: "update_time",
          minWidth: 160,
          render: (h, params) => {
            return h("span", parseTime(params.row.last_heart_time));
          }
        }
      ],
      data: [],
      offset: 0,
      limit: 10,
      LineType: [],
      LineTypeId: 0,
      orderby: "",
      ip: "",
      selectedItems: []
    };
  },
  created() {
    this.HandleGetData({ offset: this.offset, limit: this.limit });
    // this.HandleGetLineType();
  },
  methods: {
    HandleSearch(v) {
      this.ip = v;
      this.HandleGetData({
        offset: 0,
        limit: this.limit,
        ip: this.ip,
        orderby: this.orderby,
        type: this.type,
        linetypeid: this.lineTypeId
      });
    },
    HandleChangePage(page) {
      this.HandleGetData({
        offset: page * this.limit - this.limit,
        limit: page * this.limit,
        orderby: this.orderby,
        type: this.type,
        linetypeid: this.lineTypeId
      });
    },
    async HandleGetData({ offset, limit, order, linetypeid, ip }) {
      this.loading = true;
      try {
        linetypeid = linetypeid === 0 ? "" : linetypeid;
        let resp = await getFtpServer({ offset, limit, order, linetypeid, ip });
        this.data = resp.data.data.data;
        this.pageinfo = resp.data.data.pageino;
      } catch (error) {
        this.$Message.error(
          this.$t("Get") + "FTP" + this.$t("Server") + this.$t("Failed")
        );
      } finally {
        this.loading = false;
      }
    },
    async HandleGetLineType() {
      try {
        let resp = await getLineType();
        this.LineType = resp.data.data;
        this.LineType.unshift({
          id: 0,
          name: this.$t("All") + this.$t("Type")
        });
      } catch (error) {
        this.$Message.error(
          this.$t("Get") + this.$t("Line") + this.$t("Type") + this.$t("Failed")
        );
      }
    },
    ChangeSelection(item) {
      this.selectedItems = item;
    },
    HandleEdit() {
      if (this.selectedItems.length === 1) {
        this.$router.push({
          path: "/ServerManagement/FTPServer/edit",
          query: this.selectedItems
        });
      } else {
        this.$Message.info(this.$t("PleaseSelectOneItem"));
      }
    }
  }
};
</script>
