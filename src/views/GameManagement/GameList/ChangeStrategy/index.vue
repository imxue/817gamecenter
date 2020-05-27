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
        enter-button="Search"
        @on-search="HandleSearch"
        placeholder="输入需要搜索的游戏名称首字母"
      />
    </div>
    <div style="marginBottom:10px;">
      <router-link
        to="/GameManagement/GameStrategy/add"
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
      border
      @on-selection-change="ChangeSelection"
      :loading="loading"
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
import { getGameVersionconfig, getAllGameTypeenabled } from "@/api/server";
import { parseTime } from "@/utils";
export default {
  name: "index",
  data() {
    return {
      loading: true,
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
          align: "center",
          fixed: "left"
        },
        {
          key: "type",
          title: this.$t("Type"),
          width: `130px`,
          render: (h, params) => {
            let a = null;
            switch (params.row.type) {
              case 1:
                a = h("span", this.$t("Global") + this.$t("Strategy"));
                break;
              case 2:
                a = h("span", this.$t("Custom") + this.$t("Strategy"));
                break;
              default:
                break;
            }
            return a;
          }
        },
        {
          key: "game_center_id",
          title: this.$t("Game") + "ID",
          minWidth: 88,
          maxWidth: 88,
          ellipsis: true,
          tooltip: true
        },
        {
          key: "game_name",
          title: this.$t("Game") + this.$t("Name"),
          minWidth: 140,
          maxWidth: 180
        },
        {
          key: "game_type_name",
          title: this.$t("Game") + this.$t("Category"),
          width: `140px`
        },
        {
          key: "load_count",
          title: this.$t("LoadCount"),
          width: `130px`
        },
        {
          key: "select_type",
          title: this.$t("SelectType"),
          width: `130px`,
          render: (h, params) => {
            let a = null;
            switch (params.row.select_type) {
              case 1:
                a = h("span", this.$t("Half"));
                break;
              case 0:
                a = h("span", this.$t("Custom"));
                break;
              default:
                break;
            }
            return a;
          }
        },
        {
          key: "enable",
          title: this.$t("Available"),
          width: `100px`,
          render: (h, params) => {
            let opt = {
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
                  color: opt[params.row.enable].color
                }
              },
              opt[params.row.enable].title
            );
          }
        },
        {
          key: "operator",
          title: this.$t("Operator"),
          width: `100px`
        },
        {
          key: "update_time",
          title: this.$t("LastOperationTime"),
          minWidth: 180,
          render: (h, params) => {
            return h("span", parseTime(params.row.update_time));
          }
        }
      ],
      data: [],
      offset: 0,
      limit: 20,
      orderby: "",
      typeid: 0,
      firstletter: "",
      GameType: []
    };
  },
  created() {
    this.HandelGetData({
      offset: this.offset,
      limit: this.limit,
      orderby: this.orderby,
      typeid: this.typeid,
      firstletter: this.firstletter
    });
    this.HandleGeTGameType();
  },
  methods: {
    HandleSearch(v) {
      this.firstletter = v;
      this.HandelGetData({
        offset: this.offset,
        limit: this.limit,
        ip: this.ip,
        order: this.orderby,
        typeid: this.lineTypeId,
        firstletter: this.firstletter
      });
    },
    HandleChangePage(page) {
      (this.offset = page * this.limit - this.limit),
        this.HandelGetData({
          offset: page * this.limit - this.limit,
          limit: page * this.limit,
          order: this.orderby,
          typeid: this.typeid,
          firstletter: this.firstletter
        });
    },
    async HandelGetData({ offset, limit, orderby, typeid, firstletter }) {
      this.loading = true;
      typeid = typeid === 0 ? "" : typeid;
      try {
        let resp = await getGameVersionconfig({
          offset,
          limit,
          orderby,
          typeid,
          firstletter
        });
        this.data = resp.data.data.data;
        this.pageinfo = resp.data.data.pageino;
      } catch (error) {
        this.$Message.error(
          this.$t("Get") +
            this.$t("Game") +
            this.$t("Strategy") +
            this.$t("Failed")
        );
      } finally {
        this.loading = false;
      }
    },
    ChangeSelection(item) {
      this.selectedItems = item;
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
    HandleEdit() {
      if (this.selectedItems.length === 1) {
        this.$router.push({
          path: "/GameManagement/GameStrategy/edit",
          query: this.selectedItems
        });
      } else {
        this.$Message.info(this.$t("PleaseSelectOneItem"));
      }
    },
    HandleChange(id) {
      this.typeid = id;
      this.HandelGetData({
        offset: this.offset,
        limit: this.limit,
        ip: this.ip,
        order: this.orderby,
        typeid: this.typeid,
        firstletter: this.firstletter
      });
    }
  }
};
</script>
