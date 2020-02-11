<template>
  <div>
    <Row :gutter="16">
      <Col span="5">
        <Select v-model="type" @on-change="HandleServerTypeId">
          <Option :value="9999">所有类型</Option>
          <Option :value="0">做种服务器</Option>
          <Option :value="1">非做种服务器</Option>
        </Select>
      </Col>
      <Col span="5">
        <Select v-model="lineTypeId" @on-change="HandleServerlineTypeId">
          <Option v-for="item in lineType" :value="item.id" :key="item.id">{{
            item.name
          }}</Option>
        </Select>
      </Col>
      <Col span="6">
        <Input search enter-button="Search" placeholder="Enter something..." />
      </Col>
    </Row>

    <Row style="margin:10px 0;">
      <Col span="2">
        <router-link to="/ServerManagement/Tracker/add">
          <Button type="info">添加</Button>
        </router-link>
      </Col>
      <Col span="2">
        <Button type="info" @click="HandlEdit">编辑</Button>
      </Col>
      <Col span="2">
        <Button type="info" @click="HandlesetRunConfig">设置运行配置</Button>
      </Col>
    </Row>
    <Table
      :columns="columns"
      :data="data"
      border
      @on-select="SelectItem"
    ></Table>
  </div>
</template>
<script>
import { getbtTracker, getLineType } from "@/api/server";
export default {
  name: "TrackerIndex",
  data() {
    return {
      selectedItems: [],
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "在线状态",
          key: "is_online"
        },
        {
          title: "类型",
          key: "type"
        },
        {
          title: "所在地区",
          key: "area_name"
        },
        {
          title: "线路类型",
          key: "line_type"
        },
        {
          title: "IP地址",
          key: "ip"
        },
        {
          title: "外网域名/IP",
          key: "domain"
        },
        {
          title: "程序版本",
          key: "version"
        },
        {
          title: "最后心跳时间",
          key: "last_heart_time"
        },
        {
          title: "状态",
          key: "enable"
        },
        {
          title: "操作人",
          key: "operator"
        },
        {
          title: "最后操作时间",
          key: "update_time"
        }
      ],
      data: [],
      type: 9999, //服务器类型
      lineType: [], // 线路类型
      lineTypeId: 0, // 选择的线路id
      offset: 0,
      limit: 10,
      orderby: "",
      ip: ""
    };
  },
  created() {
    this.HandlegetLineType();
    this.HandleGetData(this.offset, this.limit);
  },
  methods: {
    async HandleGetData(offset, limit, orderby, type, linetypeid, ip) {
      let resp = await getbtTracker(
        offset,
        limit,
        orderby,
        type,
        linetypeid,
        ip
      );
      this.data = resp.data.data.data;
    },
    async HandlegetLineType() {
      try {
        let resp = await getLineType();
        this.lineType = resp.data;
        this.lineType.push({
          id: 0,
          name: "所有类型"
        });
      } catch (error) {
        console.log(error);
      }
    },
    SelectItem(item) {
      this.selectedItems = item;
    },
    HandleServerTypeId(id) {
      this.type = id === 9999 ? "" : id;
      this.HandleGetData(
        this.offset,
        this.limit,
        this.orderby,
        this.type,
        this.linetypeid
      );
    },
    HandleServerlineTypeId(id) {
      this.linetypeid = id === 0 ? "" : id;
      this.type = this.type === 9999 ? "" : this.type
      this.HandleGetData(
        this.offset,
        this.limit,
        this.orderby,
        this.type,
        this.linetypeid
      );
    },
    HandlEdit() {
      if (this.selectedItems.length === 1) {
        this.$router.push({
          path: "/ServerManagement/Tracker/edit",
          query: this.selectedItems
        });
      } else {
        this.$Message.info("请选择一项");
      }
    },
    HandlesetRunConfig() {
      if (this.selectedItems.length === 1) {
        this.$router.push({
          path: "/ServerManagement/Tracker/setRunConfig",
          query: this.selectedItems
        });
      } else {
        this.$Message.info("请选择一项");
      }
    }
  }
};
</script>
