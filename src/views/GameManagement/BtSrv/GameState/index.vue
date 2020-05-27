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
      >{{ $t("Distribute") }}{{ $t("Game") }}</Button
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
        <Col span="6"> {{ $t("Center") }}{{ $t("Game") }}ID: </Col>
        <Col span="10">
          <Input v-model="form1.id" disabled />
        </Col>
      </Row>
      <Row class="item">
        <Col span="6"> {{ $t("Game") }}{{ $t("Name") }}: </Col>
        <Col span="10">
          <Input v-model="form1.game_name" disabled />
        </Col>
      </Row>
      <Row class="item">
        <Col span="6"> {{ $t("Name") }}{{ $t("Category") }}: </Col>
        <Col span="10">
          <Input v-model="form1.game_type_name" disabled />
        </Col>
      </Row>
      <Row class="item">
        <Col span="6"> {{ $t("Distribute") }}BtSrv{{ $t("Group") }}： </Col>
        <Col span="10">
          <Tree
            :data="data2"
            show-checkbox
            check-directly
            @on-check-change="HandleCheck"
          ></Tree>
        </Col>
      </Row>
      <div style="text-align:center">
        <Button @click="ok" type="info" style="marginBottom:10px;"
          >{{ $t("Distribute") }}{{ $t("Game") }}</Button
        >
      </div>
    </Modal>
  </div>
</template>
<script>
import {
  getbtGroupGame,
  getAllBtServerGroupenabled,
  allocateGame,
  getAllGameTypeenabled
} from "@/api/server.js";
import { parseTime } from "@/utils";
import Vue from "vue";
export default {
  name: "index",
  data() {
    return {
      loading: true,
      showUp: false,
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
          key: "game_name",
          title: this.$t("Game") + this.$t("Name"),
          minWidth: 170,
          maxWidth: 180
        },
        {
          key: "game_type_name",
          title: this.$t("Game") + this.$t("Category"),
          minwidth: 140,
          width: 150,
          maxWidth: 160
        },
        {
          key: "popularity",
          title: this.$t("Center") + this.$t("Fever"),
          minwidth: 120,
          width: 130,
          maxWidth: 140
        },
        {
          key: "version_code",
          title: this.$t("Game") + this.$t("Formal") + this.$t("Version"),
          minwidth: 180,
          width: 185,
          maxWidth: 190
        },
        {
          key: "bt_server_group_names",
          title: this.$t("Distribute") + this.$t("Group"),
          minwidth: 160,
          width: 170,
          maxWidth: 180
        },
        {
          key: "operators",
          title: this.$t("Assignee"),
          minwidth: 120,
          width: 130,
          maxWidth: 140
        },
        {
          key: "last_allocate_time",
          title: this.$t("Last") + this.$t("Distribute") + this.$t("Time"),
          minWidth: 170,
          maxWidth: 170,
          render: (h, params) => {
            return h("span", parseTime(params.row.last_allocate_time));
          }
        }
      ],
      data: [],
      data2: [
        {
          title: this.$t("All") + "BT" + this.$t("Server") + this.$t("Group"),
          expand: true,
          children: []
        }
      ],
      form1: {
        game_name: "",
        game_type_name: "",
        center_id: "",
        bt_server_group_ids: "",
        id: ""
      },
      SelectGroup: "",
      offset: 0,
      limit: 10,
      orderby: "",
      typeid: 0,
      firstletter: "",
      GameType: []
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
        let resp = await getbtGroupGame({
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
          this.$t("Get") + "BT" + this.$t("Server") + this.$t("Failed")
        );
      } finally {
        this.loading = false;
      }
    },
    async HandleShow() {
      if (this.selectedItems.length === 1) {
        this.showUp = true;
        this.form1.game_name = this.selectedItems[0].game_name;
        (this.form1.game_type_name = this.selectedItems[0].game_type_name),
          (this.form1.center_id = this.selectedItems[0].game_id),
          (this.form1.id = this.selectedItems[0].center_id),
          (this.form1.bt_server_group_ids = this.selectedItems[0].bt_server_group_ids);
        this.SelectGroup = this.form1.bt_server_group_ids;
        await this.HandlegetGroup();
      } else {
        this.$Message.info(this.$t("PleaseSelectOneItem"));
      }
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
    async HandlegetGroup() {
      let arr = [];
      let list = [];
      try {
        let resp = await getAllBtServerGroupenabled();
        this.group = resp.data.data;
        if (this.group.length > 0) {
          let selectGrop = this.form1.bt_server_group_ids.split(",");
          this.group.forEach(element => {
            arr.push({
              title: element.name,
              id: element.id
            });
          });
          arr.forEach(item => {
            for (let index = 0; index < selectGrop.length; index++) {
              if (selectGrop[index] === item.id) {
                item.checked = true;
                break;
              } else {
                item.checked = false;
              }
            }
            list.push(item);
          });
        }
        Vue.set(this.data2, 0, {
          title: this.$t("All") + "BT" + this.$t("Server") + this.$t("Group"),
          expand: true,
          children: list
        });
      } catch (error) {
        this.$Message.error(
          this.$t("Get") +
            "BT" +
            this.$t("Server") +
            this.$t("Group") +
            this.$t("Failed")
        );
      }
    },
    HandleCheck(item) {
      let str = [];
      if (item.length > 0) {
        item.forEach(item => {
          if (!item.children) {
            str.push(item.id);
          }
        });
      } else {
        str = "";
      }
      this.SelectGroup = (str && str.join(",")) || "";
    },
    async ok() {
      if (this.SelectGroup) {
        try {
          await allocateGame({
            gameid: this.form1.center_id,
            groupids: this.SelectGroup
          });
          this.$Message.success(this.$t("Distribute") + this.$t("Success"));
          this.showUp = false;
          this.HandleGetData({
            offset: this.offset,
            limit: this.limit,
            orderby: this.orderby || "",
            typeid: this.typeid || "",
            firstletter: this.firstletter || ""
          });
        } catch (error) {
          this.showUp = true;
          this.$Message.error(this.$t("Distribute") + this.$t("Failed"));
        }
      } else {
        this.showUp = true;
        this.$Message.error(this.$t("DistributeINFO"));
      }
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
