<template>
  <div>
    <div style="marginBottom:10px;display:flex;">
      <Select
        v-model.number="typeid"
        @on-change="HandleChange"
        style="width:220px;marginRight:10px;"
      >
        <Option v-for="item in GameType" :value="item.id" :key="item.id">{{
          item.name
        }}</Option>
      </Select>
      <Input
        search
        style="width:300px;"
        :enter-button="this.$t('Search')"
        @on-search="HandleSearch"
        :placeholder="this.$t('Input') + this.$t('Game') + this.$t('Name')"
      />
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
import { getAllGameTypeenabled, getClickEvent } from "@/api/server.js";

import { parseTime } from "@/utils";
export default {
  name: "index",
  data() {
    return {
      loading: true,
      value1: "",
      id: "",
      pageinfo: {
        page_index: 0,
        page_size: 1,
        count: 2
      },
      selectedItems: "",
      columns: [
        {
          key: "center_id",
          title: this.$t("Game") + "ID",
          minwidth: 110,
          width: 110,
          maxWidth: 150,
          ellipsis: true,
          tooltip: true
        },
        {
          key: "name",
          title: this.$t("Game") + this.$t("Name"),
          minWidth: 170,
          maxWidth: 180
        },
        {
          key: "type_name",
          title: this.$t("Game") + this.$t("Category"),
          minwidth: 140,
          width: 150,
          maxWidth: 160
        },
        {
          key: "click_date",
          title: "点击时间",
          minwidth: 170,
          width: 170,
          maxWidth: 180,
          render: (h, params) => {
            return h("span", parseTime(params.row.click_date));
          }
        },
        {
          key: "click_number",
          title: "点击数",
          minwidth: 150,
          width: 150,
          maxWidth: 150
        },
        {
          key: "",
          title: " "
        }
      ],
      data: [],
      offset: 0,
      limit: 10,
      orderby: "",
      typeid: 0,
      firstletter: "",
      GameType: []
    };
  },
  methods: {
    HandleSearch(v) {
      this.firstletter = v;
      this.HandleGetData({
        offset: this.offset,
        limit: this.limit,
        typeid: this.typeid,
        firstletter: this.firstletter
      });
    },
    async HandleGeTGameType() {
      try {
        let resp = await getAllGameTypeenabled();
        this.GameType = resp.data.data;
        this.GameType.unshift({
          id: 0,
          name: this.$t("All") + this.$t("Type")
        });
      } catch (error) {
        this.$Message.error(
          this.$t("Get") + this.$t("Game") + this.$t("Type") + this.$t("Failed")
        );
      }
    },
    HandleChangePage(page) {
      (this.offset = page * this.limit - this.limit),
        this.HandleGetData({
          offset: page * this.limit - this.limit,
          limit: this.limit,
          order: this.orderby || "",
          type: this.type || "",
          linetypeid: this.lineTypeId
        });
    },
    async HandleGetData({
      offset,
      limit,
      date = "",
      typeid = "",
      firstletter = ""
    }) {
      this.loading = true;
      typeid = typeid === 0 ? "" : typeid;
      try {
        let resp = await getClickEvent({
          offset,
          limit,
          date,
          typeid,
          firstletter
        });
        this.data = resp.data.data.data;
        this.pageinfo = resp.data.data.pageino;
      } catch (error) {
        this.$Message.error(
          this.$t("Get") +
            this.$t("barGameClick") +
            this.$t("Event") +
            this.$t("Failed")
        );
      } finally {
        this.loading = false;
      }
    },

    HandleChange(id) {
      this.typeid = id;
      this.HandleGetData({
        offset: this.offset,
        limit: this.limit,
        typeid: this.typeid,
        firstletter: this.firstletter
      });
    },

    HandleGetTime(data) {
      let x = new Date(data);
      let month = x.getMonth() + 1 + "";
      if (month.length === 1) {
        month = "0" + month + "";
      }

      let day = x.getDate() + "";
      if (day.length === 1) {
        day = "0" + day + "";
      }
      let Hours = x.getHours() + "";
      if (Hours.length === 1) {
        Hours = "0" + Hours + "";
      }
      let Minutes = x.getMinutes() + "";
      if (Minutes.length === 1) {
        Minutes = "0" + Minutes + "";
      }

      let Seconds = x.getSeconds() + "";
      if (Seconds.length === 1) {
        Seconds = "0" + Seconds + "";
      }

      return `${x.getFullYear()}-${month}-${day} ${Hours}:${Minutes}:${Seconds}`;
    }
  },
  created() {
    this.HandleGeTGameType();
    this.HandleGetData({
      offset: this.offset,
      limit: this.limit,
      orderby: this.orderby,
      typeid: this.typeid,
      firstletter: this.firstletter
    });
  }
};
</script>
<style lang="scss" scoped>
.item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
</style>
