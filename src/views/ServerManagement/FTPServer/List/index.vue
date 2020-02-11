<template>
  <div>
    <Row :gutter="16">
      <Col span="5">
        <Select v-model="LineTypeId" @on-change="ChangeLineType">
          <Option v-for="item in LineType" :value="item.id" :key="item.id">{{
            item.name
          }}</Option>
        </Select>
      </Col>
      <Col span="6">
        <Input
          search
          enter-button="Search"
          placeholder="输入IP地址进行搜索。。。"
        />
      </Col>
    </Row>
    <Row style="margin:10px 0;">
      <Col span="2">
        <router-link to="/ServerManagement/FTPServer/add">
          <Button type="info">添加</Button>
        </router-link>
      </Col>
      <Col span="2">
        <Button type="info" @click="HandleEdit">编辑</Button>
      </Col>
    </Row>

    <Table
      :columns="columns"
      :data="data"
      border
      @on-selection-change="ChangeSelection"
    ></Table>
  </div>
</template>
<script>
import { getFtpServer, getLineType } from "@/api/server.js";
export default {
  name: "TrackerIndex",
  data() {
    return {
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "FTP状态",
          key: "ftp_status"
        },
        {
          title: "HTTP状态",
          key: "http_status"
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
          title: "端口",
          key: "port"
        },
        {
          title: "类型",
          key: "type"
        },
        {
          title: "是否启用",
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
      offset: 0,
      limit: 10,
      LineType: [],
      LineTypeId: 0,
      orderby: "",
      selectedItems: []
    };
  },
  created() {
    this.HandleGetData(this.offset, this.limit);
    this.HandleGetLineType();
  },
  methods: {
    async HandleGetData(offset, limit, order, LineTypeId) {
      try {
        let resp = await getFtpServer(offset, limit, order, LineTypeId);
        this.data = resp.data.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async HandleGetLineType() {
      try {
        let resp = await getLineType();
        this.LineType = resp.data;
        this.LineType.unshift({
          id: 0,
          name: "所有类型"
        });
      } catch (error) {
        console.log(error);
      }
    },
    async ChangeLineType(id) {
      this.LineTypeId = id;
      this.HandleGetData(
        this.offset,
        this.limit,
        this.orderby,
        this.LineTypeId
      );
    },
    ChangeSelection(item) {
      this.selectedItems = item;
    },
    HandleEdit() {
      if (this.selectedItems.length === 1) {
        this.$router.push({
          path: "/ServerManagement/FTPServer/edit",
          query: this.selectedItems
        });
      } else {
        this.$Message.info("请选择一项");
      }
    }
  }
};
</script>
