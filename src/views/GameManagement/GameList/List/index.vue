<template>
  <div>
    <div style="marginBottom:10px;display:flex;">
      <Select
        v-model="typeid"
        @on-change="HandleChange"
        style="width:220px;margin-right:10px;"
      >
        <Option v-for="item in GameType" :value="item.id" :key="item.id">{{
          item.name
        }}</Option>
      </Select>
      <Input
        search
        style="width:300px"
        :enter-button="this.$t('Search')"
        @on-search="HandleSearch"
        placeholder="输入游戏搜索名称查询"
      />
    </div>
    <div style="marginBottom:10px;">
      <Button
        type="info"
        style="marginRight:10px;"
        @click="HandleChangeToAdd"
        >{{ $t("Add") }}</Button
      >
      <Button type="info" @click="HandleEdit">{{ $t("Edit") }}</Button>
    </div>
    <Table
      size="small"
      :columns="columns"
      :data="data"
      border
      stripe
      :loading="loading"
      @on-selection-change="ChangeSelection"
    ></Table>
    <Page
      show-total
      :total="pageinfo.count"
      :current="this.index"
      :page-size="limit"
      style="margin-top:10px;float:right;"
      @on-change="HandleChangePage"
    />
  </div>
</template>
<script>
import { getGame, getAllGameTypeenabled } from "@/api/server";
import { parseTime } from "@/utils";
export default {
  name: "index",
  data() {
    return {
      loading: true,
      selectedItems: [],
      columns: [
        {
          type: "selection",
          width: 58
        },
        {
          key: "center_id",
          title: this.$t("Game") + "ID",
          width: `90px`,
          ellipsis: true,
          tooltip: true
        },
        {
          key: "name",
          title: this.$t("Game") + this.$t("Name"),
          minWidth: 180,
          maxWidth: 190,
          ellipsis: true,
          tooltip: true
        },
        {
          key: "display_name",
          title: this.$t("Game") + this.$t("Display") + this.$t("Name"),
          width: `200px`
        },
        {
          key: "type_name",
          title: this.$t("Game") + this.$t("Category"),
          width: `140px`
        },
        {
          key: "popularity",
          title: this.$t("Center") + this.$t("Fever"),
          minWidth: 100,
          maxWidth: 100
        },
        {
          key: "is_console_display",
          title: this.$t("Console") + this.$t("Display"),
          minWidth: 128,
          maxWidth: 128,
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
                  color: opt[params.row.is_console_display].color
                }
              },
              opt[params.row.is_console_display].title
            );
          }
        },
        {
          key: "is_menu_display",
          title: this.$t("Menu") + this.$t("Display"),
          minWidth: 114,
          maxWidth: 114,
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
                  color: opt[params.row.is_menu_display].color
                }
              },
              opt[params.row.is_menu_display].title
            );
          }
        },

        {
          key: "enable",
          title: this.$t("Available"),
          minWidth: 100,
          maxWidth: 100,
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
          align: "center",
          title: this.$t("Operator"),
          width: `90px`
        },
        {
          key: "update_tm",
          title: this.$t("LastOperationTime"),
          minWidth: 150,
          maxWidth: 150,
          render: (h, params) => {
            return h("span", parseTime(params.row.update_tm));
          }
        },
        {
          key: "",
          title: " "
        }
      ],
      data: [],
      offset: 0,
      limit: 15,
      orderby: "update_tm desc",
      typeid: 0,
      firstletter: "",
      GameType: [],
      index: 1,
      pageinfo: {
        page_index: 0,
        page_size: 1,
        count: 2
      }
    };
  },
  created() {
    if (this.$route.query.lastrPage) {
      this.offset = Number(this.$route.query.lastrPage) - this.limit;
      this.index = Number(this.$route.query.lastrPage) / this.limit + 1;
    }
    if (this.$route.query.offset) {
      this.offset = Number(this.$route.query.offset);
      this.index = Number(this.$route.query.index) + 1;
    }
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
        offset: 0,
        limit: this.limit,
        orderby: this.orderby,
        typeid: this.typeid,
        firstletter: this.firstletter
      });
    },
    HandleChangePage(page) {
      this.offset = page * this.limit - this.limit;
      this.HandelGetData({
        offset: this.offset,
        limit: this.limit,
        orderby: this.orderby,
        typeid: this.typeid || "",
        linetypeid: this.lineTypeId || ""
      });
    },
    async HandelGetData({ offset, limit, orderby, typeid, firstletter }) {
      this.loading = true;
      typeid = typeid === 0 ? "" : typeid;
      try {
        let resp = await getGame({
          offset,
          limit,
          orderby,
          typeid,
          firstletter
        });
        this.data = resp.data.data.data;
        this.pageinfo = resp.data.data.pageino;
        let GameDisplayName = this.data.map(item => item.display_name);
        this.$store.dispatch("Save_Game_displayname", GameDisplayName);
        let GameName = this.data.map(item => item.name);
        this.$store.dispatch("Save_Game_name", GameName);
      } catch (error) {
        this.$Message.error(
          this.$t("Get") + this.$t("Game") + this.$t("Failed")
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
          path: `/GameManagement/GameList/edit?page=${this.offset}&index=${this.pageinfo.page_index}`,
          query: this.selectedItems
        });
      } else {
        this.$Message.info(this.$t("PleaseSelectOneItem"));
      }
    },
    HandleChange(id) {
      this.offset = 0;
      this.typeid = id;
      this.HandelGetData({
        offset: this.offset,
        limit: this.limit,
        orderby: this.orderby,
        typeid: this.typeid,
        firstletter: this.firstletter
      });
    },
    HandleChangeToAdd() {
      this.$router.push({
        path: `/GameManagement/GameList/add?count=${this.pageinfo.count}`
      });
    }
  }
};
</script>
