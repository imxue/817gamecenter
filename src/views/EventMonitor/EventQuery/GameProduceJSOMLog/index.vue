<template>
  <div class="json">
    <div style="marginBottom:10px;display:flex;">
      <div class="datapicker">
        <DatePicker
          @on-change="HandleChange"
          type="daterange"
          placement="bottom-end"
          placeholder="Select date"
          :value="time"
          style="left:0px;width:220px;marginRight:10px;"
        ></DatePicker>
      </div>
      <div>
        <Select
          v-model.number="status"
          @on-change="HandleTypeChange"
          style="left:0px;width:300px;"
        >
          <Option :value="9999">{{ $t("All") }}{{ $t("Type") }}</Option>
          <Option :value="0">{{ $t("Success") }}</Option>
          <Option :value="1">{{ $t("Failed") }}</Option>
        </Select>
      </div>
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
import { getjsonFileLog } from "@/api/server.js";
import { parseTime } from "@/utils";
export default {
  name: "GameState",
  data() {
    return {
      loading: false,
      pageinfo: {
        count: 0
      },
      columns: [
        {
          key: "type",
          title: this.$t("Operator") + this.$t("Type"),
          render: (h, params) => {
            let opt = {
              1: {
                title: this.$t("All") + this.$t("Game"),
                color: "#ffa39e"
              },
              0: {
                title: this.$t("Success"),
                color: "#52c41a"
              }
            };
            return h(
              "span",
              {
                style: {
                  color: opt[params.row.type].color
                }
              },
              opt[params.row.type].title
            );
          }
        },
        {
          key: "insert_tm",
          title: this.$t("StartTime"),
          render: (h, params) => {
            return h("span", parseTime(params.row.insert_tm));
          }
        },
        {
          key: "process_tm",
          title: this.$t("EndTime"),
          render: (h, params) => {
            return h("span", parseTime(params.row.process_tm));
          }
        },
        {
          key: "status",
          title: this.$t("Results"),
          render: (h, params) => {
            let opt = {
              1: {
                title: this.$t("Failed"),
                color: "#52c41a"
              },
              0: {
                title: this.$t("Success"),
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
          key: "remark",
          title: this.$t("Remarks")
        }
      ],

      data: [],
      time: [],
      offset: 0,
      limit: 10,
      orderby: "insert_tm",
      startdate: "2020-02-02",
      enddate: "2020-02-17",
      status: 9999
    };
  },
  methods: {
    HandleChangePage(current) {
      this.offset = (current - 1) * this.limit;
      this.HandleGetData({
        offset: this.offset,
        limit: this.limit,
        orderby: this.orderby,
        enddate: this.enddate,
        startdate: this.startdate,
        status: this.status
      });
    },
    async HandleGetData({
      offset,
      limit,
      orderby,
      startdate,
      enddate,
      status
    }) {
      this.loading = true;
      status = status === 9999 ? "" : status;
      orderby += " DESC";
      try {
        let resp = await getjsonFileLog({
          offset,
          limit,
          orderby,
          startdate,
          enddate,
          status
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
    HandleGetEndStart() {
      let date = new Date();
      this.$set(
        this.time,
        0,
        new Date(new Date().setDate(date.getDate() - 15))
      );
      this.$set(this.time, 1, date);
      // this.startdate =
    },
    formattime(date) {
      let mounth = new Date(date).getMonth() + 1;
      mounth = mounth > 10 ? mounth : `0${mounth}`;
      let day = new Date(date).getDate();
      day = day > 10 ? day : `0${day}`;
      return `${new Date(date).getFullYear()}-${mounth}-${day}`;
    },
    HandleChange(date) {
      this.$set(this.time, 0, date[0]);
      this.$set(this.time, 1, date[1]);
      this.startdate = date[0];
      this.enddate = date[1];
      this.HandleGetData({
        offset: this.offset,
        limit: this.limit,
        orderby: this.orderby,
        startdate: date[0],
        enddate: date[1],
        status: this.status
      });
    },
    HandleTypeChange(v) {
      this.status = v;
      this.HandleGetData({
        offset: this.offset,
        limit: this.limit,
        orderby: this.orderby,
        startdate: this.formattime(this.time[0]),
        enddate: this.formattime(this.time[1]),
        status: this.status
      });
    }
  },
  async created() {
    this.HandleGetEndStart();
    this.HandleGetData({
      offset: this.offset,
      limit: this.limit,
      orderby: this.orderby,
      startdate: this.formattime(this.time[0]),
      enddate: this.formattime(this.time[1]),
      status: this.status
    });
    this.startdate = this.formattime(this.time[0]);
    this.enddate = this.formattime(this.time[1]);
  }
};
</script>
<style lang="scss">
.json {
  .datapicker {
    .ivu-select-dropdown {
      left: 0px !important;
    }
  }
}
</style>
