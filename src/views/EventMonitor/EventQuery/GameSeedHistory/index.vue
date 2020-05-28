<template>
  <div>
    <div style="marginBottom:10px;">
      <Input
        search
        style="width:300px;"
        :enter-button="this.$t('Search')"
        @on-search="HandleSearch"
        :placeholder="this.$t('sgf')"
      />
    </div>
    <Table
      context-menu
      show-context-menu
      :columns="columns"
      :data="data"
      border
      :loading="loading"
      @on-contextmenu="handleContextMenu"
    >
      <template slot="contextMenu">
        <DropdownItem @click.native="handleContextMenuEdit">{{
          $t("Edit")
        }}</DropdownItem>
        <DropdownItem
          @click.native="handleContextMenuDelete"
          style="color: #ed4014"
          >{{ $t("Delete") }}</DropdownItem
        >
      </template>
    </Table>
    <Page
      :total="pageinfo.count"
      :page-size="limit"
      style="margin-top:10px;float:right;"
      @on-change="HandleChangePage"
    />
  </div>
</template>
<script>
import { getGamedoseedVersion } from "@/api/server.js";
import { parseTime } from "@/utils";
import { kbtosize } from "../../../../utils/index";
export default {
  name: "GameState",
  data() {
    return {
      contextLine: 0,
      columns: [
        {
          key: "is_over",
          title: this.$t("Success"),
          width: "120px",
          render: (h, params) => {
            let opt = {
              1: {
                title: this.$t("Complete"),
                color: "#52c41a"
              },
              0: {
                title: this.$t("Incomplete"),
                color: "#ffa39e"
              }
            };
            return h(
              "span",
              {
                style: {
                  color: opt[params.row.is_over].color
                }
              },
              opt[params.row.is_over].title
            );
          }
        },
        {
          key: "game_center_id",
          title: this.$t("Game") + "ID",
          width: "90px",
          ellipsis: true,
          tooltip: true
        },
        {
          key: "game_name",
          title: this.$t("Game") + this.$t("Name"),
          minWidth: 140
        },
        {
          key: "game_type_name",
          title: this.$t("Game") + this.$t("Category"),
          minWidth: 130
        },
        {
          key: "doseed_server_ip",
          title: this.$t("DoseedServerip"),
          width: "160px"
        },
        // {
        //   key: "start_time",
        //   title: this.$t("StartDoseedTime"),
        //   minWidth: 185,
        //   render: (h, params) => {
        //     return h("span", parseTime(params.row.start_time));
        //   }
        // },

        {
          key: "update_time",
          title: this.$t("UpdateTime"),
          minWidth: 185,
          render: (h, params) => {
            return h("span", parseTime(params.row.update_time));
          }
        },
        {
          key: "version_code",
          title: this.$t("Game") + this.$t("Version"),
          minWidth: 150
        },
        {
          key: "torrent_url",
          title: this.$t("Seed") + this.$t("URL"),
          minWidth: 135,
          tooltip: true,
          ellipsis: true
        },
        {
          key: "torrent_md5",
          title: this.$t("Seed") + this.$t("MD5"),
          minWidth: 135,
          tooltip: true,
          ellipsis: true
        },
        {
          key: "type",
          title: this.$t("Seed") + this.$t("Type"),
          minWidth: 135,
          render: (h, param) => {
            let a = null;
            switch (param.row.type) {
              case 1:
                a = h("span", this.$t("IncrementalPacket"));
                break;
              case 0:
                a = h("span", this.$t("CompletePacket"));
                break;
              default:
                a = h("span", param.row.type);
                break;
            }
            return a;
          }
        },
        {
          key: "torrent_size",
          title: this.$t("Seed") + this.$t("Size"),
          width: "135px",
          render: (h, params) => {
            return h("span", kbtosize(params.row.torrent_size));
          }
        },
        {
          key: "name",
          width: "120px",
          title: this.$t("Operator")
        }
      ],
      data: [],
      offset: 0,
      limit: 10,
      orderby: "update_time",
      firstletter: "",
      loading: false,
      pageinfo: {
        page_index: 0,
        page_size: 1,
        count: 2
      }
    };
  },
  methods: {
    async HandleSearch(name) {
      this.firstletter = name;
      this.HandleGetData({
        offset: this.offset,
        limit: this.limit,
        orderby: this.orderby,
        firstletter: this.firstletter
      });
    },
    HandleChangePage(page) {
      this.HandleGetData({
        offset: page * this.limit - this.limit,
        limit: page * this.limit,
        ServerGroupId: this.ServerGroupId,
        LineTypeId: this.LineTypeId
      });
    },
    async HandleGetData({ offset, limit, orderby, firstletter }) {
      orderby += " DESC";
      try {
        this.loading = true;
        let resp = await getGamedoseedVersion({
          offset,
          limit,
          orderby,
          firstletter
        });
        this.data = resp.data.data.data;
        this.pageinfo = resp.data.data.pageino;
      } catch (error) {
        this.$Message.error(
          this.$t("Get") + this.$t("Data") + this.$t("Failed")
        );
      } finally {
        this.loading = false;
      }
    },
    handleContextMenu(row) {
      const index = this.data.findIndex(item => item.name === row.name);
      this.contextLine = index + 1;
    },
    handleContextMenuEdit() {
      this.$Message.info("Click edit of line" + this.contextLine);
    },
    handleContextMenuDelete() {
      this.$Message.info("Click delete of line" + this.contextLine);
    }
  },
  async created() {
    this.HandleGetData({
      offset: this.offset,
      limit: this.limit,
      orderby: this.orderby,
      firstletter: this.firstletter
    });
  }
};
</script>
