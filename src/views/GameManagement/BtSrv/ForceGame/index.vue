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
        :enter-button="this.$t('Search')"
        @on-search="HandleSearch"
        :placeholder="this.$t('Input') + this.$t('Game') + this.$t('Name')"
      />
    </div>
    <Button @click="HandleShow" type="info" style="marginBottom:10px;"
      >{{ $t("Add") }}{{ $t("Game") }}</Button
    >

    <Button
      @click="HandleEdit"
      type="info"
      style="marginBottom:10px;marginLeft:10px;"
      >{{ $t("Edit") }}{{ $t("Game") }}</Button
    >
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
      style="margin-top:10px;float:right;"
      @on-change="HandleChangePage"
    />
    <Modal v-model="showUp" @on-ok="ok" footer-hide>
      <Row class="item">
        <Col span="5"> {{ $t("Center") }}{{ $t("Game") }}ID: </Col>
        <Col span="10">
          <Input v-model="form.center_id" :disabled="edit" />
        </Col>
      </Row>
      <Row class="item">
        <Col span="5"> 强推时间 </Col>
        <Col span="12">
          <DatePicker
            v-model="form.time"
            type="datetimerange"
            placeholder="Select date"
            style="width: 200px"
          ></DatePicker>
        </Col>
      </Row>
      <Row class="item">
        <Col span="5">是否启用</Col>
        <Col span="12">
          <Select v-model="form.enable" style="width:200px">
            <Option :value="1">启用</Option>
            <Option :value="0">禁用</Option>
          </Select>
        </Col>
      </Row>
      <div style="text-align:center">
        <Button @click="ok" type="info" style="marginBottom:10px;"
          >添加排期</Button
        >
      </div>
    </Modal>
  </div>
</template>
<script>
import {
  getAllGameTypeenabled,
  getforcePushPeriod,
  addforcePushPeriod,
  editforcePushPeriod
} from "@/api/server.js";

