<template>
  <div>
    <div>
      <router-link
        to="/ServerManagement/BtServerGroup/add"
        style="margin-right:10px;"
      >
        <Button type="success">
          {{ $t("Add") }}
        </Button>
      </router-link>
      <Button type="info" @click="HandleEdit">
        {{ $t("Edit") }}
      </Button>
    </div>
    <div style="margin-top:10px;">
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
  </div>
</template>

<script>
import { getBTServerGroup } from "@/api/server";
import { parseTime } from "@/utils";
export default {
  name: "GroupIndex",
  data() {
    return {
      loading: true,
      data: [],
      selectedItems: [],
      offset: 0,
      limit: 11,
      pageinfo: {
        count: 0
      }
    };
  },
  computed: {
    columns: function() {
      return [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: this.$t("Group") + this.$t("Name"),
          key: "name",
          minWidth: 90,
          maxWidth: 120,
          render: (h, params) => {
            let a;
            let b;
            if (params.row.is_default === 1) {
              a = h(
                "tag",
                {
                  props: {
                    color: "success"
                  }
                },
                this.$t("defaultGroup")
              );
              b = h("span", params.row.name);
              return [a, b];
            } else {
              return h("span", params.row.name);
            }
          }
        },
        {
          title: this.$t("Available"),
          key: "enable",
          minWidth: 90,
          maxWidth: 120,
          render: (h, params) => {
            let a = "";
            switch (params.row.enable) {
              case 1:
                a = h(
                  "span",
                  {
                    style: {
                      color: "#52c41a"
                    }
                  },
                  this.$t("Enable")
                );
                break;
              case 0:
                a = h(
                  "span",
                  {
                    style: {
                      color: "#ffa39e"
                    }
                  },
                  this.$t("Disabled")
                );
                break;
              default:
                a = h("span", params.row.enable);
                break;
            }
            return a;
          }
        },
        {
          title: this.$t("Operator"),
          key: "operator",
          minWidth: 90,
          maxWidth: 120
        },
        {
          title: this.$t("LastOperationTime"),
          key: "update_time",
          minWidth: 120,
          maxWidth: 180,
          render: (h, params) => {
            return h("span", parseTime(params.row.update_time));
          }
        },
        {
          title: " ",
          key: ""
        }
      ];
    }
  },
  async created() {
    this.FetchData({ offset: this.offset, limit: this.limit });
  },
  methods: {
    async HandleChangePage(current) {
      this.offset = (current - 1) * this.limit;
      let params = {
        offset: this.offset,
        limit: this.limit
      };
      this.FetchData(params);
    },
    async FetchData(params) {
      try {
        let resp = await getBTServerGroup(params);
        this.data = resp.data.data.data;
        this.pageinfo = resp.data.data.pageino;
      } catch (error) {
        this.$Message.error(
          this.$t("Get") +
            this.$t("ServerGroup") +
            this.$t("Data") +
            this.$t("Failed")
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
          path: "/ServerManagement/BtServerGroup/edit",
          query: this.selectedItems
        });
      } else {
        this.$Message.info(this.$t("PleaseSelectOneItem"));
      }
    }
  }
};
</script>
<style lang="scss" scoped>
a {
  color: white;
}
</style>
