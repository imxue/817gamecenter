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
        enter-button="搜索"
        @on-search="HandleSearch"
        placeholder="输入游戏名称"
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
import { kbtosize } from "../../../../utils/index";
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
      limit: 17,
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
          label: "下载"
        },
        {
          value: 2,
          label: "上传"
        },
        {
          value: 999,
          label: "失败"
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
              1: "下载",
              2: "上传",
              3: "做种",
              4: "停止上传",
              5: "删除游戏"
            };
            let state = {
              1: "处理中",
              2: "等待中",
              3: "成功",
              4: "失败"
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
            return h("span", kbtosize(param.row.updateBytes));
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
            return h("span", kbtosize(param.row.uploadBytes));
          }
        },
        {
          title: this.$t("Upload") + this.$t("Speed"),
          key: "uploadSpeed",
          minWidth: 120,
          render: (h, param) => {
            return h("span", kbtosize(param.row.uploadSpeed));
          }
        },
        {
          title: this.$t("Version"),
          key: "versionCode",
          minWidth: 140
        }
      ],
      data1: [],
      Copylimit: 17,
      searchFlat: false,
      sortOjb: {
        order: "asc"
      },
      CopyGameList: []
    };
  },
  computed: {
    showList() {
      return this.gameList.slice(this.offset, this.Copylimit);
    }
  },
  created() {
    this.currentIp = this.$route.query;
    this.FetchData(this.currentIp).then(() => {
      this.start();
    });
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
      this.offset = (current - 1) * this.limit;
      this.Copylimit =
        this.offset === 0 ? this.limit : this.limit + this.offset;
    },
    async HandleSearch(val) {
      this.offset = 0;
      this.loading = true;
      try {
        if (val) {
          this.SearchgameList = this.CopyGameList.filter(item => {
            if (item.name.match(val) || item.centerid.toString() == val) {
              return true;
            }
          });
          this.searchFlat = true;
        } else {
          this.searchFlat = false;
        }
        console.log(this.SearchgameList);
      } catch (error) {
        console.log(error);
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
      let temp = [];
      try {
        let resp = await getGameListByIp(params.ip);
        this.gameList = resp.data.data.data;
        if (resp.data.data.ok) {
          if (this.searchFlat) {
            var list = resp.data.data.data;
            for (let i = 0; i < list.length; i++) {
              for (let x = 0; x < this.SearchgameList.length; x++) {
                if (list[i].name == this.SearchgameList[x].name) {
                  temp.push(list[i]);
                }
              }
            }
            this.gameList = temp;
          }
          if (this.operateValue !== 0 && this.operateValue !== 999) {
            this.gameList = this.gameList.filter(item => {
              return item.operateType === this.operateValue;
            });
          }
          if (this.operateValue === 999) {
            this.gameList = this.gameList.filter(item => {
              return item.taskStatus === 4;
            });
          }
          if (this.sortOjb.order === "asc") {
            this.gameList.sort((a, b) => {
              return a.operateType - b.operateType;
            });
          } else {
            this.gameList.sort((a, b) => {
              return b.operateType - a.operateType;
            });
          }
          this.CopyGameList = this.gameList.slice(0, this.gameList.length);
        }
      } catch (error) {
        window.clearTimeout(this.timer);
        this.$Message.error(error.data.error);
      } finally {
        this.loading = false;
      }
    },
    HandleOperateType(value) {
      this.loading = true;
      this.offset = 0;
      this.operateValue = value;
    },
    handleSortChange({ key, order }) {
      this.loading = true;
      this.sortOjb = { key, order };
    }
  }
};
</script>
