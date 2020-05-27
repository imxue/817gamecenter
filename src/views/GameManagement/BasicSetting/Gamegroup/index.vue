<template>
  <div>
    <div :gutter="16" style="marginBottom:10px;">
      <router-link
        to="/GameManagement/GameGroup/add"
        style="margin-right:10px;"
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
      :loading="loading"
      @on-selection-change="ChangeSelection"
    ></Table>
    <Page
      show-total
      :total="pageinfo.count"
      :page-size="limit"
      style="float:right; margin-top:10px;"
      @on-change="HandleChangePage"
    />
  </div>
</template>
<script>
import { getGameType } from "@/api/server";
export default {
  name: "index",
  data() {
    return {
      loading: true,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          key: "name",
          title: this.$t("Group") + this.$t("Name"),
          width: 150
        },
        {
          key: "display_name",
          title: this.$t("Group") + this.$t("Display") + this.$t("Name"),
          minWidth: 160,
          maxWidth: 160
        },
        {
          key: "subtype_id",
          title: this.$t("Subtype"),
          minWidth: 160,
          maxWidth: 160,
          render: (h, params) => {
            let a = null;
            switch (params.row.subtype_id) {
              case 0:
                a = h(
                  "span",
                  this.$t("General") + this.$t("Game") + this.$t("Category")
                );
                break;
              case 1:
                a = h(
                  "span",
                  this.$t("Popular") + this.$t("Game") + this.$t("Category")
                );
                break;
              case 2:
                a = h(
                  "span",
                  this.$t("System") + this.$t("Tool") + this.$t("Category")
                );
                break;
              default:
                a = h("span", params.row.subtype_id);
                break;
            }
            return a;
          }
        },
        {
          key: "default_download_dir",
          title: this.$t("Default") + this.$t("Download") + this.$t("Path"),
          width: 188
        },
        {
          key: "is_console_display",
          title: this.$t("Console") + this.$t("Display"),
          width: 144,
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
                  color: opt[params.row.is_console_display].color || ""
                }
              },
              opt[params.row.is_console_display].title || ""
            );
          }
        },
        {
          key: "enable",
          title: this.$t("Status"),
          width: "100",
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
                  color: opt[params.row.enable].color || ""
                }
              },
              opt[params.row.enable].title || ""
            );
          }
        },
        {
          key: "operator",
          title: this.$t("Operator"),
          width: "100"
        },
        {
          key: "",
          title: " "
        }
      ],
      data: [],
      selectedItems: [],
      offset: 0,
      limit: 10,
      pageinfo: {}
    };
  },
  created() {
    this.HandleGetData({ offset: this.offset, limit: this.limit });
  },
  methods: {
    HandleChangePage(current) {
      this.offset = (current - 1) * this.limit;
      this.HandleGetData({ offset: this.offset, limit: this.limit });
    },
    async HandleGetData(params) {
      this.loading = true;
      try {
        let resp = await getGameType(params);
        this.data = resp.data.data.data;
        this.pageinfo = resp.data.data.pageino;
      } catch (error) {
        this.$Message.error(
          this.$t("Get") + this.$t("Game") + this.$t("Type") + this.$t("Failed")
        );
      } finally {
        this.loading = false;
      }
    },
    ChangeSelection(item) {
      this.selectedItems = item;
    },
    HandleEdit() {
      if (this.selectedItems.length === 1) {
        this.$router.push({
          path: "/GameManagement/Gamegroup/edit",
          query: this.selectedItems
        });
      } else {
        this.$Message.info(this.$t("PleaseSelectOneItem"));
      }
    }
  }
};
</script>
