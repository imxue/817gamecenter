<template>
  <div>
    <div :gutter="16" style="marginBottom:10px;">
      <!-- <router-link
        to="/GameManagement/gamecompany/add"
        style="margin-right:10px;"
      > -->
      <Button
        style="margin-right:10px;"
        type="info"
        @click="HandleAddGameCompany"
        >{{ $t("Add") }}</Button
      >
      <!-- </router-link> -->
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
      :total="pageInfo.count"
      :page-size="limit"
      style="float:right; margin-top:10px;"
      @on-change="HandleChangePage"
    />
    <Modal footer-hide v-model="GameCompanyModel" :title="this.$t('agm')">
      <component
        ref="GameCompanyModel"
        v-bind:is="currentTabComponent"
        :oldGameCompany="this.selectedItems"
        @GameCompanyResult="HandleResult"
      ></component>
    </Modal>
  </div>
</template>
<script>
import { getGameCompany } from "@/api/server";
import { parseTime } from "@/utils";
import addGameCompany from "./add";
import editGameCompany from "./edit";
export default {
  name: "index",
  components: {
    addGameCompany,
    editGameCompany
  },
  data() {
    return {
      offset: 0,
      GameCompanyModel: false,
      currentTabComponent: "addGameCompany",
      limit: 11,
      loading: true,
      pageInfo: {},
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          key: "name",
          minWidth: 90,
          maxWidth: 180,
          title: this.$t("Game") + this.$t("Company") + this.$t("Name")
        },
        {
          key: "description",
          minWidth: 90,
          maxWidth: 180,
          title: this.$t("Remarks")
        },
        {
          key: "status",
          minWidth: 90,
          maxWidth: 180,
          title: this.$t("Available"),
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
                  color: opt[params.row.status].color
                }
              },
              opt[params.row.status].title
            );
          }
        },
        {
          key: "operator",
          minWidth: 90,
          maxWidth: 110,
          title: this.$t("Operator")
        },
        {
          key: "update_time",
          minWidth: 90,
          maxWidth: 180,
          title: this.$t("LastOperationTime"),
          render: (h, params) => {
            return h("span", parseTime(params.row.update_time));
          }
        },
        {
          key: "",
          title: " "
        }
      ],
      data: [],
      selectedItems: []
    };
  },
  created() {
    this.HandleGetData({ offset: this.offset, limit: this.limit });
  },
  methods: {
    HandleChangePage(current) {
      this.offset = (current - 1) * this.limit;
      let params = {
        offset: this.offset,
        limit: this.limit
      };
      this.HandleGetData(params);
    },
    async HandleGetData(params) {
      this.loading = true;
      try {
        let resp = await getGameCompany(params);
        this.data = resp.data.data.data;
        this.pageInfo = resp.data.data.pageino;
      } catch (error) {
        this.$Message.error(
          this.$t("Get") +
            this.$t("Game") +
            this.$t("Company") +
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
        this.GameCompanyModel = true;
        this.$refs.GameCompanyModel.handleReset();
        this.currentTabComponent = "editGameCompany";
      } else {
        this.$Message.info(this.$t("PleaseSelectOneItem"));
      }
    },
    HandleAddGameCompany() {
      this.currentTabComponent = "addGameCompany";
      this.GameCompanyModel = true;
      this.$refs.GameCompanyModel.handleReset();
    },
    HandleResult() {
      this.GameCompanyModel = false;
      this.HandleGetData({ offset: this.offset, limit: this.limit });
      this.$refs.GameCompanyModel.handleReset();
    }
  }
};
</script>