import { parseTime } from "@/utils";
export default {
  name: "index",
  data() {
    return {
      loading: true,
      showUp: false,
      value1: "",
      id: "",
      pageinfo: {
        page_index: 0,
        page_size: 1,
        count: 2
      },
      selectedItems: "",
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          key: "center_id",
          title: this.$t("Game") + "ID",
          minwidth: 110,
          width: 110,
          maxWidth: 150,
          ellipsis: true,
          tooltip: true
        },
        {
          key: "display_name",
          title: this.$t("Game") + this.$t("Name"),
          minWidth: 170,
          maxWidth: 180
        },
        {
          key: "type_name",
          title: this.$t("Game") + this.$t("Category"),
          minwidth: 140,
          width: 150,
          maxWidth: 160
        },
        {
          key: "start_time",
          title: "开始时间",
          minwidth: 170,
          width: 170,
          maxWidth: 180,
          render: (h, params) => {
            return h("span", parseTime(params.row.start_time));
          }
        },
        {
          key: "end_time",
          title: "结束时间",
          minwidth: 170,
          width: 170,
          maxWidth: 180,
          render: (h, params) => {
            return h("span", parseTime(params.row.end_time));
          }
        },
        {
          key: "enable",
          title: "是否启用",
          minwidth: 150,
          width: 150,
          maxWidth: 150,
          render: (h, params) => {
            let obj = {
              1: this.$t("Enable"),
              0: this.$t("Disabled")
            };
            return h("span", obj[params.row.enable]);
          }
        },
        {
          key: "state",
          title: "状态",
          minwidth: 120,
          width: 130,
          maxWidth: 140,
          render: (h, params) => {
            let obj = {
              0: this.$t("notStarted"),
              1: this.$t("Ongoing"),
              2: this.$t("Expiration")
            };
            return h("span", obj[params.row.state]);
          }
        },
        {
          key: "operator",
          title: this.$t("Operator"),
          minWidth: 170,
          maxWidth: 170
        },
        {
          key: "create_time",
          title: this.$t("Create") + this.$t("Time"),
          minWidth: 170,
          maxWidth: 170,
          render: (h, params) => {
            return h("span", parseTime(params.row.create_time));
          }
        },
        {
          key: "update_time",
          title: this.$t("UpdateTime"),
          minWidth: 170,
          maxWidth: 170,
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
      form: {
        game_name: "",
        center_id: "",
        time: []
      },
      offset: 0,
      limit: 10,
      orderby: "",
      typeid: 0,
      firstletter: "",
      GameType: [],
      edit: false
    };
  },
  methods: {
    HandleSearch(v) {
      this.firstletter = v;
      this.HandleGetData({
        offset: this.offset,
        limit: this.limit,
        orderby: this.orderby,
        typeid: this.typeid,
        firstletter: this.firstletter
      });
    },
    ChangeSelection(item) {
      this.selectedItems = item;
    },
    HandleEdit() {
      if (this.selectedItems.length === 1) {
        this.showUp = true;
        this.edit = true;
        let { center_id, enable, start_time, end_time } = this.selectedItems[0];
        this.form.center_id = center_id;
        this.form.enable = enable;
        this.$set(this.form.time, 0, this.HandleGetTime(start_time));
        this.$set(this.form.time, 1, this.HandleGetTime(end_time));
        console.log(this.form);
      }
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
    HandleChangePage(page) {
      (this.offset = page * this.limit - this.limit),
        this.HandleGetData({
          offset: page * this.limit - this.limit,
          limit: this.limit,
          order: this.orderby || "",
          type: this.type || "",
          linetypeid: this.lineTypeId
        });
    },
    async HandleGetData({
      offset,
      limit,
      orderby = "",
      typeid = "",
      firstletter = ""
    }) {
      this.loading = true;
      typeid = typeid === 0 ? "" : typeid;
      try {
        let resp = await getforcePushPeriod({
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
          this.$t("Get") + this.$t("PushGame") + this.$t("Failed")
        );
      } finally {
        this.loading = false;
      }
    },
    // 弹出添加强推游戏界面
    async HandleShow() {
      this.showUp = true;
    },
    HandleChange(id) {
      this.typeid = id;
      this.HandleGetData({
        offset: this.offset,
        limit: this.limit,
        orderby: this.orderby,
        typeid: this.typeid,
        firstletter: this.firstletter
      });
    },
    async ok() {
      if (this.edit) {
        try {
          await editforcePushPeriod({
            enable: this.form.enable,
            center_id: this.form.center_id,
            start_time: this.HandleGetTime(this.form.time[0]),
            end_time: this.HandleGetTime(this.form.time[1])
          });
          this.$Message.success(
            this.$t("Edit") + this.$t("PushGame") + this.$t("Success")
          );
          this.HandleGetData({
            offset: this.offset,
            limit: this.limit,
            order: this.orderby || "",
            type: this.type || "",
            linetypeid: this.lineTypeId
          });
          this.showUp = false;
        } catch (error) {
          console.log(error);
        } finally {
          this.edit = false;
        }
      } else {
        this.form = {
          game_name: "",
          center_id: "",
          time: []
        };
        let start_time = this.HandleGetTime(this.form["time"][0]);
        let end_time = this.HandleGetTime(this.form["time"][1]);
        this.form.start_time = start_time;
        this.form.end_time = end_time;
        this.form.center_id = Number(this.form.center_id);
        try {
          await addforcePushPeriod(this.form);
          this.showUp = false;
          this.HandleGetData({
            offset: this.offset,
            limit: this.limit,
            order: this.orderby || "",
            type: this.type || "",
            linetypeid: this.lineTypeId
          });
        } catch (error) {
          this.$Message.error(
            this.$t("Edit") + this.$t("ScheduleSuccess") + this.$t("Failed")
          );
        }
      }
    },
    HandleGetTime(data) {
      let x = new Date(data);
      let month = x.getMonth() + 1 + "";
      if (month.length === 1) {
        month = "0" + month + "";
      }

      let day = x.getDate() + "";
      if (day.length === 1) {
        day = "0" + day + "";
      }
      let Hours = x.getHours() + "";
      if (Hours.length === 1) {
        Hours = "0" + Hours + "";
      }
      let Minutes = x.getMinutes() + "";
      if (Minutes.length === 1) {
        Minutes = "0" + Minutes + "";
      }

      let Seconds = x.getSeconds() + "";
      if (Seconds.length === 1) {
        Seconds = "0" + Seconds + "";
      }

      return `${x.getFullYear()}-${month}-${day} ${Hours}:${Minutes}:${Seconds}`;
    }
  },
  created() {
    this.HandleGeTGameType();
    this.HandleGetData({
      offset: this.offset,
      limit: this.limit,
      orderby: this.orderby,
      typeid: this.typeid,
      firstletter: this.firstletter
    });
  }
};
</script>
<style lang="scss" scoped>
.item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
</style>
