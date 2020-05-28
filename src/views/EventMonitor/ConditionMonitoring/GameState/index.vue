<template>
  <div>
    <div style="marginBottom:10px;display:flex;">
      <Select
        v-model="state"
        @on-change="HandelsysncStat"
        style="width:220px;marginRight:10px;"
      >
        <Option v-for="item in sysncStat" :value="item.id" :key="item.id">{{
          item.title
        }}</Option>
      </Select>
      <Select
        v-model="typeid"
        @on-change="HandelTypeid"
        style="width:220px;marginRight:10px;"
      >
        <Option v-for="item in typeArray" :value="item.id" :key="item.id">{{
          item.display_name
        }}</Option>
      </Select>
      <Input
        search
        style="width:300px"
        :enter-button="this.$t('Search')"
        @on-search="HandleSearch"
        :placeholder="this.$t('Input') + this.$t('Game') + this.$t('Name')"
      />
    </div>
    <Table :columns="columns" :data="data" border :loading="loading"></Table>
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
import { getGameStatus, getAllGameTypeenabled } from "@/api/server.js";

export default {
  name: "GameState",
  data() {
    return {
      loading: false,
      columns: [
        {
          key: "game_center_id",
          title: this.$t("Game") + "ID",
          minWidth: 90,
          ellipsis: true,
          tooltip: true
        },
        {
          key: "game_name",
          title: this.$t("Game") + this.$t("Name"),
          minWidth: 180
        },
        {
          key: "game_type_name",
          title: this.$t("Game") + this.$t("Category"),
          minWidth: 100
        },
        {
          key: "official_version",
          title: this.$t("Game") + this.$t("Formal") + this.$t("Version"),
          minWidth: 150
        },
        {
          key: "latest_doseed_version",
          title: this.$t("Latest") + this.$t("Doseed") + this.$t("Version"),
          minWidth: 150
        },
        {
          key: "allocate_server_count",
          title: this.$t("Allocated") + this.$t("Server"),
          minWidth: 128
        },
        {
          key: "sync_completion_count",
          title: this.$t("NumberofSyncedCompleted"),
          minWidth: 128
        },
        {
          key: "sync_completion_rate",
          title: this.$t("SyncCompletRate"),
          minWidth: 130
        },
        {
          key: "action",
          title: this.$t("Operation"),
          minWidth: 160,
          fixed: "right",
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: "primary",
                  size: "small"
                },
                on: {
                  click: () => {
                    this.HandleGO(params);
                  }
                }
              },
              this.$t("View")
            );
          }
        }
      ],
      sysncStat: [
        {
          id: 999,
          title: this.$t("All") + this.$t("Status")
        },
        {
          id: 0,
          title: this.$t("UnSync")
        },
        {
          id: 1,
          title: this.$t("Synching")
        },
        {
          id: 2,
          title: this.$t("Done")
        }
      ],
      data: [],
      offset: 0,
      limit: 10,
      orderby: "",
      state: 999,
      typeid: 0,
      firstletter: "",
      typeArray: [],
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
        limit: this.limit,
        ServerGroupId: this.ServerGroupId,
        LineTypeId: this.LineTypeId
      });
    },
    async HandelTypeid(id) {
      this.typeid = id;
      this.HandleGetData({
        offset: this.offset,
        limit: this.limit,
        orderby: this.orderby,
        state: this.state,
        typeid: this.typeid,
        firstletter: this.firstletter
      });
    },
    async HandleSearch(name) {
      this.firstletter = name;
      this.HandleGetData({
        offset: this.offset,
        limit: this.limit,
        orderby: this.orderby,
        state: this.state,
        typeid: this.typeid,
        firstletter: this.firstletter
      });
    },
    async HandleGetData({
      offset,
      limit,
      orderby,
      state,
      typeid,
      firstletter
    }) {
      try {
        this.loading = true;
        let resp = await getGameStatus({
          offset,
          limit,
          orderby,
          state,
          typeid,
          firstletter
        });
        this.data = resp.data.data.data;
        this.data.forEach(item => {
          item.sync_completion_rate =
            item.sync_completion_rate.toFixed(2) + "%";
        });
        this.pageinfo = resp.data.data.pageino;
      } catch (error) {
        this.$Message.error(
          this.$t("Get") +
            this.$t("Game") +
            this.$t("Status") +
            this.$t("Failed")
        );
      } finally {
        this.loading = false;
      }
    },
    async HandelsysncStat(name) {
      this.state = name;
      this.HandleGetData({
        offset: this.offset,
        limit: this.limit,
        orderby: this.orderby,
        state: this.state,
        typeid: this.typeid,
        firstletter: this.firstletter
      });
    },
    async HandleGetGameType() {
      try {
        let resp = await getAllGameTypeenabled();
        this.typeArray = resp.data.data;
        this.typeArray.unshift({
          id: 0,
          display_name: this.$t("All") + this.$t("Type")
        });
      } catch (error) {
        this.$Message.error(
          this.$t("Get") + this.$t("Game") + this.$t("Type") + this.$t("Failed")
        );
      }
    },
    HandleGO(data) {
      this.$router.push({
        path: "/EventMonitoring/ConditionMonitoring/GameState/GameDtails",
        query: data.row
      });
    }
  },
  async created() {
    Promise.all([
      this.HandleGetData({
        offset: this.offset,
        limit: this.limit,
        orderby: this.orderby,
        state: this.state,
        typeid: this.typeid,
        firstletter: this.firstletter
      }),
      this.HandleGetGameType()
    ]);
  }
};
</script>
