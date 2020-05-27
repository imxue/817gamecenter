<template>
  <div>
    <div style="display:flex;">
      <Select
        v-model="type"
        @on-change="HandleServerTypeId"
        style="width:220px;marginRight:10px"
      >
        <Option :value="9999">{{ $t("All") }}{{ $t("Type") }}</Option>
        <Option :value="0">{{ this.$t("BTServer"), }}</Option>
        <Option :value="1">{{ this.$t("BTClient") }}</Option>
      </Select>
      <Select
        style="width:220px;marginRight:10px"
        v-model="lineTypeId"
        @on-change="HandleServerlineTypeId"
        :disabled="Selectdisabled"
      >
        <Option v-for="item in lineType" :value="item.id" :key="item.id">{{
          item.name
        }}</Option>
      </Select>
      <Input
        style="width:300px"
        search
        :enter-button="this.$t('Search')"
        @on-search="HandleSearch"
        :placeholder="this.$t('Input') + this.$t('IP') + this.$t('Search')"
      />
    </div>

    <div style="margin:10px 0;">
      <router-link to="/ServerManagement/Tracker/add" style="marginRight:10px">
        <Button type="info">{{ $t("Add") }}</Button>
      </router-link>
      <Button
        type="info"
        @click="HandlEdit"
        :disabled="loading"
        style="marginRight:10px"
        >{{ $t("Edit") }}</Button
      >
      <Button type="info" @click="HandlesetRunConfig" :disabled="loading"
        >{{ $t("Set") }}{{ $t("RunConfig") }}</Button
      >
    </div>
    <Table
      size="small"
      :columns="columns"
      :data="data"
      border
      :loading="loading"
      @on-select="SelectItem"
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
import { getbtTracker, getAllenabled } from "@/api/server";
import { parseTime } from "@/utils";
export default {
  name: "TrackerIndex",
  data() {
    return {
      loading: false,
      Selectdisabled: false, // 线路
      selectedItems: [],
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
          maxWidth: 100,
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
          title: this.$t("Type"),
          key: "type",
          width: 140,
          render: (h, params) => {
            let opt = {
              0: this.$t("BTServer"),
              1: this.$t("BTClient")
            };
            return h("span", opt[params.row.type]);
          }
        },
        {
          title: this.$t("Region"),
          key: "area_name",
          width: 100
        },
        {
          title: this.$t("Line") + this.$t("Type"),
          key: "line_type",
          width: 100
        },
        {
          title: this.$t("IP") + this.$t("Address"),
          width: 138,
          key: "ip"
        },
        {
          title: this.$t("ExtranetDom") + "/" + this.$t("IP"),
          width: 210,
          key: "domain"
        },
        {
          title: this.$t("Program") + this.$t("Version"),
          key: "version",
          minWidth: 100,
          maxWidth: 100
        },
        {
          title: this.$t("Last") + this.$t("Heartbeat") + this.$t("Time"),
          key: "last_heart_time",
          width: 170,
          render: (h, params) => {
            return h("span", parseTime(params.row.last_heart_time));
          }
        },
        {
          title: this.$t("Status"),
          key: "enable",
          width: 100,
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
          key: "operator",
          minWidth: 100
        },
        {
          title: this.$t("Last") + this.$t("Operation") + this.$t("Time"),
          key: "update_time",
          minWidth: 178,
          render: (h, params) => {
            return h("span", parseTime(params.row.update_time));
          }
        }
      ],
      data: [],
      type: 9999, //服务器类型
      lineType: [], // 线路类型
      lineTypeId: 0, // 选择的线路id
      offset: 0,
      limit: 10,
      orderby: "",
      ip: ""
    };
  },
  created() {
    this.HandlegetLineType();
    this.HandleGetData({ offset: this.offset, limit: this.limit });
  },
  methods: {
    HandleSearch(v) {
      this.ip = v;
      this.HandleGetData({
        offset: 0,
        limit: this.limit,
        ServerGroupId: this.ServerGroupId,
        LineTypeId: this.LineTypeId,
        ip: this.ip
      });
    },
    HandleChangePage(page) {
      this.HandleGetData({
        offset: page * this.limit - this.limit,
        limit: page * this.limit,
        orderby: this.orderby || "",
        type: this.type === 0 ? 0 : this.type,
        linetypeid: this.lineTypeId
      });
    },
    async HandleGetData({ offset, limit, orderby, type, linetypeid, ip }) {
      type = type === 9999 ? "" : type === 0 ? 0 : type;
      linetypeid = linetypeid === 0 ? "" : linetypeid;
      this.loading = true;
      try {
        let resp = await getbtTracker({
          offset,
          limit,
          orderby,
          type,
          linetypeid,
          ip
        });
        this.data = resp.data.data.data;
        this.pageinfo = resp.data.data.pageino;
      } catch (error) {
        this.$Message.info(error);
      } finally {
        this.loading = false;
      }
    },
    async HandlegetLineType() {
      this.Selectdisabled = true;
      try {
        let resp = await getAllenabled();
        this.lineType = resp.data.data;
        this.lineType.unshift({
          id: 0,
          name: this.$t("All") + this.$t("Line") + this.$t("Type")
        });
      } catch (error) {
        this.$Message.info(
          this.$t("Get") + this.$t("Line") + this.$t("Type") + this.$t("Failed")
        );
      } finally {
        this.Selectdisabled = false;
      }
    },
    SelectItem(item) {
      this.selectedItems = item;
    },
    HandleServerTypeId(id) {
      this.type = id === 0 ? 0 : id;
      this.HandleGetData({
        offset: this.offset,
        limit: this.limit,
        orderby: this.orderby || "",
        type: this.type,
        linetypeid: this.linetypeid
      });
    },
    HandleServerlineTypeId(id) {
      this.linetypeid = id;
      this.HandleGetData({
        offset: this.offset,
        limit: this.limit,
        orderby: this.orderby,
        type: this.type,
        linetypeid: this.linetypeid
      });
    },
    HandlEdit() {
      if (this.selectedItems.length === 1) {
        this.$router.push({
          path: "/ServerManagement/Tracker/edit",
          query: this.selectedItems
        });
      } else {
        this.$Message.info(this.$t("PleaseSelectOneItem"));
      }
    },
    HandlesetRunConfig() {
      if (this.selectedItems.length === 1) {
        this.$router.push({
          path: "/ServerManagement/Tracker/setRunConfig",
          query: this.selectedItems
        });
      } else {
        this.$Message.info(this.$t("PleaseSelectOneItem"));
      }
    }
  }
};
</script>
