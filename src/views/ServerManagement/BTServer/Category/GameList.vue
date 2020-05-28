<template>
  <div>
    <div style="margin-bottom:10px; display:flex;">
      <Select
        :disabled="loading"
        v-model="operateType"
        style="width:200px;margin-right:10px;"
        @on-change="HandleOperateType"
      >
        <Option
          v-for="item in operateTypeList"
          :value="item.value"
          :key="item.value"
          >{{ item.label }}</Option
        >
      </Select>
      <Input
        :disabled="loading"
        search
        style="width:300px;margin-right:10px;"
        :enter-button="this.$t('Search')"
        @on-search="HandleSearch"
        :placeholder="this.$t('igm')"
      />
    </div>
    <Table
      size="small"
      :columns="columns1"
      :data="showList"
      border
      stripe
      :loading="loading"
      @on-sort-change="handleSortChange"
    >
    </Table>
    <Page
      show-total
      :total="gameList.length"
      :page-size="limit"
      style="margin-top:10px;float:right;"
      @on-change="HandleChangePage"
    />
  </div>
</template>
<script>
import { getGameListByIp } from "@/api/server";
import { Bytestosize } from "../../../../utils/index";
export default {
  data() {
    return {
      loading: true,
      operateType: 0,
      currentIp: "",
      ServerIpList: [],
      gameList: [],
      timer: null,
      offset: 0,
      limit: 10,
      operateValue: 0,
      operateState: 0,
      pageinfo: {
        count: 0
      },
      SearchgameList: [],
      operateTypeList: [
        {
          value: 0,
          label: "所有状态"
        },
        {
          value: 1,
          label: this.$t("Download")
        },
        {
          value: 2,
          label: this.$t("Upload")
        },
        {
          value: 999,
          label: this.$t("Failed")
        }
      ],
      columns1: [
        {
          title: this.$t("Task") + this.$t("Status"),
          key: "taskStatus",
          width: 130,
          sortable: "custom",
          render: (h, params) => {
            let operate = {
              1: this.$t("Download"),
              2: this.$t("Upload"),
              3: this.$t("Seeding"),
              4: this.$t("stopUpload"),
              5: this.$t("deleteGame")
            };
            let state = {
              1: this.$t("Processing"),
              2: this.$t("Waitting"),
              3: this.$t("Success"),
              4: this.$t("Failed")
            };
            switch (params.row.operateType) {
              case 1:
                if (params.row.taskStatus === 3) {
                  return h("div", [
                    h("Icon", {
                      props: {
                        type: "md-checkmark-circle-outline",
                        color: "green",
                        size: "20"
                      },
                      style: {
                        padding: "10px"
                      }
                    }),
                    h(
                      "span",
                      operate[params.row.operateType] +
                        state[params.row.taskStatus]
                    )
                  ]);
                } else if (params.row.taskStatus === 4) {
                  return h("div", [
                    h("Icon", {
                      props: {
                        type: "md-close",
                        color: "red",
                        size: "20"
                      },
                      style: {
                        verticalAlign: "bottom",
                        paddingRight: "10px"
                      }
                    }),
                    h(
                      "span",
                      operate[params.row.operateType] +
                        state[params.row.taskStatus]
                    )
                  ]);
                } else {
                  return h("div", [
                    h("Icon", {
                      props: {
                        type: "ios-cloud-download-outline",
                        color: "green",
                        size: "20"
                      },
                      style: {
                        paddingRight: "10px",
                        verticalAlign: "bottom"
                      }
                    }),
                    h(
                      "span",
                      operate[params.row.operateType] +
                        state[params.row.taskStatus]
                    )
                  ]);
                }
              case 2:
                return h("div", [
                  h("Icon", {
                    props: {
                      type: "ios-cloud-upload-outline",
                      color: "green",
                      size: "20"
                    },
                    style: {
                      paddingRight: "10px",
                      verticalAlign: "bottom"
                    }
                  }),
                  h(
                    "span",
                    operate[params.row.operateType] +
                      state[params.row.taskStatus]
                  )
                ]);

              case 4:
                return h("div", [
                  h("Icon", {
                    props: {
                      type: "ios-pause-outline",
                      color: "green",
                      size: "20"
                    },
                    style: {
                      paddingRight: "10px",
                      verticalAlign: "bottom"
                    }
                  }),
                  h(
                    "span",
                    operate[params.row.operateType] +
                      state[params.row.taskStatus]
                  )
                ]);
              default:
                return h("div", [
                  h("Icon", {
                    props: {
                      type: "ios-arrow-round-up",
                      color: "green",
                      size: "20"
                    },
                    style: {
                      verticalAlign: "bottom",
                      paddingRight: "10px"
                    }
                  }),
                  h("span", operate[params.row.operateType]),
                  h("span", state[params.row.taskStatus])
                ]);
            }
          }
        },
        {
          title: this.$t("Game") + "ID",
          key: "centerid",
          width: 90
        },
        {
          title: this.$t("Game") + this.$t("Name"),
          key: "name",
          width: 120,
          ellipsis: true,
          tooltip: true
        },
        {
          title: this.$t("Download") + this.$t("Path"),
          key: "path",
          ellipsis: true,
          tooltip: true,
          minWidth: 130
        },

        {
          title: this.$t("Updated"),
          key: "updateBytes",
          minWidth: 120,
          render: (h, param) => {
            return h("span", Bytestosize(param.row.updateBytes));
          }
        },
        {
          title: this.$t("Update") + this.$t("Speed"),
          key: "updateSpeed",
          minWidth: 120,
          render: (h, param) => {
            return h("span", this.formatSize(param.row.updateSpeed));
          }
        },
        {
          title: this.$t("Upload") + this.$t("Size"),
          key: "uploadBytes",
          minWidth: 120,
          render: (h, param) => {
            return h("span", Bytestosize(param.row.uploadBytes));
          }
        },
        {
          title: this.$t("Upload") + this.$t("Speed"),
          key: "uploadSpeed",
          minWidth: 120,
          render: (h, param) => {
            return h("span", this.formatSize(param.row.uploadSpeed));
          }
        },
        {
          title: this.$t("Version"),
          key: "versionCode",
          minWidth: 140,
          maxWidth: 140
        },
        {
          title: " ",
          key: ""
        }
      ],
      data1: [],
      searchFlat: false,
      sortOjb: {
        order: "asc"
      },
      isState: false, // 状态筛选开关
      isSearch: false, // 搜索开关
      searchVal: "", // 搜索的值
      stateVal: "",
      showList: [],
      currentPage: 1
    };
  },
  created() {
    this.currentIp = this.$route.query;
    this.FetchData(this.currentIp).then(() => {
      this.start();
    });
  },
  watch: {
    isSearch() {
      this.offset = 0;
      this.currentPage = 1;
    },
    isState() {
      this.offset = 0;
      this.currentPage = 1;
    }
  },
  beforeRouteLeave(to, from, next) {
    window.clearTimeout(this.timer);
    this.timer = null;
    next();
  },
  destroyed() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  },
  methods: {
    HandleChangePage(current) {
      this.loading = true;
      this.currentPage = current;
      this.offset = (current - 1) * this.limit;
    },
    async HandleSearch(val) {
      this.searchVal = val;
      this.loading = true;
      if (val) {
        this.isSearch = true;
      } else {
        this.isSearch = false;
      }
    },
    async start() {
      this.timer = setTimeout(() => {
        this.start();
        this.FetchData(this.currentIp);
      }, 3000);
    },
    formatSize(value) {
      var limit = parseFloat(value);
      var size = "";
      if (value === "0" || value === "undefined" || value === "null") {
        size = "0";
      } else if (limit < 0.1 * 1024) {
        // 小于0.1KB，则转化成B
        size = limit.toFixed(2) + "KB/s";
      } else if (limit < 0.1 * 1024 * 1024) {
        // 小于0.1MB，则转化成KB
        size = (limit / 1024).toFixed(2) + "MB/s";
      } else if (limit < 0.1 * 1024 * 1024 * 1024) {
        // 小于0.1GB，则转化成MB
        size = (limit / (1024 * 1024)).toFixed(2) + "GB/s";
      } else {
        // 其他转化成GB
        size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "TB/s";
      }
      return size;
    },
    async FetchData(params) {
      try {
        let resp = await getGameListByIp(params.ip);
        let list = resp.data.data.data;
        this.gameList = this.filterData(
          list,
          this.searchVal,
          this.stateVal,
          this.isSearch,
          this.isState
        );
        if (this.sortOjb.order === "asc") {
          this.gameList.sort((a, b) => {
            return a.operateType - b.operateType;
          });
        } else {
          this.gameList.sort((a, b) => {
            return b.operateType - a.operateType;
          });
        }
        this.showList = this.gameList.slice(
          this.offset,
          this.limit * this.currentPage
        );
      } catch (error) {
        window.clearTimeout(this.timer);
        this.$Message.error(error.data.error);
      } finally {
        this.loading = false;
      }
    },
    HandleOperateType(value) {
      this.loading = true;
      if (value !== 0) {
        this.isState = true;
      } else {
        this.isState = false;
      }
      this.stateVal = value;
      // this.loading = true;
      // this.offset = 0;
      // this.operateValue = value;
    },
    handleSortChange({ key, order }) {
      this.loading = true;
      this.sortOjb = { key, order };
    },

    filterData(srcList, searchValue, state, isSearch, isState) {
      let newSearchList = [];
      let newStateList = [];
      let temp = [];
      let xtemp = srcList;
      if (isSearch) {
        for (let j = 0; j < srcList.length; j++) {
          if (
            srcList[j].name.match(searchValue) ||
            srcList[j].centerid === searchValue
          ) {
            newSearchList.push(srcList[j]);
          }
        }
        xtemp = newSearchList;
      }
      if (isState) {
        if (state !== 0 && state !== 999) {
          for (let j = 0; j < srcList.length; j++) {
            if (srcList[j].operateType === state) {
              newStateList.push(srcList[j]);
            }
          }
        } else if (state === 999) {
          for (let j = 0; j < srcList.length; j++) {
            if (srcList[j].taskStatus === 4) {
              newStateList.push(srcList[j]);
            }
          }
        }
        xtemp = newStateList;
      }
      if (isState && isSearch) {
        for (let j = 0; j < newSearchList.length; j++) {
          for (let i = 0; i < newStateList.length; i++) {
            if (newStateList[i].name === newSearchList[j].name) {
              temp.push(newSearchList[j]);
            }
          }
        }
        xtemp = temp;
      }
      return xtemp;
    }
  }
};
</script>
